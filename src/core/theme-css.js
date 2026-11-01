  /* ================= Generated theme CSS ================= */
  function msgDecls(v, o = {}) {
    let s = /gradient\(|url\(/.test(v.bg) ? `background-image:${v.bg} !important;background-color:transparent !important;` : `background-color:${v.bg} !important;background-image:none !important;`;
    s += `color:${v.fg} !important;border:${o.border || v.border || 'none'} !important;`;
    if (o.shadow) s += `box-shadow:${o.shadow} !important;`;
    else if (v.pc) s += `--cs-pc:${v.pc};box-shadow:0 4px 14px ${v.pc};`;
    else s += `box-shadow:${v.shadow || 'none'} !important;`;
    s += `text-shadow:${o.ts || v.ts || 'none'} !important;`;
    if (v.blur && !G.lite && !o.noBlur) s += `backdrop-filter:${v.blur};-webkit-backdrop-filter:${v.blur};`;
    s += `background-size:${v.bgsize || 'auto'};`;
    if (v.clip) s += `background-clip:${v.clip} !important;background-origin:border-box !important;`;
    if (v.amb && !calm() && o.anim) s += `animation:${v.amb};`;
    return s;
  }
  /* slow colour drifts don't need 60 redraws a second: ~8 per second looks the same and costs a fraction */
  const cheapAnim = a => a.replace(/(cs-(?:flow|pulse|sheen))\s+([\d.]+)s\s+[a-z-]+/g, (_, n, d) => `${n} ${d}s steps(${Math.max(12, Math.round(+d * 8))})`);
  const solidOf = c => /gradient\(|url\(/.test(c || '') ? 'transparent' : c;
  const NOPOP = ':not(.cs-hold)';
  function buildCSS() {
    const st = R, id = curTheme(st), d = themeDef(id, st);
    if (!d) return '';
    const v = d.v, sel = 'html.cs-on .cs-msg';
    const radius = (st.shape !== 'auto' && SHAPES[st.shape]) ? SHAPES[st.shape].r : (v.radius || SHAPES.classic.r);
    const font = (st.font !== 'auto' && FONTS[st.font]) ? FONTS[st.font].f : v.font;
    const size = st.size === 'm' && v.size ? v.size : (SIZES[st.size] || SIZES.m);
    const lh = st.size === 'm' && v.lh ? v.lh : '1.5';
    const sp = SPACING[st.spacing] || SPACING.m;
    const pad = st.spacing === 'm' && v.pad ? v.pad : sp.p;
    const o = { shadow: (SHADOWS[st.shadow] || {}).v, border: (BORDERS[st.border] || {}).v, ts: (TEXTFX[st.textFx] || {}).v };
    const w = (WEIGHTS[st.weight] || {}).v;
    const typo = `${font ? `font-family:${font} !important;` : ''}${w ? `font-weight:${w} !important;` : ''}font-size:${size} !important;line-height:${lh} !important;`;
    let css = `${sel}{${msgDecls(v, { ...o, anim: false })}border-radius:${radius} !important;${typo}padding:${pad} !important;--cs-wb:${solidOf(v.bg)};}`;
    // Google sets its own font on the text element itself, so the text gets the font, size and colour directly
    css += `${sel} .cs-txt{${typo}color:${v.fg} !important;${(o.ts || v.ts) ? `text-shadow:${o.ts || v.ts} !important;` : ''}}`;
    css += `${sel}.cs-solo{margin:${sp.m} !important}${sel} .cs-c{color:inherit !important}`;
    if (v.amb && !calm()) css += `${sel}${st.liveAnim ? '.cs-vis' : '.cs-vis:hover'}{animation:${cheapAnim(v.amb)}}`;
    if (v.me) css += `${sel}.cs-me{background-color:${v.me} !important;background-image:none !important;--cs-wb:${v.me}}`;
    if (v.sheen && !calm()) css += `${sel}.cs-pos.cs-vis${NOPOP}${st.liveAnim ? '' : ':hover'}::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;background:linear-gradient(110deg,transparent 40%,rgba(255,255,255,.28) 50%,transparent 60%);background-size:250% 100%;animation:${cheapAnim('cs-sheen 5s ease-in-out')} infinite}`;
    /* bubbles Google didn't position: shine / sheen as an extra background layer (no positioning, so popups stay on top) */
    const nonPos = `${sel}:not(.cs-pos)${NOPOP}`, imgL = /gradient\(|url\(/.test(v.bg) ? v.bg : '';
    const withLayer = (g, pos) => `background-image:${g}${imgL ? ',' + imgL : ''} !important;background-size:250% 100%${imgL ? ',' + (v.bgsize || 'auto') : ''} !important;background-position:${pos}${imgL ? ',0 0' : ''};${v.clip ? `background-clip:padding-box,${v.clip} !important;background-origin:border-box !important;` : ''}`;
    if (st.hover === 'shine' && !G.lite && !v.amb) css += `${nonPos}{${withLayer('linear-gradient(100deg,transparent 30%,rgba(255,255,255,.5) 50%,transparent 70%)', '160% 0')}transition:background-position .8s,transform .25s ease,box-shadow .3s ease}${nonPos}:hover{background-position:-60% 0${imgL ? ',0 0' : ''}}`;
    if (v.sheen && !v.amb && !calm()) css += `${nonPos}.cs-vis${st.liveAnim ? '' : ':hover'}{${withLayer('linear-gradient(110deg,transparent 40%,rgba(255,255,255,.28) 50%,transparent 60%)', '150% 0')}animation:cs-sheen2 5s steps(40) infinite}`;
    if (st.uniq === 'stripe') css += `${sel}[data-cs-hue]{border-inline-start:4px solid hsl(var(--cs-hue) 75% 55%) !important}`;
    if (st.uniq === 'tint') css += `${sel}[data-cs-hue]{box-shadow:inset 0 0 0 999px hsl(var(--cs-hue) 85% 55% / .28),${o.shadow || v.shadow || '0 0 0 transparent'} !important}`;
    if (st.enter !== 'none' && ENTERS[st.enter] && !calm()) css += `html.cs-on .cs-msg.cs-new{animation:cs-e-${st.enter} .6s cubic-bezier(.2,.9,.3,1.2) both !important}`;
    if (!G.lite) css += (HOVERS[st.hover] || HOVERS.none).css(sel + NOPOP);
    return css;
  }

