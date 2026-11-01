  /* ================= Apply ================= */
  let dynStyle = null, panel = null, anchor = null, lastCSS = null;
  function ensureStyle() {
    if (!dynStyle || !dynStyle.isConnected) { dynStyle = document.createElement('style'); dynStyle.id = 'cs-dyn'; (document.head || H).append(dynStyle); lastCSS = null; }
    return dynStyle;
  }
  function setCSS(css) { const s = ensureStyle(); if (css !== lastCSS) { s.textContent = css; lastCSS = css; } }
  function applyAll(cascadeAnim) {
    if (!active()) { cleanup(); stopObs(); return; }
    if (IS_MAIL) { applyMail(); return; }
    if (tiny()) return; // hidden helper frame: wakes up if it is ever shown (resize)
    const id = curTheme(), d = themeDef(id);
    H.classList.toggle('cs-on', !!d);
    H.classList.toggle('cs-lite', !!G.lite);
    H.classList.toggle('cs-wa', isWAId(id));
    H.classList.toggle('cs-wadk', id === 'k:wadark');
    if(!isWAId(id))document.querySelectorAll('.cs-wa-tail').forEach(e=>e.remove());
    setCSS(buildCSS());
    if (!document.body) return;
    startObs();
    popupGuard.start();
    tagMessages([document]);
    applyBg();
    fxSync();
    if (metaWanted() || document.querySelector('.cs-wa-meta')) scheduleMeta(true);
    if (cascadeAnim) cascade();
  }
  function cleanup() {
    popupGuard.stop();
    H.classList.remove('cs-on', 'cs-bgmode', 'cs-bgdark', 'cs-wa', 'cs-wadk', 'cs-lite');
    if (dynStyle) { dynStyle.textContent = ''; lastCSS = ''; }
    clearBg(); untagAll(); fxStop();
    if (IS_MAIL) unMail();
  }
  function cascade() {
    if (calm() || R.enter === 'none') return;
    const vh = innerHeight; let i = 0;
    const list = [];
    for (const m of document.querySelectorAll('.cs-msg')) { const r = m.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh || !r.height) continue; list.push(m); if (list.length > 40) break; }
    for (const m of list) {
      const delay = i++ * 30;
      m.classList.remove('cs-new'); void m.offsetWidth;
      m.style.animationDelay = delay + 'ms';
      m.classList.add('cs-new');
      setTimeout(() => { m.classList.remove('cs-new'); m.style.removeProperty('animation-delay'); }, 800 + delay);
    }
  }

