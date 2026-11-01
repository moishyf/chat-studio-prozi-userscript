  /* ================= Helpers ================= */
  const hex2rgb = h => { h = String(h).replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); const n = parseInt(h, 16) || 0; return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgba = (h, a) => { const [r, g, b] = hex2rgb(h); return `rgba(${r},${g},${b},${a})`; };
  const lum = h => { const [r, g, b] = hex2rgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  const onC = (...hs) => hs.reduce((s, h) => s + lum(h), 0) / hs.length > 0.42 ? '#15171c' : '#ffffff';
  const mix = (h, p, w) => `color-mix(in srgb, ${h} ${p}%, ${w})`;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.random() * arr.length | 0];
  const isTransparent = c => !c || c === 'transparent' || /rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/.test(c);

  function el(tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'style') e.style.cssText = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (k === 'value') e.value = v;
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat(3)) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(String(c)));
    if(e.classList.contains('cs-card')) {const check=assetNode(CS_ASSETS['check.svg']);check.setAttribute('class','cs-check');check.setAttribute('aria-hidden','true');e.append(check);e.tabIndex=0;e.setAttribute('role','button');e.setAttribute('aria-label',e.title||'Select');e.addEventListener('keydown',event=>{if(event.target===e&&(event.key==='Enter'||event.key===' ')){event.preventDefault();e.click();}});}
    return e;
  }

  /* Tiny SVG builder: turns our own static icon markup into real SVG nodes (no innerHTML, no image loads). */
  const SVGNS = 'http://www.w3.org/2000/svg';
  let svgSeq = 0;
  function svgNode(markup, vb) {
    const uid = 'csg' + (++svgSeq);
    markup = markup.replace(/id='g'/g, `id='${uid}'`).replace(/url\(#g\)/g, `url(#${uid})`);
    const root = document.createElementNS(SVGNS, 'svg');
    root.setAttribute('viewBox', vb || '0 0 24 24');
    root.setAttribute('aria-hidden', 'true');
    const stack = [root];
    const re = /<(\/?)([a-zA-Z][\w:-]*)((?:\s+[\w:-]+='[^']*')*)\s*(\/?)>/g;
    let m;
    while ((m = re.exec(markup))) {
      const [, close, tag, attrs, self] = m;
      if (close) { if (stack.length > 1) stack.pop(); continue; }
      const n = document.createElementNS(SVGNS, tag);
      attrs.replace(/([\w:-]+)='([^']*)'/g, (_, k, v) => { n.setAttribute(k, v); return ''; });
      stack[stack.length - 1].appendChild(n);
      if (!self) stack.push(n);
    }
    return root;
  }

