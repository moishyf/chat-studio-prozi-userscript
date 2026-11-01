  /* ---------- chat areas (one per open chat window; Gmail can show several in one frame) ---------- */
  const areas = new Set();
  const isScroller = e => { const oy = getComputedStyle(e).overflowY; return (oy === 'auto' || oy === 'scroll') && e.clientHeight > 150; };
  function areaOf(node) {
    for (const a of areas) if (a.isConnected && a.contains(node)) return a;
    for (let e = node.parentElement; e && e !== document.body && e !== H; e = e.parentElement) {
      if (isScroller(e)) { areas.add(e); return e; }
    }
    return null;
  }
  function liveAreas() {
    for (const a of areas) if (!a.isConnected) areas.delete(a);
    if (!areas.size) { const m = document.querySelector('.cs-msg'); if (m) areaOf(m); }
    return [...areas];
  }
  /* the conversation column: header + messages + composer (also when a thread / details panel is open beside it),
     but never the app's navigation, search bar or the whole window */
  const SHELL = '[role="navigation"],[role="banner"],[role="search"],input[type="search"]';
  function paneOf(area) {
    let pane = area;
    const A = area.getBoundingClientRect();
    for (let e = area.parentElement; e && e !== H; e = e.parentElement) {
      if (e.id === 'cs-panel') break;
      const r = e.getBoundingClientRect();
      if (r.width > A.width * 1.1 + 12) {
        if (e === document.body && !IN_GMAIL) break;
        if (e.querySelector(SHELL)) break;
        if (!IN_GMAIL && r.width >= innerWidth * .97 && A.width < innerWidth * .75) break;
        if (r.height > Math.max(A.height * 2.5, innerHeight * 1.05)) break;
      }
      pane = e;
      if (e === document.body) break;
    }
    return pane;
  }
  const BG_PROPS = ['background', 'background-image', 'background-size', 'background-color', 'background-attachment', 'background-position'];
  function paintBg(target, d) {
    for (const p of BG_PROPS) target.style.removeProperty(p);
    if (d.img) {
      target.style.setProperty('background-image', d.img, 'important');
      target.style.setProperty('background-color', 'transparent', 'important');
      target.style.setProperty('background-size', 'cover', 'important');
    } else target.style.setProperty('background', d.css, 'important');
  }
  /* moving backgrounds: a separate layer that only slides (GPU), so the chat itself is never repainted */
  function setMover(pane, d) {
    const on = !!(d.img && d.move && R.bgMove && !calm());
    let mv = pane.querySelector(':scope > .cs-bgl');
    if (!on) { if (mv) mv.remove(); pane.classList.remove('cs-bg-move'); return; }
    const td = themeDef(curTheme());
    const bubblesMove = !!(td && td.v.amb && R.liveAnim); // animated bubbles over a sliding layer would re-composite every frame
    if (bubblesMove || getComputedStyle(pane).position === 'static') {   // slow, cheap background drift instead
      if (mv) mv.remove();
      pane.classList.add('cs-bg-move');
      pane.style.setProperty('background-size', '300% 300%', 'important');
      return;
    }
    pane.classList.remove('cs-bg-move');
    if (!mv) { mv = el('div', { class: 'cs-bgl', 'aria-hidden': 'true' }, el('div', { class: 'cs-bgl-in' })); pane.classList.add('cs-il-host'); pane.prepend(mv); }
    if (mv.firstChild.style.backgroundImage !== d.img) mv.firstChild.style.backgroundImage = d.img;
  }
  const isFloating = (e, cs) => cs.position === 'fixed' || e.matches(POP) || !!e.closest(POP);
  const inAny = (list, e) => list.some(a => a === e || a.contains(e));
  const holdsAny = (list, e) => list.some(a => e.contains(a));
  /* strips of the column (top bar, banners, composer bar) and side panels (thread, details): frosted, so the background
     shows through and text stays readable; wrappers that hold a message list become see-through */
  function stripScan(pane, list) {
    const pr = pane.getBoundingClientRect(), pw = pr.width, ph = pr.height;
    if (!pw) return;
    const aw = Math.max(...list.map(a => a.getBoundingClientRect().width), 1);
    const wide = Math.min(pw, aw) * .8;
    const q = [...pane.children]; let n = 0;
    const bars = [];
    while (q.length && n < 400) {
      const e = q.shift(); n++;
      if (inAny(list, e) || e.id === 'cs-panel' || e.classList.contains('cs-imglayer') || e.classList.contains('cs-bgl') || e.classList.contains('cs-fx') || e.closest('.cs-msg,.cs-root,.cs-keep')) continue;
      const r = e.getBoundingClientRect();
      const holds = holdsAny(list, e), panelish = r.width >= pw * .2 && r.height >= ph * .45;
      if (!holds && r.width < wide && !panelish) continue;
      const cs = getComputedStyle(e);
      if (isFloating(e, cs)) continue;
      if (hasPaint(cs) || paintedPseudo(e) || e.classList.contains('cs-bar') || e.classList.contains('cs-clear')) {
        if (!e.classList.contains('cs-clear') && !e.classList.contains('cs-bar')) { e.classList.add(holds ? 'cs-clear' : 'cs-bar'); if (!holds) bars.push(e); }
        if (!holds) continue;
      }
      if (holds || panelish || r.height < ph * .5) q.push(...e.children);
    }
    for (const b of bars) barText(b);
    composerScan(pane, list);
  }
  /* inside a frosted bar: what has its own colour keeps it; the rest can switch to light text over dark backgrounds */
  function barText(bar) {
    const list = bar.querySelectorAll('*'), W = [[bar, 'cs-bt']];
    let n = 0;
    for (const d of list) {
      if (++n > 250) break;
      if (d.closest('.cs-bkeep') || (d.namespaceURI === SVGNS && d.tagName !== 'svg')) continue;
      const cs = getComputedStyle(d);
      if (hasPaint(cs)) { const l = bgLum(cs.backgroundColor); W.push([d, 'cs-bkeep', l === -1 ? '' : l > .4 ? 'cs-bk-l' : 'cs-bk-d']); }
      else if (d.matches(EDITOR + ',input,textarea')) W.push([d, 'cs-bkeep', '']);
      else W.push([d, 'cs-bt']);
    }
    for (const [d, c, x] of W) if (c === 'cs-bkeep' || !d.closest('.cs-bkeep')) { d.classList.add(c); if (x) d.classList.add(x); }
  }
  /* ---------- the composer ----------
     Google draws the input area as: page-coloured surface layer(s)  >  tinted pill  >  editor.
     The surface may be a wrapper, a separate backdrop layer or a pseudo-element, so we go by colour:
     every layer painted in the column's original surface colour is made transparent; anything tinted
     (the pill, the + and send buttons) keeps its own look. */
  const surfaces = new WeakMap(); // pane -> original surface colour (measured before we paint)
  const rgbOf = c => { const m = String(c).match(/[\d.]+/g); return m && m.length >= 3 ? { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? +m[3] : 1 } : null; };
  const near = (c1, c2) => { const x = rgbOf(c1), y = rgbOf(c2); if (!x || !y || x.a < .5) return false; return Math.abs(x.r - y.r) + Math.abs(x.g - y.g) + Math.abs(x.b - y.b) <= 18; };
  function measureSurface(area) {
    for (let e = area; e && e !== H; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor, v = rgbOf(c);
      if (v && v.a >= .5) return c;
      if (e === document.body) break;
    }
    return 'rgb(255, 255, 255)';
  }
  const pseudoBg = e => { for (const ps of ['::before', '::after']) { const c = getComputedStyle(e, ps); if (c.content !== 'none' && c.content !== 'normal' && hasPaint(c)) return c.backgroundColor; } return null; };
  const paintedPseudo = e => !!pseudoBg(e);
  const isSurfaceLayer = (e, surf) => { const c = getComputedStyle(e).backgroundColor; if (near(c, surf)) return true; const p = pseudoBg(e); return !!p && near(p, surf); };
  function clearEl(e) { if (e.matches(POP) || e.closest(POP) || e.closest('.cs-keep')) return; e.classList.remove('cs-bar'); e.classList.add('cs-clear'); }
  function composerScan(pane, list) {
    const surf = surfaces.get(pane);
    const pw = pane.getBoundingClientRect().width;
    // seeds: the editor itself, and our own palette button (it sits in Google's toolbar inside the pill)
    for (const ed of pane.querySelectorAll('[contenteditable]:not([contenteditable="false"]), textarea, .cs-root')) {
      if (inAny(list, ed) || (ed.closest('#cs-panel') && !ed.classList.contains('cs-root'))) continue;
      if (ed.closest(POPUP)) continue;
      let pill = null;
      const cw = Math.min(pw, ...list.map(a => a.getBoundingClientRect().width).filter(Boolean));
      for (let e = ed.parentElement; e && e !== pane; e = e.parentElement) {
        if (holdsAny(list, e)) break;
        if (e.classList.contains('cs-clear')) continue;
        const cs = getComputedStyle(e);
        if (!hasPaint(cs) && !paintedPseudo(e) && !e.classList.contains('cs-bar')) continue;
        if (surf && (e.classList.contains('cs-bar') || isSurfaceLayer(e, surf))) { clearEl(e); if (e.getBoundingClientRect().width >= cw * .8 && !e.classList.contains('cs-cbar')) { e.classList.add('cs-cbar'); barText(e); } continue; }
        if (!pill) { if (e.getBoundingClientRect().width >= cw * .3) pill = e; continue; }
        if (!surf) clearEl(e);
      }
      if (!pill) for (let e = ed.parentElement; e && e !== pane; e = e.parentElement) { if (e.getBoundingClientRect().width >= cw * .3) { pill = e; break; } }
      if (pill) { pill.classList.add('cs-pill'); clearBehind(pane, list, pill, surf); }
    }
  }
  /* look at what is actually rendered around the pill (catches separate backdrop layers and floating layers) */
  function clearBehind(pane, list, pill, surf) {
    const pr = pill.getBoundingClientRect(), qr = pane.getBoundingClientRect(), pw = qr.width;
    if (!pr.width || !pr.height) return;
    const cx = pr.left + pr.width / 2;
    const pts = [[cx, pr.top - 8], [cx, pr.bottom + 8], [cx, Math.min(qr.bottom - 3, pr.bottom + 40)], [pr.left + 14, pr.top - 6], [pr.right - 14, pr.top - 6], [pr.left - 6, pr.top + pr.height / 2], [pr.right + 6, pr.top + pr.height / 2]];
    for (const [x, y] of pts) {
      if (y < qr.top || y > qr.bottom || x < qr.left || x > qr.right) continue;
      for (const e of document.elementsFromPoint(x, y)) {
        if (e === pane || e.contains(pane) || holdsAny(list, e)) break;
        if (e.matches(POP) || e.closest(POP) || e.closest('.cs-keep')) continue;   // a tooltip or menu that happens to be open
        if (!pane.contains(e)) { const r = e.getBoundingClientRect(); if (r.left < qr.left - 4 || r.right > qr.right + 4) continue; } // a floating layer drawn over the column
        if (inAny(list, e) || pill.contains(e) || e.closest('.cs-msg,#cs-panel,.cs-root,.cs-fx,.cs-imglayer,.cs-bgl') || e.classList.contains('cs-clear')) continue;
        const w = e.getBoundingClientRect().width;
        if (surf) { if (w >= pw * .25 && isSurfaceLayer(e, surf)) clearEl(e); }
        else if (w >= pr.width * 1.02 && (hasPaint(getComputedStyle(e)) || paintedPseudo(e))) clearEl(e);
      }
    }
  }
  /* small painted things next to a message (reaction chips, date chips): their text follows their own colour, so they stay readable on dark backgrounds */
  const chipDone = new WeakSet();
  function chipScan(boxes) {
    const W = [];
    for (const box of boxes) {
      if (!box || !box.isConnected) continue;
      let n = 0;
      for (const d of box.querySelectorAll('*')) {
        if (++n > 120) break;
        if (chipDone.has(d)) continue;
        if (d.closest('.cs-msg,.cs-meta,.cs-wa-meta') || d.namespaceURI === SVGNS || d.tagName === 'IMG') { chipDone.add(d); continue; }
        const cs = getComputedStyle(d);
        if (!hasPaint(cs) || cs.backgroundImage !== 'none') continue;
        chipDone.add(d);
        const l = bgLum(cs.backgroundColor);
        if (l !== -1 && d.offsetWidth < box.offsetWidth * .6) W.push([d, l > .4 ? 'cs-bk-l' : 'cs-bk-d']);
      }
    }
    for (const [d, c] of W) d.classList.add(c);
  }
  /* the wrappers between the column and the scroller, and the full-width rows around each message, are painted in
     Google's surface colour: those (and only those) are made see-through, so popups and menus keep their own look */
  function clearChain(area, pane) {
    const W = [];
    for (let e = area.parentElement; e && e !== pane && e !== H; e = e.parentElement) {
      if (e.classList.contains('cs-clear')) continue;
      if (hasPaint(getComputedStyle(e)) || paintedPseudo(e)) W.push(e);
    }
    W.forEach(clearEl);
  }
  const rowSeen = new WeakSet();
  const areaSurf = new WeakMap(); // scroller -> its column's original surface colour
  const surfOf = a => { if (!areaSurf.has(a)) areaSurf.set(a, measureSurface(a)); return areaSurf.get(a); };
  /* a layer counts as "page surface" when it is painted in the column's own colour (or plain white/near-white) */
  const surfaceish = (e, cs, surf) => { const c = cs.backgroundColor, v = rgbOf(c); if (near(c, surf) || (v && v.a >= .5 && v.r + v.g + v.b >= 735)) return true; const p = pseudoBg(e); return !!p && near(p, surf); };
  function clearRows(bubs, area) {
    const aw = area.clientWidth; if (!aw) return;
    const surf = surfOf(area), W = [];
    for (const b of bubs) for (let e = b.parentElement; e && e !== area && e !== H; e = e.parentElement) {
      if (rowSeen.has(e)) break; // the rest of this chain was already checked
      rowSeen.add(e);
      if (e.classList.contains('cs-msg') || e.classList.contains('cs-clear')) continue;
      const cs = getComputedStyle(e);
      if (cs.position === 'fixed' || cs.position === 'absolute') continue;
      if ((hasPaint(cs) || paintedPseudo(e)) && surfaceish(e, cs, surf) && e.getBoundingClientRect().width >= aw * .6) W.push(e);
    }
    W.forEach(clearEl);
  }
  /* wide blocks inside the scroller painted in the page colour that hold no message yet (loading area, history banners) */
  function areaScan(area) {
    const aw = area.clientWidth; if (!aw) return;
    const surf = surfOf(area);
    const q = [...area.children].map(e => [e, 0]); let n = 0;
    const W = [];
    while (q.length && n < 160) {
      const [e, depth] = q.shift(); n++;
      if (e.classList.contains('cs-msg') || e.classList.contains('cs-keep') || e.classList.contains('cs-imglayer') || e.matches(POP)) continue;
      const r = e.getBoundingClientRect();
      if (r.width < aw * .6) continue;
      const cs = getComputedStyle(e);
      if (cs.position === 'fixed' || cs.position === 'absolute') continue;
      if (!e.classList.contains('cs-clear') && (hasPaint(cs) || paintedPseudo(e)) && surfaceish(e, cs, surf)) W.push(e);
      if (depth < 3) for (const c of e.children) q.push([c, depth + 1]);
    }
    W.forEach(clearEl);
  }
  /* last check: sample the top and bottom edge of the column; any wide strip still painted in a solid page colour is frosted */
  function probeStrips(pane, list) {
    const pr = pane.getBoundingClientRect(); if (!pr.width || !pr.height) return;
    const hits = new Set();
    for (const area of list) {
      const ar = area.getBoundingClientRect(); if (!ar.width) continue;
      const ys = [pr.top + 3, pr.top + 26, pr.top + 54, ar.top - 4, ar.top - 22, ar.bottom + 6, pr.bottom - 6].filter(y => (y < ar.top || y > ar.bottom) && y > pr.top && y < pr.bottom);
      const xs = [ar.left + ar.width * .2, ar.left + ar.width * .5, ar.left + ar.width * .8];
      for (const y of ys) for (const x of xs) { const e = document.elementFromPoint(x, y); if (e && pane.contains(e)) hits.add(e); }
    }
    const W = [];
    for (let e of hits) {
      for (; e && e !== pane; e = e.parentElement) {
        if (inAny(list, e)) break;
        if (e.closest('.cs-msg,#cs-panel,.cs-root,.cs-keep,.cs-pill') || e.matches(POP) || e.closest(POP)) break;
        if (e.classList.contains('cs-bar') || e.classList.contains('cs-clear') || e.classList.contains('cs-bkeep')) continue;
        const r = e.getBoundingClientRect();
        if (r.width < Math.min(pr.width, ...list.map(a => a.getBoundingClientRect().width).filter(Boolean)) * .6) continue;
        const cs = getComputedStyle(e);
        if (cs.position === 'fixed') break;
        if (hasPaint(cs) || paintedPseudo(e)) W.push([e, holdsAny(list, e)]);
      }
    }
    for (const [e, holds] of W) { if (holds) clearEl(e); else { e.classList.add('cs-bar'); barText(e); } }
  }
  const panes = new Map(); // pane -> its chat areas (main list, thread panel …)
  function unpaint(pane) {
    clearEmbedded(pane);
    const list = panes.get(pane) || [];
    pane.classList.remove('cs-chat-pane', 'cs-bg-move', 'cs-il-host');
    for (const p of BG_PROPS) pane.style.removeProperty(p);
    pane.querySelectorAll(':scope > .cs-bgl').forEach(e => e.remove());
    pane.querySelectorAll('.cs-bar,.cs-clear,.cs-cbar,.cs-pill,.cs-bt,.cs-bkeep,.cs-bk-l,.cs-bk-d').forEach(e => e.classList.remove('cs-bar', 'cs-clear', 'cs-cbar', 'cs-pill', 'cs-bt', 'cs-bkeep', 'cs-bk-l', 'cs-bk-d'));
    for (const a of list) a.classList.remove('cs-chat-bg');
    removeLayer(pane);
    panes.delete(pane);
  }
  function clearBg() {
    for (const p of [...panes.keys()]) unpaint(p);
    document.querySelectorAll('.cs-bar,.cs-clear,.cs-cbar,.cs-pill,.cs-bt,.cs-bkeep,.cs-bk-l,.cs-bk-d').forEach(e => e.classList.remove('cs-bar', 'cs-clear', 'cs-cbar', 'cs-pill', 'cs-bt', 'cs-bkeep', 'cs-bk-l', 'cs-bk-d'));
  }
  const bgOn = () => IS_CHAT && active() && R.scope === 'all';
  function applyBg() {
    if (!IS_CHAT || !active()) return;
    const on = R.scope === 'all';
    H.classList.toggle('cs-bgmode', on);
    if (!on) { if (panes.size || document.querySelector('.cs-clear,.cs-bar')) clearBg(); H.classList.remove('cs-bgdark'); return; }
    const d = bgDef(effBg(R));
    const want = new Map();
    for (const a of liveAreas()) { const pn = paneOf(a); (want.get(pn) || want.set(pn, []).get(pn)).push(a); }
    const same = (x, y) => x && y && x.length === y.length && x.every(a => y.includes(a));
    for (const p of [...panes.keys()]) if (!want.has(p) || !p.isConnected || !same(panes.get(p), want.get(p))) unpaint(p);
    H.classList.toggle('cs-bgdark', !!d.dark);
    for (const [pane, list] of want) {
      if (!surfaces.has(pane) && !pane.classList.contains('cs-chat-pane')) surfaces.set(pane, measureSurface(list[0]));
      for (const area of list) if (!areaSurf.has(area)) areaSurf.set(area, surfaces.get(pane) || measureSurface(area));
      panes.set(pane, list);
      pane.classList.add('cs-chat-pane');
      paintBg(pane, d);
      setMover(pane, d);
      embeddedBackground(pane,d,list[0]);
      for (const area of list) { area.classList.add('cs-chat-bg'); clearChain(area, pane); }
      stripScan(pane, list);
      for (const area of list) { const bubs = [...area.querySelectorAll('.cs-msg')]; clearRows(bubs, area); areaScan(area); chipScan(bubs.map(b => b.closest(BOX))); }
      probeStrips(pane, list);
      if (d.layer) setLayer(pane, list[0], d.layer); else removeLayer(pane);
    }
  }
  function needBg() {
    let n = 0;
    for (const [p, list] of panes) { if (!p.isConnected || list.some(a => !a.isConnected)) return true; n += list.length; }
    for (const Ly of layers.values()) if (!Ly.cv.isConnected) return true;
    let live = 0; for (const a of areas) if (a.isConnected) live++;
    return live !== n;
  }

