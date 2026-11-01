  /* ---------- pictures: each one is stored on its own and loaded only when it is shown ---------- */
  const imgEntry = id => IMGIX.find(x => x.id === id);
  const dataBlob = src => {
    const [head, b64] = src.split(',');
    const bin = atob(b64), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return new Blob([u], { type: (head.match(/data:([^;]+)/) || [])[1] || 'image/jpeg' });
  };
  const loadUrl = u => new Promise((res, rej) => { const im = new Image(); im.decoding = 'async'; im.onload = () => res(im); im.onerror = rej; im.src = u; });
  const sources = new Map(); // id -> Promise<ImageBitmap | HTMLImageElement>
  function imgSource(id) {
    if (!sources.has(id)) {
      const p = (async () => {
        const e = imgEntry(id); if (!e) throw new Error('gone');
        if (e.t === 'u') return loadUrl(e.u);
        const d = await sget([IPFX + id]);
        if (!d[IPFX + id]) throw new Error('missing');
        return createImageBitmap(dataBlob(d[IPFX + id]));
      })();
      p.catch(() => sources.delete(id));
      sources.set(id, p);
    }
    return sources.get(id);
  }
  const dims = b => [b.naturalWidth || b.width, b.naturalHeight || b.height];
  function drawCover(ctx, bmp, W, Hh) {
    const [bw, bh] = dims(bmp);
    const s = Math.max(W / bw, Hh / bh), w = bw * s, h = bh * s;
    ctx.drawImage(bmp, (W - w) / 2, (Hh - h) / 2, w, h);
  }
  /* soft, blurred copy of the picture fills the empty space, so "fit" modes never show bare bands */
  function blurFill(ctx, bmp, W, Hh, dark) {
    ctx.save(); ctx.filter = 'blur(28px) saturate(1.2)'; drawCover(ctx, bmp, W, Hh); ctx.restore();
    ctx.fillStyle = dark ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.35)'; ctx.fillRect(0, 0, W, Hh);
  }
  function drawFit(ctx, bmp, W, Hh, dpr, fit, dark) {
    const [bw, bh] = dims(bmp);
    if (fit === 'cover') return drawCover(ctx, bmp, W, Hh);
    if (fit === 'stretch') return ctx.drawImage(bmp, 0, 0, W, Hh);
    if (fit === 'tile') {
      const s = Math.min(1, 480 * dpr / Math.max(bw, bh)), tw = bw * s, th = bh * s;
      for (let y = 0; y < Hh; y += th) for (let x = 0; x < W; x += tw) ctx.drawImage(bmp, x, y, tw, th);
      return;
    }
    blurFill(ctx, bmp, W, Hh, dark);
    const s = fit === 'original' ? Math.min(dpr, W / bw, Hh / bh) : Math.min(W / bw, Hh / bh);
    const w = bw * s, h = bh * s;
    ctx.drawImage(bmp, (W - w) / 2, (Hh - h) / 2, w, h);
  }
  function makeThumb(bmp) {
    const c = document.createElement('canvas'); c.width = 160; c.height = 110;
    drawCover(c.getContext('2d'), bmp, 160, 110);
    try { return c.toDataURL('image/jpeg', .72); } catch { return ''; } // links from other sites can't be read back
  }
  function thumb(e) {
    const cv = el('canvas', { class: 'cs-thumb', width: '160', height: '110' });
    const draw = b => drawCover(cv.getContext('2d'), b, 160, 110);
    if (e.th) createImageBitmap(dataBlob(e.th)).then(draw).catch(() => {});
    else imgSource(e.id).then(b => { draw(b); if (e.t === 'd') { const th = makeThumb(b); if (th) { e.th = th; save('x'); } } }).catch(() => {});
    return cv;
  }
  const quickHash = s => { let h = 5381; const step = Math.max(1, s.length >> 13); for (let i = 0; i < s.length; i += step) h = (h * 33 ^ s.charCodeAt(i)) >>> 0; return (h ^ s.length).toString(36); };
  /* one-time move from the old format (all pictures in one huge entry that every window had to load) */
  async function migrateImages(d) {
    const old = await sget(['cs6img', 'cs5img']);
    const arr = Array.isArray(old.cs6img) ? old.cs6img : Array.isArray(old.cs5img) ? old.cs5img : [];
    const ix = [], put = {};
    for (const src of arr) {
      if (typeof src !== 'string') continue;
      const id = 'm' + quickHash(src);
      if (ix.some(x => x.id === id)) continue;
      if (src.startsWith('data:')) { put[IPFX + id] = src; ix.push({ id, t: 'd' }); } else ix.push({ id, t: 'u', u: src });
    }
    const fix = o => { if (o && typeof o.bg === 'string') { const m = o.bg.match(/^img:(\d+)$/); if (m) o.bg = ix[+m[1]] ? 'img:' + ix[+m[1]].id : 'c:whatsapp'; } };
    fix(d.g); for (const k in d.p) fix(d.p[k]);
    put[XKEY] = { _w: FID, x: ix };
    try { await new Promise(r => store.set(put, r)); store.remove(['cs6img', 'cs5img']); } catch {}
    return ix;
  }

