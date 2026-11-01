  /* ================= WhatsApp layer: whose message, time, read ticks ================= */
  const isWA = (st = R) => isWAId(curTheme(st));
  const ticksOn = () => IS_CHAT && active() && R.ticks !== 'off' && (R.ticks === 'all' ? !!themeDef(curTheme()) : isWA());
  const metaWanted = () => IS_CHAT && active() && (ticksOn() || isWA());
  /* own messages: learned sender first, then Google's own markers, then where the bubble sits (Google puts yours on the other side) */
  function updateSides(a, bubs) {
    const ac = myAcct() || {};
    let mine = ac.me || '';
    if (!mine && ac.gaia) { const hit = bubs.find(b => (b.dataset.csFrom || '').endsWith('/' + ac.gaia) || b.dataset.csFrom === ac.gaia); if (hit) mine = hit.dataset.csFrom; }
    const need = bubs.filter(b => !b.hasAttribute('data-cs-side'));
    if (!need.length) return;
    const ar = a.getBoundingClientRect(); if (!ar.width) return;
    const rtl = getComputedStyle(a).direction === 'rtl';
    const reads = need.map(b => [b, b.getBoundingClientRect()]);
    for (const [b, r] of reads) {
      if (!r.width) continue;
      const startGap = rtl ? ar.right - r.right : r.left - ar.left, endGap = rtl ? r.left - ar.left : ar.right - r.right;
      const from = b.dataset.csFrom;
      const me = mine && from ? from === mine : b.classList.contains('cs-self') || endGap + 24 < startGap;
      b.setAttribute('data-cs-side', me ? 'me' : 'them');
      b.setAttribute('data-cs-edge', r.left - ar.left <= ar.right - r.right ? 'l' : 'r');
      b.classList.toggle('cs-me', me); b.classList.toggle('cs-them', !me);
      const box = b.closest(BOX), meta = box && box.querySelector('.cs-meta');
      if (meta) meta.classList.toggle('cs-meta-me', me);
    }
  }
  /* first bubble of a run from the same person gets the WhatsApp "tail" */
  function updateGroups(bubs) {
    let prev = null;
    for (const b of bubs) {
      const side = b.getAttribute('data-cs-side'), from = b.dataset.csFrom || '';
      const first = !prev || prev.side !== side || (!!from && !!prev.from && from !== prev.from);
      if (b.classList.contains('cs-first') !== first) b.classList.toggle('cs-first', first);
      let tail=b.querySelector(':scope > .cs-wa-tail');
      if(isWA() && first){if(!tail)b.append(el('span',{class:'cs-wa-tail','aria-hidden':'true'}));}
      else tail?.remove();
      prev = { side, from };
    }
  }
  const TIME_RE = /\b([01]?\d|2[0-3]):[0-5]\d\b/;
  const timeTries = new Map();
  function timeOf(b) {
    if (b.dataset.csTime) return b.dataset.csTime;
    const box = b.closest(BOX) || b.parentElement;
    let t = '';
    const ts = box && box.querySelector('[data-absolute-timestamp]');
    if (ts) { const d = new Date(+ts.getAttribute('data-absolute-timestamp')); if (!isNaN(d)) t = d.toTimeString().slice(0, 5); }
    if (!t && box) for (const e of box.querySelectorAll('*')) {
      if (b.contains(e) || e.closest('.cs-wa-meta')) continue;
      const src = [e.getAttribute('aria-label'), e.getAttribute('data-tooltip'), e.getAttribute('title'), e.children.length ? '' : e.textContent].join(' ');
      const m = src.match(TIME_RE); if (m) { t = m[0]; break; }
    }
    if (!t) { // consecutive messages: Google shows the time once per group, so reuse the group's time
      let prev = box && box.previousElementSibling;
      for (let i = 0; prev && i < 12; i++, prev = prev.previousElementSibling) { const pb = prev.querySelector('.cs-msg'); if (pb && pb.getAttribute('data-cs-side') === b.getAttribute('data-cs-side')) { const pt = timeOf(pb); if (pt) { t = pt; break; } } }
    }
    if (t) b.dataset.csTime = t;
    else { const n = (timeTries.get(b) || 0) + 1; timeTries.set(b, n); if (n > 3) b.dataset.csTime = ''; }
    return t;
  }
  /* Read receipts: only Google's own "seen by" marker counts, so the ticks turn blue only when the other side really saw the message */
  const SEEN_POS = /\bseen\b|\bread by\b|\bread receipt|\bviewed by\b|אישור קריאה|נצפ|נקרא(?:ה)?\s+(?:על[\s-]ידי|ע"י|ע״י)|ראה את|ראתה את|ראו את|צפה ב|צפתה ב|צפו ב|\bvisto\b|\bgelesen\b|\bvu par\b/i;
  const SEEN_NEG = /mark|סמן|סימון|unread|לא נקר|לא נצפ|not seen|typing|מקליד|כותב|כותבת/i;
  const SEEN_ATTRS = ['aria-label', 'data-tooltip', 'title', 'alt', 'data-tooltip-text'];
  const isSeenLabel = v => !!v && SEEN_POS.test(v) && !SEEN_NEG.test(v);
  function lastSeenMarker(a) {
    const els = a.querySelectorAll('[aria-label],[data-tooltip],[title],img[alt],[data-tooltip-text]');
    for (let i = els.length - 1; i >= 0; i--) {
      const e = els[i];
      if (!SEEN_ATTRS.some(at => isSeenLabel(e.getAttribute(at)))) continue;
      if (e.closest('.cs-txt,.cs-wa-meta,#cs-panel') || e.closest(EDITOR)) continue;
      return e;
    }
    return null;
  }
  /* Google Chat shows the other person's small round picture (or letter) next to the last message they have seen.
     It often has no "seen" text at all, so it is recognised by what it is: a small round avatar beside a message,
     not inside the text, the sender line, a button or a reaction. Checked from the newest message backwards. */
  const NOT_MARK = '.cs-txt,.cs-meta,.cs-wa-meta,[role="button"],button,[role="toolbar"],[role="menu"],[role="tooltip"],[role="dialog"],a[href],' + EDITOR;
  const TYPING = /typing|מקליד|מקלידה|כותב|כותבת|מקלידים/i;
  function avatarMark(el, br) {
    const r = el.getBoundingClientRect();
    if (r.width < 10 || r.width > 28 || Math.abs(r.width - r.height) > 3) return false;
    if (r.top + r.height / 2 < br.top + br.height * .5) return false; // the sender's picture sits at the top of a message, a read marker at its bottom
    if (el.closest(NOT_MARK)) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    const round = (parseFloat(cs.borderTopLeftRadius) || 0) >= r.width * .35 || (el.tagName === 'IMG' && el.parentElement && (parseFloat(getComputedStyle(el.parentElement).borderTopLeftRadius) || 0) >= r.width * .35);
    if (!round) return false;
    const pic = el.tagName === 'IMG' || (cs.backgroundImage && cs.backgroundImage !== 'none') || el.querySelector('img');
    const letter = !pic && hasPaint(cs) && el.textContent.trim().length <= 2 && el.children.length <= 1;
    if (!pic && !letter) return false;
    for (let x = el, i = 0; x && i < 4; x = x.parentElement, i++) if (TYPING.test((x.getAttribute && (x.getAttribute('aria-label') || x.getAttribute('data-tooltip'))) || '')) return false;
    return true;
  }
  function lastAvatarMarker(bubs) {
    for (let i = bubs.length - 1, n = 0; i >= 0 && n < 40; i--, n++) {
      const b = bubs[i], box = b.closest(BOX) || b.parentElement;
      if (!box) continue;
      const br = b.getBoundingClientRect();
      if (!br.height) continue;
      const zone = [box];
      for (let s = box.nextElementSibling, j = 0; s && j < 2; s = s.nextElementSibling, j++) { if (s.querySelector('.cs-msg,' + SPECIFIC)) break; zone.push(s); }
      for (let z = zone.length - 1; z >= 0; z--) {
        const list = [...zone[z].querySelectorAll('img,div,span')];
        for (let k = list.length - 1; k >= 0; k--) if (avatarMark(list[k], br)) return list[k];
      }
    }
    return null;
  }
  const SENDING = /sending|שולח|נשלחת|בשליחה|pending/i;
  const TICK = {
    sent: `<path d='M1.5 6.3l2.9 2.9L10.6 2' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/>`,
    two: `<path d='M1 6.3l2.9 2.9L10.1 2' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/><path d='M7.2 8.4l.8.8L14.2 2' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/>`,
    clock: `<circle cx='7' cy='5.5' r='4.6' fill='none' stroke='currentColor' stroke-width='1.2'/><path d='M7 3v2.7l1.8 1.1' fill='none' stroke='currentColor' stroke-width='1.2' stroke-linecap='round'/>`
  };
  function setMeta(b, state, t) {
    const host = b.classList.contains('cs-txt') ? b : (b.querySelector('.cs-txt') || b);
    // Hide only Google's dedicated timestamp nodes, preserving sender names,
    // accessible source text and the original DOM for cleanup.
    const box = b.closest(BOX);
    if (t && box) for (const source of box.querySelectorAll('[data-absolute-timestamp]')) {
      if (!b.contains(source) && source.closest(BOX) === box) source.classList.add('cs-time-source');
    }
    let m = host.querySelector(':scope > .cs-wa-meta');
    const key = `${t}|${state}`;
    if (m && m.dataset.k === key) { if (m !== host.lastChild) host.appendChild(m); return; }
    if (!t && !state) { if (m) m.remove(); return; }
    const was = m ? (m.dataset.k || '').split('|')[1] : '';
    if (!m) m = el('span', { class: 'cs-wa-meta', 'aria-hidden': 'true' });
    m.textContent = '';
    m.dataset.k = key;
    if (t) m.append(el('span', { class: 'cs-wa-time' }, t));
    if (state) {
      const s = svgNode(state === 'sending' ? TICK.clock : state === 'sent' ? TICK.sent : TICK.two, state === 'sending' ? '0 0 14 11' : '0 0 16 11');
      s.setAttribute('class', 'cs-tick cs-tick-' + state + (was && was !== state && state === 'read' ? ' cs-tick-pop' : ''));
      m.append(s);
    }
    if (m !== host.lastChild) host.appendChild(m);
  }
  const MARK_SEL = 'img,[aria-label],[data-tooltip],[data-tooltip-text]';
  let metaT = 0, metaAgain = 0, metaLast = 0;
  function scheduleMeta(now) {
    clearTimeout(metaT);
    const wait = now ? 0 : Math.max(140, 450 - (Date.now() - metaLast)); // at most ~2 checks a second
    metaT = setTimeout(() => idle(() => { metaLast = Date.now(); updateMeta(); }, 300), wait);
  }
  function updateMeta() {
    const want = metaWanted(), showTicks = ticksOn();
    if(!isWA() || !want)document.querySelectorAll('.cs-wa-tail').forEach(e=>e.remove());
    if (!showTicks) {
      document.querySelectorAll('.cs-wa-meta').forEach(e => e.remove());
      document.querySelectorAll('.cs-time-source').forEach(e => e.classList.remove('cs-time-source'));
    }
    if (!want) return;
    let sending = false;
    for (const a of liveAreas()) {
      const bubs = [...a.querySelectorAll('.cs-msg')];
      if (!bubs.length) continue;
      updateSides(a, bubs);
      updateGroups(bubs);
      if (!showTicks) continue;
      const byLabel = lastSeenMarker(a), byAvatar = lastAvatarMarker(bubs);
      const last = byLabel && byAvatar ? (byLabel.compareDocumentPosition(byAvatar) & Node.DOCUMENT_POSITION_FOLLOWING ? byAvatar : byLabel) : byLabel || byAvatar;
      for (const b of bubs) {
        const t = timeOf(b);
        if (b.getAttribute('data-cs-side') !== 'me') { setMeta(b, '', t); continue; }
        const box = b.closest(BOX) || b;
        let state = 'delivered';
        if (SENDING.test(box.getAttribute('aria-label') || '') || box.querySelector('[aria-busy="true"]')) { state = 'sending'; sending = true; }
        else if (last && (box.contains(last) || (b.compareDocumentPosition(last) & Node.DOCUMENT_POSITION_FOLLOWING))) state = 'read';
        setMeta(b, state, t);
      }
    }
    clearTimeout(metaAgain);
    if (sending) metaAgain = setTimeout(scheduleMeta, 1200); // Google clears "sending" without adding nodes
  }

