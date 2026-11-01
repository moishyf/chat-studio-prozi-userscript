  /* ================= Background catalogue ================= */
  const fileBg = () => 'linear-gradient(transparent,transparent)';
  const baseOf = p => p.dark ? mix(p.b, 26, '#07080d') : mix(p.a, 7, '#fbfbfd');
  const hasFile = p => p.k !== 'custom';
  const PATTERNS = {
    grad: { he: 'מעבר צבע', en: 'Gradient', f: p => ({ img: p.dark ? `linear-gradient(160deg,${mix(p.b, 55, '#05060a')},${mix(p.a, 38, '#05060a')},${mix(p.b, 42, '#05060a')})` : `linear-gradient(160deg,${mix(p.a, 30, '#ffffff')},${mix(p.b, 22, '#ffffff')},${mix(p.c, 32, '#ffffff')})`, dark: p.dark, move: 1 }) },
    glow: { he: 'הילה', en: 'Glow', f: p => ({ css: `radial-gradient(circle at 15% 20%, ${rgba(p.a, .45)}, transparent 45%), radial-gradient(circle at 85% 75%, ${rgba(p.b, .4)}, transparent 50%), ${baseOf(p)}`, dark: p.dark }) },
    mesh: { he: 'רשת צבעים', en: 'Mesh', f: p => ({ css: `radial-gradient(at 20% 15%, ${rgba(p.a, .5)} 0, transparent 50%), radial-gradient(at 85% 10%, ${rgba(p.c, .45)} 0, transparent 50%), radial-gradient(at 50% 95%, ${rgba(p.b, .45)} 0, transparent 55%), ${baseOf(p)}`, dark: p.dark }) },
    doodle: { he: 'איורים', en: 'Doodles', f: p => ({ css: hasFile(p) ? `${fileBg('doodle-' + p.k, '190px')}, ${baseOf(p)}` : `radial-gradient(${rgba(p.a, .4)} 1.4px, transparent 1.7px) 0 0/20px 20px, ${baseOf(p)}`, dark: p.dark }) },
    waves: { he: 'גלים', en: 'Waves', f: p => ({ css: hasFile(p) ? `${fileBg('waves-' + p.k, '120px 40px')}, ${baseOf(p)}` : `repeating-linear-gradient(0deg, ${rgba(p.a, .12)} 0 2px, transparent 2px 18px), ${baseOf(p)}`, dark: p.dark }) },
    dots: { he: 'נקודות', en: 'Dots', f: p => ({ css: `radial-gradient(${rgba(p.a, .4)} 1.4px, transparent 1.7px) 0 0/20px 20px, ${baseOf(p)}`, dark: p.dark }) },
    confetti: { he: 'קונפטי', en: 'Confetti', f: p => ({ css: `radial-gradient(circle at 20% 30%, ${rgba(p.a, .55)} 2px, transparent 2.6px) 0 0/60px 60px, radial-gradient(circle at 70% 60%, ${rgba(p.b, .5)} 2px, transparent 2.6px) 0 0/60px 60px, radial-gradient(circle at 45% 85%, ${rgba(p.c, .7)} 1.6px, transparent 2.2px) 0 0/60px 60px, ${baseOf(p)}`, dark: p.dark }) },
    grid: { he: 'משבצות', en: 'Grid', f: p => ({ css: `linear-gradient(${rgba(p.a, .16)} 1px, transparent 1px) 0 0/26px 26px, linear-gradient(90deg, ${rgba(p.a, .16)} 1px, transparent 1px) 0 0/26px 26px, ${baseOf(p)}`, dark: p.dark }) },
    checker: { he: 'לוח שחמט', en: 'Checker', f: p => ({ css: `conic-gradient(${rgba(p.a, .1)} 25%, transparent 0 50%, ${rgba(p.a, .1)} 0 75%, transparent 0) 0 0/32px 32px, ${baseOf(p)}`, dark: p.dark }) },
    stripes: { he: 'פסים', en: 'Stripes', f: p => ({ css: `repeating-linear-gradient(45deg, ${rgba(p.a, .1)} 0 14px, transparent 14px 28px), ${baseOf(p)}`, dark: p.dark }) },
    diag: { he: 'רשת אלכסונית', en: 'Lattice', f: p => ({ css: `repeating-linear-gradient(45deg, ${rgba(p.a, .14)} 0 1px, transparent 1px 16px), repeating-linear-gradient(-45deg, ${rgba(p.a, .14)} 0 1px, transparent 1px 16px), ${baseOf(p)}`, dark: p.dark }) },
    zigzag: { he: 'זיגזג', en: 'Zigzag', f: p => { const c = rgba(p.a, .13); return { css: `linear-gradient(135deg, ${c} 25%, transparent 25%) -12px 0/24px 24px, linear-gradient(225deg, ${c} 25%, transparent 25%) -12px 0/24px 24px, linear-gradient(315deg, ${c} 25%, transparent 25%) 0 0/24px 24px, linear-gradient(45deg, ${c} 25%, transparent 25%) 0 0/24px 24px, ${baseOf(p)}`, dark: p.dark }; } },
    rings: { he: 'טבעות', en: 'Rings', f: p => ({ css: `repeating-radial-gradient(circle at 30% 30%, transparent 0 22px, ${rgba(p.a, .13)} 22px 23px), ${baseOf(p)}`, dark: p.dark }) },
    sky: { he: 'שמי לילה', en: 'Night sky', f: p => ({ css: [[12, 22], [28, 70], [45, 35], [63, 15], [77, 58], [88, 28], [20, 88], [55, 80], [93, 85], [35, 50]].map(([x, y], i) => `radial-gradient(${i % 3 ? 1 : 1.6}px ${i % 3 ? 1 : 1.6}px at ${x}% ${y}%, #ffffff, transparent)`).join(',') + `, linear-gradient(180deg, ${mix(p.b, 45, '#03040a')}, ${mix(p.a, 35, '#03040a')})`, dark: 1 }) }
  };
  const CBG = {
    whatsapp: { he: 'וואטסאפ', en: 'WhatsApp', css: `${fileBg('doodle-wa', '190px')}, #efeae2`, dark: 0 },
    whatsappd: { he: 'וואטסאפ לילה', en: 'WhatsApp dark', css: `${fileBg('doodle-wad', '190px')}, #0b141a`, dark: 1 },
    aurora: { he: 'זוהר', en: 'Aurora', img: 'linear-gradient(120deg,#a18cd1,#fbc2eb,#8fd3f4,#84fab0)', dark: 0, move: 1 },
    ocean: { he: 'אוקיינוס', en: 'Ocean', img: 'linear-gradient(160deg,#0f2027,#203a43,#2c5364)', dark: 1, move: 1 },
    sunset: { he: 'שקיעה', en: 'Sunset', img: 'linear-gradient(160deg,#ff9a9e,#fecfef,#ffd194)', dark: 0, move: 1 },
    gold: { he: 'זהב', en: 'Gold', css: 'radial-gradient(circle at 30% 20%,#3a2f1a,#0e0b06 70%)', dark: 1 },
    mesh: { he: 'פסטל', en: 'Pastel', css: 'radial-gradient(at 20% 20%,#c3f0ff 0,transparent 50%),radial-gradient(at 80% 10%,#e0c3ff 0,transparent 50%),radial-gradient(at 50% 90%,#c3ffd8 0,transparent 50%),#f6f7fb', dark: 0 },
    midnight: { he: 'חצות', en: 'Midnight', css: 'radial-gradient(1px 1px at 20% 30%,#fff,transparent),radial-gradient(1px 1px at 70% 60%,#fff,transparent),radial-gradient(1.5px 1.5px at 40% 80%,#cfd8ff,transparent),radial-gradient(1px 1px at 85% 20%,#fff,transparent),linear-gradient(180deg,#0b1026,#1b2550)', dark: 1 },
    paper: { he: 'נייר', en: 'Paper', css: 'repeating-linear-gradient(0deg,rgba(120,100,60,.05) 0 1px,transparent 1px 28px),#fbf7ee', dark: 0 },
    carbon: { he: 'קרבון', en: 'Carbon', css: 'linear-gradient(27deg,#151515 5px,transparent 5px) 0 5px/20px 20px,linear-gradient(207deg,#151515 5px,transparent 5px) 10px 0/20px 20px,linear-gradient(27deg,#222 5px,transparent 5px) 0 10px/20px 20px,linear-gradient(207deg,#222 5px,transparent 5px) 10px 5px/20px 20px,linear-gradient(90deg,#1b1b1b 10px,transparent 10px) 0 0/20px 20px,#131313', dark: 1 },
    rainbow: { he: 'קשת', en: 'Rainbow', img: 'linear-gradient(135deg,#ffd6e0,#ffefc2,#d4f7d4,#cfe8ff,#e6d6ff)', dark: 0, move: 1 },
    cosmic: { he: 'קוסמי', en: 'Cosmic', img: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', dark: 1, move: 1 },
    blueprint: { he: 'שרטוט', en: 'Blueprint', css: 'linear-gradient(rgba(255,255,255,.13) 1px,transparent 1px) 0 0/24px 24px,linear-gradient(90deg,rgba(255,255,255,.13) 1px,transparent 1px) 0 0/24px 24px,#1e4fa0', dark: 1 },
    chalk: { he: 'לוח גיר', en: 'Chalkboard', css: 'radial-gradient(circle at 30% 20%,rgba(255,255,255,.06),transparent 60%),#2b3a31', dark: 1 },
    linen: { he: 'פשתן', en: 'Linen', css: 'repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0 1px,transparent 1px 4px),repeating-linear-gradient(90deg,rgba(0,0,0,.025) 0 1px,transparent 1px 4px),#f5f0e6', dark: 0 },
    peach: { he: 'אפרסק', en: 'Peach', img: 'linear-gradient(135deg,#ffecd2,#fcb69f)', dark: 0, move: 1 }
  };
  const FR = `<rect x='2.5' y='4.5' width='19' height='15' rx='2' fill='none' stroke='#8d90b8' stroke-width='1.4'/>`;
  const PIC = (x, y, w, h) => `<rect x='${x}' y='${y}' width='${w}' height='${h}' rx='1' fill='url(#g)'/><path d='M${x + w * .15} ${y + h * .85}l${w * .3} ${-h * .4} ${w * .2} ${h * .2} ${w * .2} ${-h * .3}' fill='none' stroke='#fff' stroke-width='1.1' stroke-linejoin='round'/>`;
  const FITS = {
    contain: { he: 'מותאם', en: 'Fit', d: { he: 'כל התמונה מוצגת בלי חיתוך, והשוליים מתמלאים בגרסה מטושטשת שלה', en: 'The whole picture, no cropping; edges filled with a soft blurred copy' }, i: `${GRAD}${FR}${PIC(7, 5.5, 10, 13)}` },
    cover: { he: 'מלא', en: 'Fill', d: { he: 'התמונה ממלאת את כל השטח. שוליים עשויים להיחתך', en: 'Fills the whole area; edges may be cropped' }, i: `${GRAD}${FR}${PIC(3.5, 5.5, 17, 13)}` },
    stretch: { he: 'מתוח', en: 'Stretch', d: { he: 'ממלא את כל השטח בלי חיתוך, אבל התמונה עלולה להתעוות', en: 'Fills everything without cropping; may distort' }, i: `${GRAD}${FR}${PIC(3.5, 5.5, 17, 13)}<path d='M5 12h14M17 10l2 2-2 2M7 10l-2 2 2 2' stroke='#fff' stroke-width='1' fill='none'/>` },
    original: { he: 'רגיל', en: 'Original', d: { he: 'גודל מקורי במרכז, בלי הגדלה ובלי חיתוך', en: 'Original size, centred, never enlarged or cropped' }, i: `${GRAD}${FR}${PIC(9, 9, 6, 6)}` },
    tile: { he: 'פריסה', en: 'Tile', d: { he: 'התמונה חוזרת על עצמה כמו טפט', en: 'Repeats like wallpaper' }, i: `${GRAD}${FR}${PIC(4, 6, 7.5, 5.5)}${PIC(12.5, 6, 7.5, 5.5)}${PIC(4, 12.5, 7.5, 5.5)}${PIC(12.5, 12.5, 7.5, 5.5)}` }
  };
  const ALL_BGS = Object.keys(CBG).length + Object.keys(PATTERNS).length * PAL_LIST.length;

  CBG.whatsapp.css = `${fileBg('doodle-wa', '400px')}, #efeae2`;
  CBG.whatsappd.css = `${fileBg('doodle-wad', '400px')}, #0b141a`;

  function bgDef(id, st = R) {
    const [k, a, b] = (id || '').split(':');
    if (k === 'c' && CBG[a]) return {...CBG[a], ...(/^whatsappd?$/.test(a)?{asset:[a==='whatsappd'?'doodle-wad.svg':'doodle-wa.svg',400]}:{})};
    if (k === 'p' && PATTERNS[a] && getPal(b, st)) return {...PATTERNS[a].f(getPal(b, st)), ...(['doodle','waves'].includes(a)&&b!=='custom'?{asset:[a+'-'+b+'.svg',a==='waves'?120:190,a==='waves'?40:undefined]}:{})};
    if (k === 'img') {
      const e = imgEntry(a) || (/^\d+$/.test(a) ? IMGIX[+a] : null);
      if (e) { const dark = st.bgTone === 'dark'; return { css: dark ? '#0b0d14' : '#ffffff', dark, layer: e.id }; }
    }
    return CBG.whatsapp;
  }
  function bgName(id, st = S) {
    const [k, a, b] = (id || '').split(':');
    if (k === 'c' && CBG[a]) return N(CBG[a]);
    if (k === 'p' && getPal(b, st)) return N(getPal(b, st));
    return L().mine;
  }
  /* WhatsApp wallpaper follows the WhatsApp theme (day / night), also when night mode switches automatically */
  const effBg = st => (/^c:whatsappd?$/.test(st.bg) && isWAId(curTheme(st))) ? (curTheme(st) === 'k:wadark' ? 'c:whatsappd' : 'c:whatsapp') : st.bg;

