/* Chat Studio — notes which Google accounts are signed in, from Google's own account menu (the profile picture in the corner),
   so that each account can get its own design. The list stays in this browser's extension storage and is never sent anywhere. */
(() => {
  if (window.__csAccts) return;
  window.__csAccts = true;
  const RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
  const FID = 'ogs' + Math.random().toString(36).slice(2);
  let last = '';
  const idxIn = s => { const m = String(s || '').match(/authuser=(\d+)/) || String(s || '').match(/\/u\/(\d+)(?=\/|$|\?|#)/); return m ? +m[1] : null; };
  function scan() {
    if (!document.body) return;
    const found = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode());) {
      const t = n.nodeValue;
      if (!t || t.indexOf('@') < 0) continue;
      for (const m of t.matchAll(RE)) {
        const email = m[0].toLowerCase();
        if (found.has(email)) continue;
        const holder = n.parentElement;
        let idx = null;
        for (let x = holder, i = 0; x && i < 7 && idx == null; x = x.parentElement, i++) {
          const au = x.getAttribute('data-authuser');
          if (au && /^\d+$/.test(au)) idx = +au;
          else idx = idxIn(x.getAttribute('href')) ?? (x.closest('a[href]') ? idxIn(x.closest('a[href]').getAttribute('href')) : null);
        }
        let name = '';
        const box = holder && holder.parentElement;
        if (box) for (const c of box.children) { const s = (c.textContent || '').trim(); if (c !== holder && s && !s.includes('@') && s.length < 60) { name = s; break; } }
        found.set(email, { email, idx, name });
      }
    }
    if (!found.size) return;
    const sig = JSON.stringify([...found.values()]);
    if (sig === last) return;
    last = sig;
    try {
      csPlatform.storage.local.get(['cs6acct'], d => {
        const A = (d && d.cs6acct && d.cs6acct.a) || {};
        let changed = false;
        for (const f of found.values()) {
          const cur = A[f.email] || {};
          const next = { ...cur, email: f.email };
          if (f.name && !cur.name) next.name = f.name;
          if (cur.idx == null && f.idx != null) next.idx = f.idx;
          if (!cur.seen) next.seen = 1; // known, not opened yet
          if (JSON.stringify(next) !== JSON.stringify(cur)) { A[f.email] = next; changed = true; }
        }
        if (changed) csPlatform.storage.local.set({ cs6acct: { _w: FID, a: A } });
      });
    } catch {}
  }
  let t = 0;
  const later = () => { clearTimeout(t); t = setTimeout(scan, 400); };
  scan();
  const mo = new MutationObserver(later);
  if (document.body) mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => mo.disconnect(), 60000);
})();
