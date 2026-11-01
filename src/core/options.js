  /* ================= Shapes, fonts, animations, finishing options ================= */
  const SHAPES = {
    auto: { he: 'לפי העיצוב', en: 'Theme default', r: null }, classic: { he: 'קלאסי', en: 'Classic', r: '18px 18px 18px 6px' },
    round: { he: 'עגול', en: 'Round', r: '18px' }, pill: { he: 'גלולה', en: 'Pill', r: '26px' }, soft: { he: 'רך', en: 'Soft', r: '12px' },
    sharp: { he: 'חד', en: 'Sharp', r: '4px' }, square: { he: 'מרובע', en: 'Square', r: '0' }, leaf: { he: 'עלה', en: 'Leaf', r: '22px 4px 22px 4px' },
    cloud: { he: 'ענן', en: 'Cloud', r: '28px 28px 28px 10px' }, tag: { he: 'תגית', en: 'Tag', r: '6px 20px 20px 6px' }, ticket: { he: 'כרטיס', en: 'Ticket', r: '14px 4px 14px 4px' },
    chat: { he: 'צ\'אט', en: 'Chat', r: '18px 18px 4px 18px' }, wave: { he: 'גל', en: 'Wave', r: '24px 8px 24px 8px' }, blob: { he: 'בועה', en: 'Blob', r: '40px 40px 40px 12px / 30px 30px 30px 12px' },
    tab: { he: 'לשונית', en: 'Tab', r: '16px 16px 4px 4px' }
  };
  const FONTS = {
    auto: { he: 'לפי העיצוב', en: 'Theme default', f: null }, system: { he: 'רגיל', en: 'Standard', f: '"Google Sans",Roboto,Arial,sans-serif' },
    rounded: { he: 'מעוגל', en: 'Rounded', f: '"Varela Round",Nunito,Rubik,"Arial Rounded MT Bold",system-ui,sans-serif' },
    modern: { he: 'מודרני', en: 'Modern', f: '"Segoe UI",Rubik,Heebo,Assistant,system-ui,sans-serif' },
    serif: { he: 'קלאסי', en: 'Serif', f: 'Georgia,"Frank Ruhl Libre",David,"Times New Roman",serif' },
    hebrew: { he: 'ספרותי', en: 'Literary', f: 'Narkisim,"Frank Ruhl Libre",David,"Times New Roman",serif' },
    elegant: { he: 'אלגנטי', en: 'Elegant', f: '"Palatino Linotype","Book Antiqua",Palatino,"Frank Ruhl Libre",serif' },
    hand: { he: 'כתב יד', en: 'Handwriting', f: '"Segoe Print","Comic Sans MS","Gveret Levin",cursive' },
    display: { he: 'כותרת', en: 'Display', f: '"Arial Black",Impact,"Segoe UI Black",sans-serif' },
    mono: { he: 'מכונת כתיבה', en: 'Typewriter', f: 'Consolas,"Cascadia Code","Courier New",monospace' },
    narrow: { he: 'צר', en: 'Narrow', f: '"Arial Narrow","Roboto Condensed",Arial,sans-serif' }
  };
  const SIZES = { s: '13px', m: '14.5px', l: '16.5px', xl: '19px' };
  const SPACING = { s: { p: '5px 10px', m: '1px 0' }, m: { p: '8px 14px', m: '3px 0' }, l: { p: '12px 18px', m: '6px 0' } };
  const ENTERS = {
    none: { he: 'ללא', en: 'None' }, pop: { he: 'קפיצה', en: 'Pop' }, rise: { he: 'עלייה', en: 'Rise' }, fade: { he: 'דהייה', en: 'Fade' },
    slide: { he: 'החלקה', en: 'Slide' }, zoom: { he: 'זום', en: 'Zoom' }, flip: { he: 'היפוך', en: 'Flip' }, blur: { he: 'מיקוד', en: 'Focus' },
    bounce: { he: 'ניתור', en: 'Bounce' }, swing: { he: 'נדנוד', en: 'Swing' }, drop: { he: 'נפילה', en: 'Drop' }, spin: { he: 'סיבוב', en: 'Spin' },
    elastic: { he: 'גמישות', en: 'Elastic' }, glitch: { he: 'גליץ\'', en: 'Glitch' }, unfold: { he: 'פריסה', en: 'Unfold' }, float: { he: 'ריחוף', en: 'Float' },
    roll: { he: 'גלגול', en: 'Roll' }, stretch: { he: 'מתיחה', en: 'Stretch' }, fold: { he: 'קיפול', en: 'Fold' }, rubber: { he: 'גומי', en: 'Rubber' }, skew: { he: 'הטיה', en: 'Skew' }
  };
  const HOVERS = {
    none: { he: 'ללא', en: 'None', css: () => '' },
    lift: { he: 'הרמה', en: 'Lift', css: s => `${s}:hover{transform:translateY(-2px)}` },
    grow: { he: 'הגדלה', en: 'Grow', css: s => `${s}:hover{transform:scale(1.03)}` },
    glow: { he: 'זוהר', en: 'Glow', css: s => `${s}:hover{filter:brightness(1.08) drop-shadow(0 0 10px rgba(124,92,255,.5))}` },
    neon: { he: 'הילה', en: 'Halo', css: s => `${s}:hover{filter:drop-shadow(0 0 6px currentColor)}` },
    tilt: { he: 'הטיה', en: 'Tilt', css: s => `${s}:hover{transform:perspective(600px) rotateX(5deg) rotateY(-5deg)}` },
    shine: { he: 'ברק', en: 'Shine', css: s => `${s}.cs-pos::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.5) 50%,transparent 70%);background-size:250% 100%;background-position:160% 0;transition:background-position .8s}${s}.cs-pos:hover::after{background-position:-60% 0}` },
    wiggle: { he: 'רטט', en: 'Wiggle', css: s => `${s}:hover{animation:cs-wiggle .45s ease !important}` },
    pulse: { he: 'פעימה', en: 'Pulse', css: s => `${s}:hover{animation:cs-hpulse .9s ease-in-out infinite !important}` },
    float: { he: 'ציפה', en: 'Float', css: s => `${s}:hover{animation:cs-hfloat 1.2s ease-in-out infinite !important}` }
  };
  const SHADOWS = {
    theme: { he: 'לפי העיצוב', en: 'Theme', v: null }, none: { he: 'ללא', en: 'None', v: 'none' }, soft: { he: 'רך', en: 'Soft', v: '0 2px 8px rgba(0,0,0,.08)' },
    strong: { he: 'חזק', en: 'Strong', v: '0 10px 28px rgba(0,0,0,.28)' }, float: { he: 'מרחף', en: 'Floating', v: '0 18px 30px -12px rgba(0,0,0,.45)' },
    long: { he: 'ארוך', en: 'Long', v: '6px 6px 0 rgba(0,0,0,.18)' }, glow: { he: 'זוהר צבעוני', en: 'Color glow', v: '0 0 18px hsla(var(--cs-hue,255),90%,60%,.55)' },
    inner: { he: 'פנימי', en: 'Inner', v: 'inset 0 2px 8px rgba(0,0,0,.18)' }
  };
  const BORDERS = {
    theme: { he: 'לפי העיצוב', en: 'Theme', v: null }, none: { he: 'ללא', en: 'None', v: 'none' },
    thin: { he: 'דקה', en: 'Thin', v: '1px solid color-mix(in srgb, currentColor 30%, transparent)' },
    thick: { he: 'עבה', en: 'Thick', v: '3px solid color-mix(in srgb, currentColor 45%, transparent)' },
    dashed: { he: 'מקווקוות', en: 'Dashed', v: '2px dashed color-mix(in srgb, currentColor 45%, transparent)' },
    dotted: { he: 'מנוקדת', en: 'Dotted', v: '2px dotted color-mix(in srgb, currentColor 55%, transparent)' },
    double: { he: 'כפולה', en: 'Double', v: '4px double color-mix(in srgb, currentColor 45%, transparent)' },
    user: { he: 'צבע משתמש', en: 'User color', v: '2px solid hsl(var(--cs-hue,255) 75% 55%)' }
  };
  const TEXTFX = {
    none: { he: 'ללא', en: 'None', v: null }, shadow: { he: 'צל', en: 'Shadow', v: '0 1px 2px rgba(0,0,0,.35)' },
    glow: { he: 'זוהר', en: 'Glow', v: '0 0 8px currentColor' }, neon: { he: 'ניאון', en: 'Neon', v: '0 0 4px currentColor, 0 0 12px currentColor' },
    outline: { he: 'קו מתאר', en: 'Outline', v: '-1px -1px 0 rgba(0,0,0,.35),1px -1px 0 rgba(0,0,0,.35),-1px 1px 0 rgba(0,0,0,.35),1px 1px 0 rgba(0,0,0,.35)' },
    emboss: { he: 'בולט', en: 'Emboss', v: '0 1px 0 rgba(255,255,255,.6), 0 -1px 0 rgba(0,0,0,.25)' },
    retro: { he: 'רטרו', en: 'Retro', v: '2px 2px 0 rgba(0,0,0,.25)' }
  };
  const WEIGHTS = { auto: { he: 'רגיל', en: 'Auto', v: null }, light: { he: 'דק', en: 'Light', v: 300 }, medium: { he: 'בינוני', en: 'Medium', v: 500 }, bold: { he: 'מודגש', en: 'Bold', v: 700 } };
  const FXN = {
    none: { he: 'ללא', en: 'None' }, stars: { he: 'כוכבים', en: 'Stars' }, bubbles: { he: 'בועות', en: 'Bubbles' }, snow: { he: 'שלג', en: 'Snow' },
    sparkles: { he: 'נצנצים', en: 'Sparkles' }, fireflies: { he: 'גחליליות', en: 'Fireflies' }, rain: { he: 'גשם', en: 'Rain' }, leaves: { he: 'שלכת', en: 'Leaves' },
    petals: { he: 'עלי פריחה', en: 'Petals' }, confetti: { he: 'קונפטי', en: 'Confetti' }, bokeh: { he: 'אורות רכים', en: 'Bokeh' }, orbs: { he: 'כדורי אור', en: 'Light orbs' },
    meteors: { he: 'מטאורים', en: 'Meteors' }, fireworks: { he: 'זיקוקים', en: 'Fireworks' }, aurora: { he: 'זוהר צפוני', en: 'Aurora' },
    matrix: { he: 'מטריקס', en: 'Matrix' }, ripples: { he: 'אדוות', en: 'Ripples' }
  };

