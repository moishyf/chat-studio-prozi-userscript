  /* ---------- accounts ---------- */
  const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/;
  let pageAcct = null; // { email, name } read from this page (top frames only)
  /* Google's apps embed the signed-in address in the page data (WIZ_global_data "oPEP7c"; Gmail's GLOBALS) — works in every frame */
  function readFrameEmail() {
    try {
      for (const s of document.scripts) {
        if (s.src) continue;
        const t = s.textContent || '';
        let i = t.indexOf('oPEP7c');
        if (i >= 0) { const m = t.slice(i, i + 300).replace(/\\u0040/g, '@').match(/oPEP7c\\?"\s*:\s*\\?"([\w.+-]+@[\w-]+(?:\.[\w-]+)+)\\?"/); if (m) return m[1].toLowerCase(); }
        i = t.indexOf('var GLOBALS');
        if (i >= 0) { const m = t.slice(i, i + 3000).match(EMAIL_RE); if (m) return m[0].toLowerCase(); }
      }
    } catch {}
    return '';
  }
  function readPageAccount() {
    let email = '', name = '';
    if (IS_TOP) {
      const a = document.querySelector('a[aria-label*="@"][href*="accounts.google.com"], a[aria-label*="@"][href*="SignOutOptions"], [data-ogsr-up] a[aria-label*="@"]');
      const lab = a ? a.getAttribute('aria-label') || '' : '';
      const m = lab.match(EMAIL_RE) || (document.title || '').match(EMAIL_RE);
      if (m) email = m[0].toLowerCase();
      const nm = lab.replace(/[\u200e\u200f]/g, '').match(/:\s*([^\n(]+?)\s*[\n(]/);
      if (nm) name = nm[1].trim();
    }
    const w = readFrameEmail();
    if (w) { if (email && email !== w) name = ''; email = w; }
    return email ? { email, name } : null;
  }
  /* the e-mail of the account this page belongs to (frames learn it from the top page through storage) */
  function curEmail() { return pageAcct?.email || ''; }
  const acctKeyOf = a => a.email ? a.email.toLowerCase() : 'u' + a.idx;
  const myAcctKey = () => curEmail() || 'u' + ACCT_IDX;
  const myAcct = () => ACCTS[myAcctKey()] || ACCTS['u' + ACCT_IDX] || null;
  const onProf = k => !!(k && PROF[k] && !PROF[k].off);
  function meKey() { const email=curEmail(); return email && onProf(email) ? email : null; }
  /* the profile key for this account: its e-mail when known, otherwise its account number */
  const thisKey = () => { const e = curEmail(); if (e) return e; return 'u' + ACCT_IDX; };
  /* account list: several windows/frames may write at the same moment, so changes are merged into what is stored, never overwritten */
  const acctPut = new Map(); // key -> entry (null = delete)
  let acctT = 0;
  function putAcct(k, entry) {
    if (entry) ACCTS[k] = entry; else delete ACCTS[k];
    acctPut.set(k, entry);
    clearTimeout(acctT);
    acctT = setTimeout(async () => {
      const d = await sget([AKEY]);
      const A = (d[AKEY] && d[AKEY].a) || {};
      for (const [key, e] of acctPut) { if (e) A[key] = { ...(A[key] || {}), ...e }; else delete A[key]; }
      acctPut.clear();
      ACCTS = A;
      try { store && store.set({ [AKEY]: { _w: FID, a: A } }); } catch {}
    }, 60 + Math.random() * 120);
  }
  /* every account signed in to this browser, straight from Google (through the extension's background helper) */
  let acctFetchAt = 0;
  function fetchAccounts(force) {
    if (!force && Date.now() - acctFetchAt < 10 * 60e3) return Promise.resolve(null);
    acctFetchAt = Date.now();
    return new Promise(res => {
      try { csPlatform.runtime.sendMessage({ type: 'cs-accounts', force: !!force }, r => { const le = csPlatform.runtime.lastError; res(r || { ok: false, list: [], error: le ? le.message : 'no answer' }); }); }
      catch (e) { res({ ok: false, list: [], error: String(e && e.message || e) }); }
    });
  }
  /* remember this account: top pages read the e-mail from Google's account button; frames get it from them */
  let regTries = 0;
  function registerAccount() {
    const p = readPageAccount(); pageAcct = p;
    const now = Date.now();
    if (pageAcct) {
      const email = pageAcct.email, cur = ACCTS[email] || {};
      let changed = false;
      if (ACCTS['u' + ACCT_IDX] && !ACCTS['u' + ACCT_IDX].email) { const old = ACCTS['u' + ACCT_IDX]; putAcct('u' + ACCT_IDX, null); if (old.me && !cur.me) cur.me = old.me; changed = true; }
      for (const k in ACCTS) if (k !== email && ACCTS[k].idx === ACCT_IDX && ACCTS[k].email) { putAcct(k, { ...ACCTS[k], idx: null }); changed = true; }
      const next = { ...cur, email, idx: ACCT_IDX, name: pageAcct.name || cur.name || '' };
      if (changed || cur.idx !== next.idx || cur.name !== next.name || cur.email !== email || now - (cur.seen || 0) > 6 * 3600e3) { next.seen = now; putAcct(email, next); return true; }
      return false;
    }
    // no e-mail on this page (yet): after a while list it by its account number
    if (IS_TOP && IS_CHAT && ++regTries === 4 && !Object.values(ACCTS).some(a => a.idx === ACCT_IDX)) { putAcct('u' + ACCT_IDX, { idx: ACCT_IDX, seen: now }); return true; }
    return false;
  }
  function viewFor(k) {
    const p = k && PROF[k];
    if (!p || p.off) return G;
    const v = { ...G };
    for (const key of DESIGN_KEYS) if (key in p) v[key] = p[key];
    v.custom = { ...G.custom, ...(p.custom || {}) };
    return v;
  }
  function recompute() { R = viewFor(meKey()); if (editKey && !onProf(editKey)) editKey = null; S = viewFor(editKey); }
  const pickDesign = src => { const o = {}; for (const k of DESIGN_KEYS) o[k] = k === 'custom' ? { ...src.custom } : src[k]; return o; };

