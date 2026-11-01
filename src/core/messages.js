  /* ================= Message detection ================= */
  const SPECIFIC = '[jsname="bgckF"], .DTp27d';
  const GENERIC = '[data-message-id] div[dir="auto"], [role="listitem"] div[dir="auto"], [data-topic-id] div[dir="auto"]';
  const BOX = '[data-message-id],[data-topic-id],[role="listitem"],c-wiz[data-id]';
  /* Google's own floating UI (menus, tooltips, dialogs): never restyled, never made transparent */
  const POP = '[role="menu"],[role="menubar"],[role="menuitem"],[role="toolbar"],[role="dialog"],[role="alertdialog"],[role="listbox"],[role="option"],[role="tooltip"]';
  const POPUP = ':is([role="menu"],[role="dialog"],[role="alertdialog"],[role="listbox"],[role="tooltip"])';
  const EDITOR = '[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"],[role="textbox"]';
  const hueCache = new Map();
  const hueOf = s => { if (hueCache.has(s)) return hueCache.get(s); let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; const v = h % 360; hueCache.set(s, v); return v; };
  const nameIn = n => n && (n.getAttribute('data-member-id') || n.getAttribute('data-hovercard-id') || n.getAttribute('data-name') || '');
  function senderOf(m) {
    let box = m.closest(BOX);
    for (let i = 0; box && i < 20; i++) {
      const n = box.querySelector('[data-member-id],[data-hovercard-id],[data-name]');
      if (n) return nameIn(n);
      box = box.previousElementSibling;
    }
    return '';
  }
  let hasSpecific = false;
  function candidates(root) {
    const list = root.querySelectorAll(SPECIFIC);
    if (list.length) { hasSpecific = true; return list; }
    if (hasSpecific) return [];
    return [...root.querySelectorAll(GENERIC)].filter(e => !e.querySelector('div[dir="auto"]'));
  }
  const hasPaint = cs => !isTransparent(cs.backgroundColor) || (cs.backgroundImage && cs.backgroundImage !== 'none');
  /* Google draws its own bubble around the text: find it, so we restyle the real bubble instead of stacking a second one. */
  function bubbleOf(txt) {
    const box = txt.closest(BOX);
    for (let e = txt, i = 0; e && i < 7; e = e.parentElement, i++) {
      if (e === box && i > 0) break;
      if (e === document.body || e.matches('[role="list"],[role="main"]') || e.classList.contains('cs-clear')) break;
      if (e !== txt && e.querySelector('[data-cs-c]') && e.querySelectorAll('[data-cs-c]').length > 1) break;
      const cs = getComputedStyle(e);
      if (hasPaint(cs) && (parseFloat(cs.borderTopLeftRadius) || 0) + (parseFloat(cs.borderTopRightRadius) || 0) >= 8) return e;
    }
    return null;
  }
  let firstPass = true;
  function tagMessages(roots) {
    if (!IS_CHAT || !active()) return;
    const found = new Set();
    for (const r of roots) {
      if (!r || (r !== document && !r.isConnected)) continue;
      if (r.nodeType === 1) { const c = r.closest(SPECIFIC); if (c) found.add(c); }
      if (r.querySelectorAll) for (const m of candidates(r)) found.add(m);
    }
    const todo = [];
    for (const m of found) {
      if (m.hasAttribute('data-cs-c')) continue;
      if (m.closest(EDITOR + ',#cs-panel,.cs-root')) { m.setAttribute('data-cs-c', 'x'); continue; }
      if (m.parentElement && m.parentElement.closest('[data-cs-c]')) continue;
      if (!m.textContent.trim() && !m.querySelector('img')) continue; // not filled yet: picked up again when its text arrives
      todo.push(m);
    }
    if (!todo.length) { if (found.size) firstPass = false; return; }
    /* read everything first, then write: no forced re-layout per message */
    const plans = [];
    for (const m of todo) {
      const bub = bubbleOf(m), target = bub || m;
      if (target.classList.contains('cs-msg')) { plans.push({ m, skip: true }); continue; }
      plans.push({ m, bub, target, pos: !bub || getComputedStyle(bub).position !== 'static', sender: senderOf(m), box: m.closest(BOX) });
    }
    if (!firstPass && !calm() && R.enter !== 'none') {
      const vh = innerHeight;
      for (const p of plans) if (!p.skip) { const r = p.target.getBoundingClientRect(); p.anim = r.height > 0 && r.bottom > vh * .3 && r.top < vh; }
    }
    const fresh = [];
    for (const p of plans) {
      p.m.setAttribute('data-cs-c', '');
      if (p.skip) continue;
      const t = p.target;
      t.classList.add('cs-msg', p.bub ? 'cs-wrap' : 'cs-solo');
      if (p.pos) t.classList.add('cs-pos');
      p.m.classList.add('cs-txt');
      if (p.anim) { t.classList.add('cs-new'); setTimeout(() => t.classList.remove('cs-new'), 900); }
      if (p.sender) { t.style.setProperty('--cs-hue', hueOf(p.sender)); t.setAttribute('data-cs-hue', ''); t.dataset.csFrom = p.sender; }
      if (p.box && (p.box.querySelector('[data-is-self="true"],[data-is-own="true"]') || /\b(self|own|outgoing)\b/i.test(typeof p.box.className === 'string' ? p.box.className : ''))) t.classList.add('cs-self');
      // sender name + time line: readable on dark backgrounds too
      const nm = p.box && p.box.querySelector('[data-name],[data-hovercard-id],[data-member-id]');
      const meta = nm && nm.parentElement;
      if (meta && !meta.contains(t) && !t.contains(meta) && !meta.classList.contains('cs-meta')) {
        meta.classList.add('cs-meta'); if (p.sender) meta.style.setProperty('--cs-hue', hueOf(p.sender));
        for (const x of meta.querySelectorAll('*')) x.classList.add('cs-c');
      }
      visIO.observe(t);
      learnMine(p);
      if (p.box) for (const pop of p.box.querySelectorAll(POPUP)) if (!t.contains(pop)) raisePopup(pop);
      fresh.push(t);
    }
    firstPass = false;
    if (!fresh.length) return;
    for (const t of fresh) areaOf(t);
    scanInner(fresh);
    if (bgOn()) { const by = new Map(); for (const t of fresh) { const a = areaOf(t); if (a) (by.get(a) || by.set(a, []).get(a)).push(t); } by.forEach((list, a) => clearRows(list, a)); chipScan(fresh.map(t => t.closest(BOX))); }
    if (metaWanted()) scheduleMeta();
  }
  /* Inside a bubble: elements with their own paint keep Google's colors (mentions, chips, menus, popups);
     boxes outside the text (quotes, link cards) get readable text. Re-run when content loads late. */
  const doneEl = new WeakSet();   // elements with a final decision; others are looked at again later
  const bgLum = c => { const m = String(c).match(/[\d.]+/g); if (!m || m.length < 3) return 1; const a = m.length > 3 ? +m[3] : 1; if (a < .35) return -1; const [r, g, b] = m.slice(0, 3).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  function scanInner(bubs) {
    const W = [];
    const settle = d => { doneEl.add(d); for (const x of d.querySelectorAll('*')) doneEl.add(x); };
    for (const bub of bubs) {
      if (!bub || !bub.isConnected) continue;
      const txt = bub.classList.contains('cs-txt') ? bub : (bub.querySelector('.cs-txt') || bub);
      let abs = false;
      for (const d of bub.querySelectorAll('*')) {
        if (doneEl.has(d)) continue;
        if (d.classList.contains('cs-wa-meta') || d.closest('.cs-keep,.cs-wa-meta')) { settle(d); continue; }
        if (d.matches(POP) || d.querySelector(POP)) { W.push([d, 'keep']); settle(d); continue; }
        const tag = d.tagName;
        if (d.namespaceURI === SVGNS || tag === 'IMG' || tag === 'VIDEO' || tag === 'CANVAS') { doneEl.add(d); continue; }
        const inTxt = d !== txt && txt.contains(d);
        if (!d.hasAttribute('class') && !d.hasAttribute('style')) { if (inTxt) W.push([d, 'c']); doneEl.add(d); continue; }
        const cs = getComputedStyle(d);
        if (cs.position === 'fixed' || cs.position === 'absolute' || cs.position === 'sticky') { abs = true; W.push([d, 'keep']); settle(d); continue; }
        if (hasPaint(cs) && d !== txt && !d.contains(txt)) {
          if (inTxt || d.offsetWidth <= 30 || d.offsetHeight <= 18) W.push([d, 'keep']);          // mention chips, badges, inline code: Google's own colors
          else { const l = bgLum(cs.backgroundColor); W.push([d, 'box', l === -1 || l > .45 ? 'cs-light' : 'cs-dark']); } // quote / link card
          settle(d); continue;
        }
        if (inTxt) { W.push([d, 'c']); doneEl.add(d); }
        // classed, unpainted and outside the text: may get painted once its content loads, so it is checked again later
      }
      if (abs) W.push([bub, 'abs']);
      // an open Google popup inside (tooltip, menu, dialog, "who reacted" card): freeze the bubble so the popup is never moved or made see-through
      const hold = !!bub.querySelector(POPUP) || [...bub.querySelectorAll('.cs-keep')].some(isOpenPopup) || W.some(([d, k]) => k === 'keep' && bub.contains(d) && isOpenPopup(d));
      if (hold !== bub.classList.contains('cs-hold')) W.push([bub, hold ? 'hold' : 'unhold']);
    }
    for (const [d, k, x] of W) {
      if (k === 'keep') { d.classList.remove('cs-c', 'cs-box', 'cs-light', 'cs-dark'); d.classList.add('cs-keep'); }
      else if (k === 'c') d.classList.add('cs-c');
      else if (k === 'box') d.classList.add('cs-box', x);
      else if (k === 'hold') d.classList.add('cs-hold');
      else if (k === 'unhold') d.classList.remove('cs-hold');
      else d.setAttribute('data-cs-abs', '');
    }
  }
  function isOpenPopup(k) {
    if (!k.isConnected || k.offsetWidth < 40 || k.offsetHeight < 18) return false;
    const cs = getComputedStyle(k);
    return (cs.position === 'absolute' || cs.position === 'fixed') && cs.visibility !== 'hidden' && cs.display !== 'none' && hasPaint(cs);
  }
  /* Google's popups next to a message ("who reacted", tooltips, menus) are lifted above the bubbles: themed bubbles
     (glass, glow, animated) form their own layer and would otherwise cover a popup from the message before them */
  function raisePopup(e) {
    if (e.classList.contains('cs-ontop')) return;
    const z = getComputedStyle(e).zIndex;
    if (z === 'auto' || +z < 1000) e.classList.add('cs-ontop');
  }
  /* a floating card Google adds to the page (not a full-width bar or panel): keep it above the themed bubbles */
  function floatCard(e) {
    if (OWN(e) || e.closest('#cs-panel')) return;
    const list = e.matches(POPUP) ? [e] : [...e.querySelectorAll(POPUP)];
    if (isOpenPopup(e)) list.push(e);
    for (const x of list) { const r = x.getBoundingClientRect(); if (r.width < innerWidth * .7 && r.height < innerHeight * .7) raisePopup(x); }
  }
  function rescanVisible() { scanInner([...document.querySelectorAll('.cs-msg.cs-vis')]); }
  /* continuous effects run only on bubbles that are actually on screen */
  const visIO = new IntersectionObserver(es => { for (const e of es) e.target.classList.toggle('cs-vis', e.isIntersecting); }, { rootMargin: '80px' });
  function untagAll() {
    visIO.disconnect();
    document.querySelectorAll('.cs-wa-meta').forEach(e => e.remove());
    document.querySelectorAll('.cs-msg').forEach(m => {
      m.classList.remove('cs-msg', 'cs-new', 'cs-me', 'cs-them', 'cs-self', 'cs-first', 'cs-wrap', 'cs-solo', 'cs-pos', 'cs-rel', 'cs-vis', 'cs-hold');
      for (const a of ['data-cs-side', 'data-cs-edge', 'data-cs-hue', 'data-cs-from', 'data-cs-abs', 'data-cs-mine', 'data-cs-time']) m.removeAttribute(a);
      m.style.removeProperty('--cs-hue'); m.style.removeProperty('animation-delay');
    });
    document.querySelectorAll('.cs-box,.cs-txt,.cs-keep,.cs-c,.cs-meta').forEach(m => m.classList.remove('cs-box', 'cs-light', 'cs-dark', 'cs-txt', 'cs-keep', 'cs-c', 'cs-meta', 'cs-meta-me'));
    document.querySelectorAll('[data-cs-c]').forEach(m => m.removeAttribute('data-cs-c'));
    timeTries.clear();
  }

