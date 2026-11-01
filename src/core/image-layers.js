  /* ---------- uploaded image layers (canvas: never depends on the page's image policy) ---------- */
  const layers = new Map(); // host -> layer
  function removeLayer(host) { const Ly = layers.get(host); if (!Ly) return; Ly.cv.remove(); if (Ly.box) Ly.box.classList.remove('cs-il-host'); layers.delete(host); }
  function setLayer(host, area, src) {
    // absolute inside the column when it is positioned; otherwise sticky inside the scroller; fixed for Gmail
    const mode = host === document.body && IS_MAIL ? 'fixed' : (getComputedStyle(host).position !== 'static' ? 'abs' : 'sticky');
    const box = mode === 'sticky' ? area : host;
    const Ly = layers.get(host);
    if (Ly && Ly.src === src && Ly.mode === mode && Ly.cv.isConnected) { drawLayer(Ly); return; }
    removeLayer(host);
    const cv = el('canvas', { class: 'cs-imglayer cs-il-' + mode, 'aria-hidden': 'true' });
    if (mode !== 'fixed') box.classList.add('cs-il-host');
    (mode === 'fixed' ? document.body : box).prepend(cv);
    const nl = { cv, host, box: mode === 'fixed' ? null : box, mode, src, key: '' };
    layers.set(host, nl);
    drawLayer(nl);
  }
  function drawLayers() { for (const Ly of layers.values()) drawLayer(Ly); }
  async function drawLayer(Ly) {
    const w = Ly.mode === 'fixed' ? innerWidth : Ly.box.clientWidth, h = Ly.mode === 'fixed' ? innerHeight : Ly.box.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(2, devicePixelRatio || 1), W = Math.round(w * dpr), Hh = Math.round(h * dpr);
    Ly.cv.style.width = w + 'px'; Ly.cv.style.height = h + 'px';
    if (Ly.mode === 'sticky') Ly.cv.style.marginBottom = (-h) + 'px';
    const op = R.bgOpacity, tone = R.bgTone, fit = R.bgFit;
    const key = `${W}x${Hh}|${op}|${tone}|${fit}|${Ly.src}`;
    if (Ly.key === key) return;
    Ly.key = key;
    let bmp; try { bmp = await imgSource(Ly.src); } catch { Ly.key = ''; return; }
    if (layers.get(Ly.host) !== Ly || Ly.key !== key) return;
    Ly.cv.width = W; Ly.cv.height = Hh;
    const ctx = Ly.cv.getContext('2d');
    drawFit(ctx, bmp, W, Hh, dpr, fit, tone === 'dark');
    const o = 1 - op / 100;
    ctx.fillStyle = tone === 'dark' ? `rgba(10,12,20,${o})` : `rgba(255,255,255,${o})`;
    ctx.fillRect(0, 0, W, Hh);
  }

