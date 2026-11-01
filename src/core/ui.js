  /* ================= Panel UI ================= */
  let query = '';
  const sec = (ic, txt) => el('div', { class: 'cs-sec' }, ic ? icon(ic) : null, txt);
  const seg = items => el('div', { class: 'cs-seg' }, items.map(([lbl, on, fn]) => el('button', { type: 'button', class: on ? 'cs-on' : '', onclick: fn }, lbl)));
  const sw = (lbl, desc, on, fn) => el('div', { class: 'cs-sw', role:'switch', tabindex:'0', 'aria-checked':String(on), onkeydown:e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn();}}, onclick: fn }, el('span', null, lbl, desc ? el('small', null, desc) : null), el('div', { class: 'cs-tg' + (on ? ' cs-on' : '') }));
  const chips = items => {
    const row = el('div', { class: 'cs-chips' }, items.map(([lbl, on, fn, ic]) => el('button', { type: 'button', class: 'cs-chip' + (on ? ' cs-on' : ''), onclick: fn }, ic ? icon(ic) : null, lbl)));
    row.addEventListener('wheel', e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { row.scrollLeft += S.lang === 'he' ? -e.deltaY : e.deltaY; e.preventDefault(); } }, { passive: false });
    requestAnimationFrame(() => { const on = row.querySelector('.cs-on'); if (on) { const r = row.getBoundingClientRect(), c = on.getBoundingClientRect(); row.scrollLeft += (c.left + c.width / 2) - (r.left + r.width / 2); } });
    return row;
  };
  const optChips = (obj, key) => chips(Object.keys(obj).map(k => [N(obj[k]), S[key] === k, () => update({ [key]: k })]));
  const stagger = nodes => { nodes.forEach((n, i) => { n.style.animationDelay = Math.min(i, 30) * 14 + 'ms'; }); return nodes; };

  const editingTheme = () => nightNow(S) ? S.nightTheme : S.theme;
  function pickTheme(id) {
    const patch = nightNow(S) ? { nightTheme: id } : { theme: id };
    // the WhatsApp themes bring the complete WhatsApp look: wallpaper, bubbles, time and read ticks
    if (isWAId(id)) Object.assign(patch, WA_PRESET, { bg: id === 'k:wadark' ? 'c:whatsappd' : 'c:whatsapp', ticks: S.ticks === 'off' ? 'wa' : S.ticks });
    update(patch, true);
  }
  function toggleFav(id) { const f = new Set(G.favs); f.has(id) ? f.delete(id) : f.add(id); update({ favs: [...f] }); }

  const TICK_READ = () => { const t = svgNode(TICK.two, '0 0 16 11'); t.setAttribute('class', 'cs-tick cs-tick-read'); return t; };
  function themeCard(id, showStyle) {
    const d = themeDef(id, S), fav = G.favs.includes(id), wa = isWAId(id);
    const c = el('div', { class: 'cs-card' + (wa ? ' cs-wacard' + (id === 'k:wadark' ? ' cs-wacard-dk' : '') : '') + (id === editingTheme() ? ' cs-sel' : ''), title: themeName(id), style: 'background:' + (wa ? bgDef(id === 'k:wadark' ? 'c:whatsappd' : 'c:whatsapp', S).css.replace(/400px/, '220px') : d ? d.card : 'repeating-linear-gradient(45deg,#f3f4f7 0 8px,#eceef3 8px 16px)'), onclick: () => pickTheme(id) });
    if(wa) embeddedBackground(c,{asset:[id==='k:wadark'?'doodle-wad.svg':'doodle-wa.svg',220]});
    if (wa) {
      c.append(el('div', { class: 'cs-wab cs-wab-them' }, S.lang === 'he' ? 'מה שלומך?' : 'How are you?', el('span', { class: 'cs-wa-meta' }, el('span', { class: 'cs-wa-time' }, '19:10'))),
        el('div', { class: 'cs-wab cs-wab-me' }, S.lang === 'he' ? 'מצוין, תודה' : 'Great, thanks', el('span', { class: 'cs-wa-meta' }, el('span', { class: 'cs-wa-time' }, '19:11'), TICK_READ())));
    } else if (d) {
      const base = msgDecls(d.v, { noBlur: true }) + `border-radius:${d.v.radius || '9px 9px 9px 3px'};`;
      c.append(el('div', { class: 'cs-bub b1', style: base + '--cs-hue:210;' }));
      c.append(el('div', { class: 'cs-bub b2', style: base + '--cs-hue:320;' + (d.v.me ? `background-color:${d.v.me} !important;` : '') }));
    } else {
      c.append(el('div', { class: 'cs-bub b1', style: 'background:#fff;border-radius:9px' }), el('div', { class: 'cs-bub b2', style: 'background:#e1e4ea;border-radius:9px' }));
    }
    const [k, st] = id.split(':');
    c.append(el('span', { class: 'cs-lbl' }, themeName(id, true), showStyle && k === 's' ? el('small', null, N(STYLES[st])) : null));
    if (id !== 'none') c.append(el('button', { type: 'button', class: 'cs-fav' + (fav ? ' cs-on' : ''), title: L().favs, onclick: e => { e.stopPropagation(); toggleFav(id); } }, icon(fav ? 'starOn' : 'star')));
    return c;
  }
  function themeList() {
    const q = query.trim().toLowerCase();
    if (q) return ALL_THEMES.filter(id => { const [k, a, b] = id.split(':'); const names = k === 's' ? [PAL[b].he, PAL[b].en, STYLES[a].he, STYLES[a].en] : k === 'k' ? [CLASSIC[a].he, CLASSIC[a].en, a === 'wa' || a === 'wadark' ? 'whatsapp ווטסאפ וואצאפ' : ''] : [TXT.he.none, TXT.en.none]; return names.join(' ').toLowerCase().includes(q); }).slice(0, 150);
    if (S.cat === 'top') return FEATURED;
    if (S.cat === 'favs') return G.favs.filter(id => id === 'none' || themeDef(id, S));
    if (S.cat === 'classic') return ['none', ...Object.keys(CLASSIC).map(k => 'k:' + k)];
    if (S.cat === 'build') return Object.keys(STYLES).map(st => `s:${st}:custom`);
    if (STYLES[S.cat]) return PAL_LIST.map(p => `s:${S.cat}:${p[0]}`);
    return FEATURED;
  }
  function renderThemeGrid(grid) {
    grid.textContent = '';
    const ids = themeList(), l = L();
    const showStyle = !!query.trim() || ['top', 'favs', 'build'].includes(S.cat);
    if (!ids.length) grid.append(el('div', { class: 'cs-empty' }, S.cat === 'favs' && !query ? l.noFavs : l.noRes));
    else grid.append(...stagger(ids.map(id => themeCard(id, showStyle))));
  }
  function builder() {
    const l = L();
    const colorIn = (k, lbl) => el('label', null,
      el('input', { type: 'color', value: S.custom[k], onchange: e => update({ custom: { ...S.custom, [k]: e.target.value } }) }), lbl);
    return el('div', { class: 'cs-custom' }, el('div', { class: 'cs-note', style: 'margin:0 2px 8px' }, l.buildHint),
      el('div', { class: 'cs-colors' }, colorIn('a', l.c1), colorIn('b', l.c2), colorIn('c', l.c3)));
  }

  function tabThemes() {
    const l = L();
    const grid = el('div', { class: 'cs-grid' });
    const input = el('input', { class: 'cs-input', type: 'search', placeholder: l.search(ALL_THEMES.length), value: query,
      oninput: e => { query = e.target.value; renderThemeGrid(grid); } });
    renderThemeGrid(grid);
    return [
      nightNow(S) ? el('div', { class: 'cs-banner' }, l.editingNight) : null,
      el('div', { class: 'cs-search' }, icon('search'), input),
      chips([[l.top, S.cat === 'top', () => setUI({ cat: 'top' })], [l.build, S.cat === 'build', () => setUI({ cat: 'build' }), 'palette'], [l.favs, S.cat === 'favs', () => setUI({ cat: 'favs' })],
        [l.classic, S.cat === 'classic', () => setUI({ cat: 'classic' })], ...Object.keys(STYLES).map(k => [N(STYLES[k]), S.cat === k, () => setUI({ cat: k })])]),
      S.cat === 'build' && !query ? builder() : null,
      grid
    ];
  }

  function bgCard(id) {
    const d = bgDef(id, S);
    const card = el('div', { class: 'cs-card' + (S.bg === id && S.scope === 'all' ? ' cs-sel' : ''), title: bgName(id), style: 'background:' + (d.css || d.img), onclick: () => update({ bg: id, scope: 'all' }) },
      el('span', { class: 'cs-lbl' }, bgName(id)));
    embeddedBackground(card,d);return card;
  }
  function tabBg() {
    const l = L();
    const out = [
      sec('bubble', l.scope),
      seg([[l.onlyMsg, S.scope === 'messages', () => update({ scope: 'messages' })], [l.msgBg, S.scope === 'all', () => update({ scope: 'all' })]]),
      S.scope !== 'all' ? el('div', { class: 'cs-note', style: 'margin:6px 4px 0' }, l.bgHint) : null,
      el('div', { style: 'height:8px' }),
      chips([[l.classic, S.bgCat === 'classic', () => setUI({ bgCat: 'classic' })], [l.mine, S.bgCat === 'mine', () => setUI({ bgCat: 'mine' }), 'image'],
        ...Object.keys(PATTERNS).map(k => [N(PATTERNS[k]), S.bgCat === k, () => setUI({ bgCat: k })])])
    ];
    if (S.bgCat === 'mine') {
      const fileInput = el('input', { type: 'file', accept: 'image/*', class: 'cs-hide', onchange: onFile });
      const urlInput = el('input', { class: 'cs-input', placeholder: l.url, dir: 'ltr', type: 'url', onkeydown: e => { if (e.key === 'Enter') applyUrl(urlInput.value); } });
      out.push(
        el('div', { class: 'cs-row' }, el('button', { type: 'button', class: 'cs-pb cs-full', onclick: () => fileInput.click() }, icon('upload'), l.upload), fileInput),
        el('div', { class: 'cs-row' }, urlInput, el('button', { type: 'button', class: 'cs-pb', onclick: () => applyUrl(urlInput.value) }, icon('link'), l.apply)),
        el('div', { style: 'height:10px' }),
        el('div', { class: 'cs-grid' }, IMGIX.length ? stagger(IMGIX.map(e => {
          const c = el('div', { class: 'cs-card' + (S.bg === 'img:' + e.id && S.scope === 'all' ? ' cs-sel' : ''), onclick: () => update({ bg: 'img:' + e.id, scope: 'all' }) });
          c.append(thumb(e));
          c.append(el('button', { type: 'button', class: 'cs-x', title: '×', onclick: ev => { ev.stopPropagation(); removeImg(e.id); } }, '×'));
          return c;
        })) : el('div', { class: 'cs-empty' }, l.noImgs)),
        sec('frame', l.fit),
        el('div', { class: 'cs-grid cs-g5' }, Object.keys(FITS).map(k => el('div', { class: 'cs-card cs-fitcard' + (S.bgFit === k ? ' cs-sel' : ''), title: N(FITS[k].d), onclick: () => update({ bgFit: k }) },
          svgNode(FITS[k].i), el('span', { class: 'cs-lbl' }, N(FITS[k]))))),
        el('div', { class: 'cs-note', style: 'margin:6px 4px 0' }, N(FITS[S.bgFit] ? FITS[S.bgFit].d : FITS.contain.d)),
        sec(null, l.tone),
        seg([[l.toneLight, S.bgTone === 'light', () => update({ bgTone: 'light' })], [l.toneDark, S.bgTone === 'dark', () => update({ bgTone: 'dark' })]]),
        sec(null, l.opacity),
        el('input', { type: 'range', class: 'cs-range', min: '10', max: '100', value: String(S.bgOpacity), oninput: e => quiet({ bgOpacity: +e.target.value }) })
      );
    } else {
      const ids = !PATTERNS[S.bgCat] ? Object.keys(CBG).map(k => 'c:' + k) : ['custom', ...PAL_LIST.map(p => p[0])].map(k => `p:${S.bgCat}:${k}`);
      out.push(el('div', { class: 'cs-grid' + (S.scope === 'all' ? '' : ' cs-dim') }, stagger(ids.map(bgCard))));
    }
    out.push(el('div', { style: 'height:6px' }), sw(l.bgMove, null, S.bgMove, () => update({ bgMove: !S.bgMove })));
    return out;
  }

  function tabFx() {
    const l = L();
    const sub = S.fxSub || 'motion';
    const out = [chips([[l.subMotion, sub === 'motion', () => setUI({ fxSub: 'motion' }), 'wand'], [l.subLook, sub === 'look', () => setUI({ fxSub: 'look' }), 'frame'], [l.subText, sub === 'text', () => setUI({ fxSub: 'text' }), 'type']])];
    if (sub === 'motion') out.push(
      sec('wand', l.enter),
      el('div', { class: 'cs-grid cs-g4' }, stagger(Object.keys(ENTERS).map(k => el('div', { class: 'cs-card cs-demo cs-ecard' + (S.enter === k ? ' cs-sel' : ''), style: `--a:cs-e-${k}`, onclick: () => { update({ enter: k }); cascade(); } },
        el('div', { class: 'cs-db' }), el('span', { class: 'cs-lbl' }, N(ENTERS[k])))))),
      sec('sparkle', l.fx),
      el('div', { class: 'cs-grid cs-g4' }, stagger(Object.keys(FXN).map(k => el('div', { class: 'cs-card cs-fxcard' + (S.fx === k ? ' cs-sel' : ''), onclick: () => update({ fx: k }) },
        svgNode(FXI[k]), el('span', { class: 'cs-lbl' }, N(FXN[k])))))),
      S.fx !== 'none' ? [sec(null, l.density), el('input', { type: 'range', class: 'cs-range', min: '10', max: '150', value: String(S.fxDensity), onchange: e => update({ fxDensity: +e.target.value }) })] : null,
      sec('pin', l.hover), optChips(HOVERS, 'hover'));
    if (sub === 'look') out.push(
      sec('bubble', l.shape),
      el('div', { class: 'cs-grid cs-g4' }, stagger(Object.keys(SHAPES).map(k => el('div', { class: 'cs-card cs-demo' + (S.shape === k ? ' cs-sel' : ''), onclick: () => update({ shape: k }) },
        el('div', { class: 'cs-db', style: `border-radius:${SHAPES[k].r || (themeDef(curTheme(S), S) || { v: {} }).v.radius || SHAPES.classic.r};animation:none` }), el('span', { class: 'cs-lbl' }, N(SHAPES[k])))))),
      sec('drop', l.shadow), optChips(SHADOWS, 'shadow'),
      sec('frame', l.border), optChips(BORDERS, 'border'),
      sec(null, l.spacing), seg(['s', 'm', 'l'].map(k => [l.sp[k], S.spacing === k, () => update({ spacing: k })])));
    if (sub === 'text') out.push(
      sec('type', l.font),
      el('div', { class: 'cs-grid' }, stagger(Object.keys(FONTS).map(k => el('div', { class: 'cs-card cs-fontcard' + (S.font === k ? ' cs-sel' : ''), style: FONTS[k].f ? `font-family:${FONTS[k].f}` : '', onclick: () => update({ font: k }) },
        S.lang === 'he' ? 'שלום עולם' : 'Hello there', el('span', { class: 'cs-lbl' }, N(FONTS[k])))))),
      sec('type', l.size), seg([['A−', 's'], ['A', 'm'], ['A+', 'l'], ['A++', 'xl']].map(([t, k]) => [t, S.size === k, () => update({ size: k })])),
      sec(null, l.weight), seg(Object.keys(WEIGHTS).map(k => [N(WEIGHTS[k]), S.weight === k, () => update({ weight: k })])),
      sec('sparkle', l.textFx), optChips(TEXTFX, 'textFx'));
    return out;
  }

  /* ---------- this account ---------- */
  function curAcctInfo() {
    const email = curEmail(), a = (email && ACCTS[email]) || ACCTS['u' + ACCT_IDX] || {};
    return { k: thisKey(), email, name: (pageAcct && pageAcct.name) || a.name || '', photo: a.photo || '', idx: ACCT_IDX };
  }
  const acctTitle = a => a.name || a.email || L().acctN(a.idx + 1);
  const acctAvatar = a => {
    const s = (a.name || a.email || String(a.idx + 1)).trim();
    const av = el('span', { class: 'cs-av', style: `--cs-hue:${hueOf(a.email || a.k || s)}` }, s.charAt(0).toUpperCase());
    if (a.photo && /^https:\/\/[\w.-]+\.googleusercontent\.com\//.test(a.photo)) av.append(el('img', { src: a.photo, alt: '', referrerpolicy: 'no-referrer', onerror: e => e.target.remove() }));
    return av;
  };
  /* switch: this account gets its own design (switching off keeps it, so switching on again brings it back) */
  function toggleOwn(k) {
    if(!curEmail() || k !== curEmail()) return toast(L().acctNoEmail);
    if (onProf(k)) { PROF[k].off = true; if (editKey === k) editKey = null; toast(L().acctBack); }
    else { if (PROF[k]) delete PROF[k].off; else PROF[k] = pickDesign(G); editKey = k; toast(L().acctMade); }
    save('p'); recompute(); applyAll(true); buildPanel();
  }
  function acctSection() {
    const l = L(), a = curAcctInfo(), own = onProf(a.k);
    return [
      sec('user', l.acctThis),
      el('div', { class: 'cs-acct cs-acct-cur' }, acctAvatar(a),
        el('span', { class: 'cs-acct-t' }, el('b', null, acctTitle(a), el('i', { class: 'cs-badge' }, l.acctCur)),
          el('small', { class: 'cs-mail' }, a.email || l.acctNoEmail), el('small', null, l.acctN(a.idx + 1)))),
      sw(l.acctSep, own ? l.acctSepOn : l.acctSepOff, own, () => toggleOwn(a.k)),
      own ? seg([[l.acctEditThis, editKey === a.k, () => { editKey = a.k; recompute(); buildPanel(); }], [l.acctEditAll, !editKey, () => { editKey = null; recompute(); buildPanel(); }]]) : null,
      el('div', { class: 'cs-note', style: 'margin:8px 4px 0' }, l.acctOther)
    ];
  }
  function editBar() {
    if (!editKey) return null;
    const a = curAcctInfo(), l = L();
    return el('div', { class: 'cs-editbar', title: a.email || '' }, acctAvatar(a), el('span', { class: 'cs-eb-t' }, el('span', null, l.acctEditingThis), el('b', { class: 'cs-mail' }, a.name && a.email ? `${a.name} · ${a.email}` : acctTitle(a))),
      el('button', { type: 'button', class: 'cs-pb cs-ghost', title: l.acctEditAll, onclick: () => { editKey = null; recompute(); buildPanel(); } }, l.acctAllShort));
  }

  function tabSet() {
    const l = L();
    const codeIn = el('input', { class: 'cs-input', placeholder: l.paste, dir: 'ltr' });
    return [
      ...acctSection(),
      sec('pin', l.where),
      sw(l.inGmail, l.inGmailD, G.inGmail, () => update({ inGmail: !G.inGmail })),
      sw(l.onChat, l.onChatD, G.onChat, () => update({ onChat: !G.onChat })),
      sw(l.inMail, l.inMailD, G.inMail, () => update({ inMail: !G.inMail })),
      sec('gear', l.perf),
      sw(l.lite, l.liteD, G.lite, () => update({ lite: !G.lite })),
      sw(l.live, l.liveD, G.liveAnim, () => update({ liveAnim: !G.liveAnim })),
      sec('bubble', l.ticks),
      seg([['off', l.tk.off], ['wa', l.tk.wa], ['all', l.tk.all]].map(([k, t]) => [t, S.ticks === k, () => update({ ticks: k })])),
      el('div', { class: 'cs-note', style: 'margin:6px 4px 0' }, l.ticksD),
      sec('users', l.uniq),
      seg(['none', 'stripe', 'tint'].map(k => [l.u[k], S.uniq === k, () => update({ uniq: k })])),
      sec('moon', l.dayNight),
      sw(l.autoNight, l.autoNightD, S.autoNight, () => update({ autoNight: !S.autoNight }, true)),
      el('div', { class: 'cs-row', style: 'justify-content:space-between;padding:0 4px' }, el('span', { class: 'cs-note' }, l.nightIs + ' ' + themeName(S.nightTheme)),
        el('button', { type: 'button', class: 'cs-pb cs-ghost', onclick: () => { update({ nightTheme: S.theme }, nightNow(S)); toast(l.nightSet); } }, l.setNight)),
      sec('globe', l.lang),
      seg([['עברית', G.lang === 'he', () => update({ lang: 'he' })], ['English', G.lang === 'en', () => update({ lang: 'en' })]]),
      sec('share', l.share),
      el('div', { class: 'cs-row' }, el('button', { type: 'button', class: 'cs-pb cs-full', onclick: () => copyCode(codeIn) }, icon('copy'), l.copy)),
      el('div', { class: 'cs-row' }, codeIn, el('button', { type: 'button', class: 'cs-pb', onclick: () => loadCode(codeIn.value) }, l.load)),
      el('div', { class: 'cs-row', style: 'justify-content:space-between;margin-top:16px' },
        el('span', { class: 'cs-note' }, `${ALL_THEMES.length} ${l.themesN} · ${ALL_BGS} ${l.bgsN} · ${l.note}`),
        el('button', { type: 'button', class: 'cs-ib', onclick: resetAll }, icon('reset'), l.reset)),
      el('a', { class: 'cs-credit', href: 'https://mitmachim.top/user/%D7%9C%D7%A9%D7%9B%D7%AA-%D7%94%D7%A8%D7%91', target: '_blank', rel: 'noopener noreferrer', title: 'לשכת הרב' },
        icon('sparkle'), el('b', null, 'כל הזכויות שמורות בס"ד: לשכת הרב')),
      el('div',{class:'cs-credit'},icon('sparkle'),el('b',null,S.lang==='he'?'גרסת הסקריפט והתוספות: ':'Userscript conversion & additions: ',el('a',{href:'https://mitmachim.top/user/%D7%A4%D7%A8%D7%95%D7%96%D7%99',target:'_blank',rel:'noopener noreferrer'},S.lang==='he'?'פרוזי':'Prozi'))),
      ...backupControls(el, S.lang),
      el('div',{class:'cs-note',dir:'ltr'},'Chat Studio '+CS_VERSION)
    ];
  }
  function resetAll() {
    if (editKey) update(pickDesign({ ...DEFAULTS, custom: S.custom }), true);
    else update({ ...DEFAULTS, lang: G.lang, favs: G.favs, custom: G.custom, tab: G.tab }, true);
  }

  function buildPanel(animate = true) {
    const l = L();
    const wasOpen = panel && panel.classList.contains('cs-open');
    const oldBody = panel && panel.querySelector('.cs-body');
    const scroll = oldBody ? oldBody.scrollTop : 0, sameTab = panel && panel.dataset.tab === S.tab;
    const pos = panel ? [panel.style.left, panel.style.top, panel.style.transformOrigin] : null;
    const focusSearch = panel && document.activeElement && document.activeElement.type === 'search' && panel.contains(document.activeElement);
    if (panel) panel.remove();
    for(const target of assetLayers.keys()) if(!target.isConnected) clearEmbedded(target);

    const body = el('div', { class: 'cs-body' }, editBar(), S.tab === 'bg' ? tabBg() : S.tab === 'fx' ? tabFx() : S.tab === 'set' ? tabSet() : tabThemes());
    const tab = (k, ic, lbl) => el('button', { type: 'button', class: 'cs-tab' + (S.tab === k ? ' cs-on' : ''), onclick: () => setUI({ tab: k }) }, icon(ic), lbl);

    panel = el('div', { id: 'cs-panel', dir: G.lang === 'he' ? 'rtl' : 'ltr', 'data-tab': S.tab },
      el('div', { class: 'cs-head' },
        el('div', { class: 'cs-title' }, icon('sparkle'), el('b', null, l.title)),
        el('div', { class: 'cs-hbtns' },
          el('button', { type: 'button', class: 'cs-ib cs-grad', title: l.random, onclick: surprise }, icon('dice'), l.random),
          el('button', { type: 'button', class: 'cs-ib', title: l.lang, onclick: () => update({ lang: G.lang === 'he' ? 'en' : 'he' }) }, G.lang === 'he' ? 'EN' : 'עב'),
          el('button', { type: 'button', class: 'cs-ib', onclick: closePanel }, icon('close')))),
      el('div', { class: 'cs-tabs' }, tab('themes', 'brush', l.tabThemes), tab('bg', 'image', l.tabBg), tab('fx', 'wand', l.tabFx), tab('set', 'gear', l.tabSet)),
      body);

    const d = themeDef(curTheme(S), S);
    if (d && d.dark) panel.classList.add('cs-dark');
    if (!animate || (sameTab && wasOpen)) panel.classList.add('cs-quiet');
    for (const ev of ['keydown', 'keyup', 'keypress', 'mousedown', 'pointerdown', 'click', 'paste', 'input', 'focusin', 'wheel']) panel.addEventListener(ev, e => e.stopPropagation());
    document.body.appendChild(panel);
    if (pos) { panel.style.left = pos[0]; panel.style.top = pos[1]; panel.style.transformOrigin = pos[2]; }
    if (sameTab) body.scrollTop = scroll;
    if (wasOpen) {
      panel.style.transition = 'none';
      panel.classList.add('cs-open');
      requestAnimationFrame(() => requestAnimationFrame(() => { if (panel) panel.style.transition = ''; }));
    }
    if (focusSearch) { const s = panel.querySelector('input[type="search"]'); if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); } }
  }
  const refreshPanel = () => buildPanel(false);

  /* a change goes to the look being edited: the default look, or one account's own look */
  function applyPatch(patch) {
    pageAcct = readPageAccount(); recompute();
    const tgt = editKey && PROF[editKey];
    let p = false, g = false;
    for (const k in patch) {
      if (tgt && DESIGN_KEYS.includes(k)) { tgt[k] = patch[k]; p = true; }
      else { G[k] = patch[k]; g = true; }
    }
    if (p) save('p');
    if (g) save('g');
  }
  function setUI(patch) { Object.assign(G, patch); recompute(); save('g'); if (panel) buildPanel(); }
  function update(patch, cascadeAnim) {
    applyPatch(patch);
    recompute();
    applyAll(cascadeAnim);
    if (panel) refreshPanel();
  }
  /* sliders: apply live without rebuilding the panel */
  function quiet(patch) { applyPatch(patch); recompute(); if (IS_MAIL) applyMail(); else { applyBg(); drawLayers(); } }

  function surprise() {
    const ids = ALL_THEMES.filter(x => x !== 'none');
    const pats = Object.keys(PATTERNS), pal = pick(PAL_LIST)[0];
    update({
      theme: pick(ids), bg: Math.random() < .25 ? 'c:' + pick(Object.keys(CBG)) : `p:${pick(pats)}:${pal}`, scope: 'all',
      enter: pick(Object.keys(ENTERS).filter(k => k !== 'none')), shape: Math.random() < .5 ? 'auto' : pick(Object.keys(SHAPES))
    }, true);
    toast(L().surprised);
  }

  /* ---------- images ---------- */
  const MAX_IMGS = 12;
  async function addImg(entry, data) {
    const put = {};
    if (data) put[IPFX + entry.id] = data;
    const next = [entry, ...IMGIX.filter(x => x.id !== entry.id && !(entry.u && x.u === entry.u))];
    const gone = next.slice(MAX_IMGS);
    put[XKEY] = { _w: FID, x: next.slice(0, MAX_IMGS) };
    try { await store.set(put); } catch { return; }
    IMGIX = next.slice(0, MAX_IMGS);
    for (const g of gone) forgetImg(g.id);
    sources.delete(entry.id);
    update({ bg: 'img:' + entry.id, scope: 'all', bgCat: 'mine' });
    toast(L().saved);
  }
  function forgetImg(id) {
    try { store && store.remove(IPFX + id); } catch {}
    sources.delete(id);
    const fix = o => { if (o && o.bg === 'img:' + id) o.bg = 'c:whatsapp'; };
    fix(G); for (const k in PROF) fix(PROF[k]);
    save('g', 'p');
  }
  function removeImg(id) {
    IMGIX = IMGIX.filter(x => x.id !== id);
    forgetImg(id);
    save('x');
    recompute(); applyAll(); if (panel) refreshPanel();
  }
  const newId = () => 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  function applyUrl(v) {
    v = (v || '').trim();
    if (!/^https?:\/\/\S+$/i.test(v)) return toast(L().badUrl);
    loadUrl(v).then(() => addImg({ id: newId(), t: 'u', u: v })).catch(() => toast(L().badUrl));
  }
  async function onFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) return toast(L().tooBig);
    try {
      const bmp = await createImageBitmap(f);
      const k = Math.min(1, 2560 / Math.max(bmp.width, bmp.height));
      const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      await addImg({ id: newId(), t: 'd', th: makeThumb(c) }, c.toDataURL('image/jpeg', 0.9));
      bmp.close();
    } catch { toast(L().badUrl); }
  }

  /* ---------- share code ---------- */
  const SHARE_KEYS = ['lite', 'liveAnim', 'theme', 'nightTheme', 'autoNight', 'scope', 'bg', 'bgMove', 'bgOpacity', 'bgTone', 'uniq', 'enter', 'hover', 'fx', 'fxDensity', 'shape', 'font', 'size', 'spacing', 'shadow', 'textFx', 'weight', 'border', 'custom', 'bgFit', 'ticks'];
  function copyCode(input) {
    const o = {}; for (const k of SHARE_KEYS) o[k] = S[k];
    if (String(o.bg).startsWith('img:')) o.bg = 'c:whatsapp';
    const code = 'CS6:' + btoa(unescape(encodeURIComponent(JSON.stringify(o))));
    input.value = code; input.select();
    const done = () => toast(L().copied);
    try { navigator.clipboard.writeText(code).then(done, () => { try { document.execCommand('copy'); done(); } catch {} }); } catch { try { document.execCommand('copy'); done(); } catch {} }
  }
  function loadCode(v) {
    try {
      v = (v || '').trim();
      if (!/^CS[56]:/.test(v)) throw 0;
      const o = JSON.parse(decodeURIComponent(escape(atob(v.slice(4)))));
      const patch = {}; for (const k of SHARE_KEYS) if (k in o && typeof o[k] === typeof DEFAULTS[k]) patch[k] = o[k];
      if (typeof patch.bg === 'string' && patch.bg.startsWith('img:')) delete patch.bg;
      validateBackup({format:BACKUP_FORMAT,schema:1,values:{cs6:patch}});
      update(patch, true); toast(L().loaded);
    } catch { toast(L().badCode); }
  }

  function toast(msg) {
    if (!document.body) return;
    const d = el('div', { class: 'cs-toast' }, msg);
    document.body.appendChild(d); setTimeout(() => d.remove(), 2400);
  }

  function openPanel() {
    clearTimeout(closeT);
    editKey = meKey(); // the panel opens on the look this page is showing
    recompute();
    buildPanel();
    const r = anchor.getBoundingClientRect();
    const w = panel.offsetWidth || 384, h = panel.offsetHeight || 600;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    let top = r.top - h - 10;
    if (top < 8) top = Math.min(r.bottom + 10, innerHeight - h - 8);
    panel.style.left = Math.max(8, left) + 'px';
    panel.style.top = Math.max(8, top) + 'px';
    panel.style.transformOrigin = `${r.left + r.width / 2 - Math.max(8, left)}px ${top < r.top ? h : 0}px`;
    requestAnimationFrame(() => panel && panel.classList.add('cs-open'));
    anchor.classList.add('cs-active');
  }
  let closeT = 0;
  function closePanel() {
    if (panel) { panel.classList.remove('cs-open'); const p = panel; clearTimeout(closeT); closeT = setTimeout(() => { if (panel === p && !p.classList.contains('cs-open')) { p.remove(); panel = null; } }, 380); }
    document.querySelectorAll('.cs-btn.cs-active').forEach(b => b.classList.remove('cs-active'));
  }

  function makeBtn(fab) {
    const ic = icon('palette');
    const b = el('div', { class: 'cs-btn' + (fab ? ' cs-fab' : ''), role: 'button', tabindex: '0', title: L().btn, 'aria-label': L().btn }, ic);
    const pause = () => { try { ic.pauseAnimations(); } catch {} };
    requestAnimationFrame(pause);
    b.addEventListener('mouseenter', () => { try { ic.unpauseAnimations(); } catch {} });
    b.addEventListener('mouseleave', pause);
    const toggle = e => {
      e.preventDefault(); e.stopPropagation();
      const open = panel && panel.classList.contains('cs-open');
      closePanel();
      if (!open || anchor !== b) { anchor = b; openPanel(); }
    };
    b.addEventListener('click', toggle);
    b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggle(e); });
    for (const ev of ['mousedown', 'pointerdown', 'mouseup']) b.addEventListener(ev, e => e.stopPropagation());
    return b;
  }

  /* ================= Official compose-toolbar injection ================= */
  const PRIMARY = /emoji|אמוג|אימוג|סמייל/i;
  const SECONDARY = /gif|upload|העלא|drive|דרייב|format|עיצוב|פורמט|attach|צירוף|צרף|video|meet|וידאו|calendar|יומן|mention|אזכור|integration|app|אפליקצ|\bmore\b|עוד|sticker|מדבק|voice|קול|הקלט/i;
  const SEND = /send|שליחה|שלח/i;
  const labelOf = b => [b.getAttribute('aria-label'), b.getAttribute('data-tooltip'), b.getAttribute('title'), b.getAttribute('data-tooltip-text')].filter(Boolean).join(' ');
  const BTN_SEL = '[role="button"],button';

  let lastInject = 0, lastEdCount = -1;
  function injectButtons(force) {
    if (!IS_CHAT || tiny() || !document.body) return; // the button always appears in Chat so settings stay reachable
    const now = Date.now();
    if (!force && now - lastInject < 1200) return;
    lastInject = now;
    const eds = document.querySelectorAll('[contenteditable]:not([contenteditable="false"]), textarea[aria-label]');
    const roots = document.getElementsByClassName('cs-root').length;
    if (!force && eds.length === lastEdCount && roots >= Math.min(1, eds.length)) return;
    lastEdCount = eds.length;
    let done = !!document.querySelector('.cs-root');
    for (const ed of eds) {
      if (ed.closest('#cs-panel') || ed.closest(POPUP)) continue;
      let box = ed.parentElement, hint = null;
      for (let i = 0; i < 12 && box && box !== document.body; i++, box = box.parentElement) {
        if (box.querySelector('.cs-root')) { hint = 'done'; break; }
        const btns = [...box.querySelectorAll(BTN_SEL)].filter(b => !b.closest('.cs-root') && !b.contains(ed) && b.offsetParent !== null);
        if (btns.length < 2) continue;
        hint = btns.find(b => PRIMARY.test(labelOf(b))) || btns.find(b => SECONDARY.test(labelOf(b)) && !SEND.test(labelOf(b)));
        if (hint) break;
      }
      if (!hint || hint === 'done') continue;
      let target = hint;
      while (target.parentElement && target.parentElement !== box && target.parentElement.querySelectorAll(BTN_SEL).length < 2) target = target.parentElement;
      // match the size of Google's own toolbar buttons
      const ref = hint.getBoundingClientRect();
      const root = el('div', { class: 'cs-root' }, makeBtn(false));
      if (ref.width >= 28 && ref.width <= 56) { const b = root.firstChild; b.style.width = b.style.height = Math.round(ref.width) + 'px'; }
      target.parentElement.insertBefore(root, target);
      done = true;
    }
    if (done) {
      document.querySelectorAll('.cs-fab').forEach(f => f.remove());
      try { if (!IS_TOP) window.top.postMessage({ csInjected: true }, '*'); } catch {}
    }
  }
  let childHasBtn = false;
  window.addEventListener('message', e => { if (e.data && e.data.csInjected) { childHasBtn = true; document.querySelectorAll('.cs-fab').forEach(f => f.remove()); } });
  function ensureFab() {
    if (!IS_CHAT || !IS_TOP || childHasBtn || !document.body) return;
    if (document.querySelector('.cs-root,.cs-fab')) return;
    document.body.appendChild(makeBtn(true));
  }

  /* ================= Observer & lifecycle ================= */
  let scheduled = false;
  const pending = new Set();
  const touched = new Set();
  const chipBoxes = new Set();
  const OWN_CLS = ['cs-asset', 'cs-root', 'cs-toast', 'cs-fx', 'cs-imglayer', 'cs-wa-meta', 'cs-wa-tail', 'cs-bgl'];
  const OWN = n => n.id === 'cs-panel' || n.id === 'cs-dyn' || (n.classList && OWN_CLS.some(c => n.classList.contains(c)));
  function run() {
    scheduled = false;
    if (tiny() || !active()) { pending.clear(); touched.clear(); return; }
    const roots = pending.size > 80 ? [document] : [...pending];
    let metaHint = false;
    for (const r of pending) {
      const b = r.closest && r.closest('.cs-msg'); if (b) touched.add(b);
      // a read receipt (small avatar / "seen by" label) may have moved: worth re-checking the ticks
      if (!metaHint && !b && r.nodeType === 1 && (r.matches(MARK_SEL) || r.querySelector(MARK_SEL))) metaHint = true;
      if (!b && r.nodeType === 1 && r.closest) {
        const bx = r.closest(BOX); if (bx) chipBoxes.add(bx); // e.g. a new reaction chip
        if (bx || inAny(liveAreas(), r)) { for (const pop of (r.matches(POPUP) ? [r] : r.querySelectorAll(POPUP))) raisePopup(pop); if (isOpenPopup(r)) raisePopup(r); }
        else if (r.parentElement === document.body || r.parentElement === H || r.matches(POP)) floatCard(r); // Google's hover cards ("who reacted", profile cards) live outside the chat
      }
    }
    pending.clear();
    tagMessages(roots);
    if (chipBoxes.size) { if (bgOn()) chipScan([...chipBoxes]); chipBoxes.clear(); }
    if (touched.size) { scanInner([...touched]); touched.clear(); }
    injectButtons();
    if (bgOn() && needBg()) applyBg();
    if ([...fxs.keys()].some(a => !a.isConnected) || (R.fx !== 'none' && fxs.size < areas.size)) fxSync();
    if (dynStyle && !dynStyle.isConnected) setCSS(buildCSS());
    if (metaHint && metaWanted()) scheduleMeta();
  }
  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      const t = m.target;
      if (t.nodeType === 1 && (OWN(t) || (t.closest && t.closest('#cs-panel,.cs-wa-meta')))) continue;
      for (const n of m.addedNodes) {
        if (n.nodeType === 1) { if (!OWN(n)) pending.add(n); }
        else if (n.nodeType === 3 && t.nodeType === 1) pending.add(t); // text that arrives after its message element
      }
      if (m.removedNodes.length && t.closest) { const b = t.closest('.cs-msg'); if (b) touched.add(b); }
    }
    if ((pending.size || touched.size) && !scheduled) { scheduled = true; requestAnimationFrame(run); }
  });
  let observing = false;
  function startObs() { if (observing || !IS_CHAT || !document.body) return; observing = true; mo.observe(H, { childList: true, subtree: true }); }
  function stopObs() { if (!observing) return; observing = false; mo.disconnect(); pending.clear(); touched.clear(); }

  document.addEventListener('click', e => {
    if (!panel || !panel.classList.contains('cs-open')) return;
    const path = e.composedPath();
    if (path.includes(panel) || path.some(n => n.classList && n.classList.contains('cs-btn'))) return;
    closePanel();
  }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
  let wasTiny = tiny(), resizeT = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      if (panel && panel.classList.contains('cs-open') && anchor) openPanel();
      fxs.forEach(fxRect); drawLayers();
      const t = tiny();
      if (wasTiny && !t) applyAll();
      wasTiny = t;
      if (!t) { injectButtons(true); if (bgOn()) applyBg(); }
    }, 150);
  });

  try {
    csPlatform.storage.onChanged.addListener((ch, areaName) => {
      if (areaName && areaName !== 'local') return;
      let changed = false;
      const take = (k, f) => { if (!ch[k]) return; const v = ch[k].newValue; if (v && v._w === FID) return; f(v); changed = true; };
      take(KEY, v => { const { _w, ...nv } = v || {}; const ui = panel ? { tab: G.tab, cat: G.cat, bgCat: G.bgCat, fxSub: G.fxSub } : {}; G = { ...DEFAULTS, ...nv, custom: { ...DEFAULTS.custom, ...(nv.custom || {}) }, ...ui }; }); // an open panel stays where it is
      take(PKEY, v => { PROF = (v && v.p) || {}; });
      take(AKEY, v => { ACCTS = (v && v.a) || {}; });
      take(XKEY, v => { IMGIX = (v && v.x) || []; sources.clear(); });
      if (!changed) return;
      recompute();
      applyAll();
      if (panel) refreshPanel();
    });
  } catch {}

  async function boot() {
    const d = await sget([KEY, PKEY, AKEY, XKEY, 'cs5']);
    const { _w, ...prev } = d[KEY] || d.cs5 || {};
    const upgrade = !prev._v || prev._v < 15;
    G = { ...DEFAULTS, ...prev, custom: { ...DEFAULTS.custom, ...(prev.custom || {}) } };
    PROF = (d[PKEY] && d[PKEY].p) || {};
    ACCTS = (d[AKEY] && d[AKEY].a) || {};
    if (d[XKEY] && Array.isArray(d[XKEY].x)) IMGIX = d[XKEY].x;
    else if (store) { const tmp = { g: G, p: PROF }; IMGIX = await migrateImages(tmp); save('g', 'p'); }
    if (upgrade) { G.liveAnim = true; G._v = 15; save('g'); } // bubbles animate by default (only the ones on screen)
    startAccountBridge();
    registerAccount();
    recompute();
    applyAll();                     // the theme's CSS is in place before Chat draws its first message
    const ready = () => {
      registerAccount(); recompute();
      if (IS_TOP || (IS_CHAT && !tiny())) fetchAccounts();
      applyAll();
      injectButtons(true);
      let lastNight = isNight();
      let tick = 0;
      setInterval(() => idle(() => {
        if (document.hidden) return;
        tick++;
        if (IS_TOP || IS_CHAT) { const before = meKey(), had = pageAcct?.email; registerAccount(); if (meKey() !== before) { recompute(); applyAll(); } if (had !== pageAcct?.email && panel) refreshPanel(); }
        if (tiny()) return;
        if (IS_CHAT) {
          injectButtons();
          if (active()) {
            rescanVisible();                        // catches quote boxes Google paints after loading
            if (metaWanted()) updateMeta();
            if (tick % 3 === 0) tagMessages([document]);   // safety net only; the observer does the real work
            if (bgOn()) { if (needBg()) applyBg(); else if (tick % 3 === 0) panes.forEach((a, p) => { stripScan(p, a); probeStrips(p, a); }); }
            if (R.fx !== 'none' && fxs.size < liveAreas().length) fxSync();
            if (dynStyle && !dynStyle.isConnected) setCSS(buildCSS());
          }
        } else if (active()) { if (!H.classList.contains('cs-mail')) applyMail(); else if (tick % 2 === 0) mailScan(); }
        drawLayers();
        const n = isNight(); if (n !== lastNight) { lastNight = n; applyAll(true); if (panel) refreshPanel(); }
      }), 4000);
      setTimeout(ensureFab, 4000);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true }); else ready();
  }
  boot();
