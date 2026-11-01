  /* ---------- Gmail inbox mode ---------- */
  /* Gmail's layers are opaque: full-window layers become transparent, large panels (the mail list, the open mail) become frosted glass */
  function mailScan() {
    if (!document.body) return;
    const vw = innerWidth, vh = innerHeight;
    const q = [...document.body.children]; let n = 0;
    while (q.length && n < 700) {
      const e = q.shift(); n++;
      if (e.id === 'cs-panel' || e.classList.contains('cs-imglayer') || e.tagName === 'SCRIPT' || e.tagName === 'STYLE') continue;
      const r = e.getBoundingClientRect();
      if (r.width < vw * .25 || r.height < vh * .25) continue;
      if (e.classList.contains('cs-mglass')) continue;
      const cs = getComputedStyle(e);
      if (isFloating(e, cs)) continue;
      if (hasPaint(cs) || e.classList.contains('cs-mclear')) {
        if (r.width >= vw * .9 && r.height >= vh * .8) e.classList.add('cs-mclear');
        else { e.classList.add('cs-mglass'); continue; }
      }
      q.push(...e.children);
    }
  }
  function applyMail() {
    if (!document.body) return;
    H.classList.add('cs-mail');
    const d = bgDef(R.bg);
    paintBg(document.body, d);
    embeddedBackground(document.body,d);
    document.body.style.setProperty('background-attachment', 'fixed', 'important');
    if (d.layer) setLayer(document.body, document.body, d.layer); else removeLayer(document.body);
    H.classList.toggle('cs-mdark', !!d.dark);
    mailScan();
  }
  function unMail() {
    clearEmbedded(document.body);
    H.classList.remove('cs-mail', 'cs-mdark');
    if (document.body) for (const p of BG_PROPS) document.body.style.removeProperty(p);
    document.querySelectorAll('.cs-mclear,.cs-mglass').forEach(e => e.classList.remove('cs-mclear', 'cs-mglass'));
    removeLayer(document.body);
  }

