function googleRequest(url) { return new Promise((resolve,reject)=>GM_xmlhttpRequest({url,method:'GET',timeout:12000,onload:r=>resolve({ok:r.status>=200&&r.status<300,status:r.status,text:async()=>r.responseText}),onerror:()=>reject(Error('network unavailable')),ontimeout:()=>reject(Error('request timeout'))})); }
/* Chat Studio — background helper.
   Reads the list of Google accounts signed in to this browser (the same list Chrome itself and Google's account menu use),
   so that every account can get its own design. The list is kept only in this browser's extension storage. */
const AKEY = 'cs6acct';
let last = { at: 0, res: null };

/* ["gaia.l.a.r", [["gaia.l.a", ?, name, email, photo, ?, ?, ?, ?, valid, gaiaId, ?, ?, ?, signedOut, verified], ...]] */
function parseList(text) {
  const start = text.indexOf('[');
  if (start < 0) return [];
  const data = JSON.parse(text.slice(start));
  const rows = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
  const out = [];
  let idx = 0;
  for (const r of rows) {
    if (!Array.isArray(r) || typeof r[3] !== 'string' || !r[3].includes('@')) continue;
    const signedOut = r[14] === 1;
    out.push({ email: r[3].toLowerCase(), name: typeof r[2] === 'string' ? r[2] : '', photo: typeof r[4] === 'string' ? r[4] : '', gaia: typeof r[10] === 'string' ? r[10] : '', idx: signedOut ? null : idx, out: signedOut });
    if (!signedOut) idx++;
  }
  return out;
}
/* Google's account chooser page lists the same accounts; used when the list above is not available */
function parseChooser(html) {
  const out = [], seen = new Set();
  const re = /data-authuser="(-?\d+)"[\s\S]{0,4000}?([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
  let m;
  while ((m = re.exec(html))) { const e = m[2].toLowerCase(); if (seen.has(e)) continue; seen.add(e); out.push({ email: e, name: '', photo: '', gaia: '', idx: +m[1] >= 0 ? +m[1] : null, out: +m[1] < 0 }); }
  return out;
}
const SOURCES = [
  ['list', 'https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumAccountReconcilor&json=standard'],
  ['list', 'https://accounts.google.com/ListAccounts?gpsia=1&source=ogb&json=standard&listPages=0&mo=1&mn=1'],
  ['list', 'https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumBrowser&json=standard'],
  ['chooser', 'https://accounts.google.com/AccountChooser?hl=en']
];
async function readAccounts() {
  const errors = [];
  for (const [kind, url] of SOURCES) {
    try {
      const res = await googleRequest(url);
      if (!res.ok) { errors.push(kind + ' ' + res.status); continue; }
      const text = await res.text();
      const list = kind === 'list' ? parseList(text) : parseChooser(text);
      if (list.length) return { ok: true, list, how: kind };
      errors.push(kind + ' empty');
    } catch (e) { errors.push(kind + ' ' + (e && e.message || e)); }
  }
  return { ok: false, list: [], error: errors.join(' · ') };
}

async function listAccounts(force) {
  if (!force && last.res && last.res.ok && Date.now() - last.at < 60000) return last.res;
  const res = await readAccounts();
  last = { at: Date.now(), res };
  await csPlatform.storage.local.set({ cs6acctdiag: { at: Date.now(), ok: res.ok, how: res.how || '', error: res.error || '', n: res.list.length } });
  if (!res.ok) return res;
  // merge into the stored account list (never overwrite what the pages learned, e.g. who "me" is in Chat)
  const d = await csPlatform.storage.local.get([AKEY]);
  const A = (d[AKEY] && d[AKEY].a) || {};
  let changed = false;
  for (const a of res.list) {
    const cur = A[a.email] || {};
    const next = { ...cur, email: a.email, name: a.name || cur.name || '', photo: a.photo || cur.photo || '', gaia: a.gaia || cur.gaia || '', idx: a.idx, out: a.out || undefined, seen: cur.seen || 1 };
    if (a.idx != null) for (const k in A) if (k !== a.email && A[k].idx === a.idx) { if (!A[k].email) { if (A[k].me && !next.me) next.me = A[k].me; delete A[k]; } else A[k] = { ...A[k], idx: null }; changed = true; }
    if (JSON.stringify(next) !== JSON.stringify(cur)) { A[a.email] = next; changed = true; }
  }
  if (changed) await csPlatform.storage.local.set({ [AKEY]: { _w: 'bg', a: A } });
  return res;
}

