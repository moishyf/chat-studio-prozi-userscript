  /* ================= Theme catalogue ================= */
  // [key, he, en, a, b, c, dark]
  const PAL_LIST = [
    ['ocean', 'אוקיינוס', 'Ocean', '#0ea5e9', '#2563eb', '#22d3ee', 0], ['sunset', 'שקיעה', 'Sunset', '#f97316', '#db2777', '#fbbf24', 0],
    ['forest', 'יער', 'Forest', '#16a34a', '#065f46', '#a3e635', 0], ['lavender', 'לבנדר', 'Lavender', '#a78bfa', '#7c3aed', '#f0abfc', 0],
    ['gold', 'זהב', 'Gold', '#d4af37', '#8a6d1d', '#fde68a', 1], ['mint', 'מנטה', 'Mint', '#34d399', '#0d9488', '#a7f3d0', 0],
    ['sky', 'שמיים', 'Sky', '#60a5fa', '#38bdf8', '#e0f2fe', 0], ['coral', 'אלמוג', 'Coral', '#fb7185', '#f97316', '#fecdd3', 0],
    ['midnight', 'חצות', 'Midnight', '#3b5bdb', '#0f172a', '#818cf8', 1], ['ember', 'גחלים', 'Ember', '#ef4444', '#7f1d1d', '#fb923c', 1],
    ['ice', 'קרח', 'Ice', '#67e8f9', '#38bdf8', '#ecfeff', 0], ['citrus', 'הדר', 'Citrus', '#facc15', '#84cc16', '#fef08a', 0],
    ['grape', 'ענבים', 'Grape', '#9333ea', '#581c87', '#d8b4fe', 1], ['teal', 'טורקיז', 'Teal', '#14b8a6', '#0e7490', '#5eead4', 0],
    ['slate', 'צפחה', 'Slate', '#64748b', '#1e293b', '#94a3b8', 1], ['sand', 'חול', 'Sand', '#d6b98c', '#a8875a', '#f5e6c8', 0],
    ['cherry', 'דובדבן', 'Cherry', '#be123c', '#881337', '#fda4af', 1], ['emerald', 'אזמרגד', 'Emerald', '#10b981', '#047857', '#6ee7b7', 1],
    ['sapphire', 'ספיר', 'Sapphire', '#3b82f6', '#1e40af', '#93c5fd', 1], ['ruby', 'אודם', 'Ruby', '#e11d48', '#9f1239', '#fb7185', 1],
    ['amber', 'ענבר', 'Amber', '#f59e0b', '#b45309', '#fcd34d', 0], ['aqua', 'מים', 'Aqua', '#06b6d4', '#0891b2', '#a5f3fc', 0],
    ['indigo', 'אינדיגו', 'Indigo', '#6366f1', '#3730a3', '#a5b4fc', 1], ['peach', 'אפרסק', 'Peach', '#fdba74', '#fb923c', '#ffedd5', 0],
    ['olive', 'זית', 'Olive', '#84a33a', '#4d5e1f', '#d9f99d', 0], ['plum', 'שזיף', 'Plum', '#a21caf', '#701a75', '#f5d0fe', 1],
    ['steel', 'פלדה', 'Steel', '#94a3b8', '#64748b', '#e2e8f0', 0], ['cyber', 'סייבר', 'Cyber', '#00f0ff', '#ff00e6', '#00f0ff', 1],
    ['lime', 'ליים', 'Lime', '#a3e635', '#4d7c0f', '#ecfccb', 0], ['copper', 'נחושת', 'Copper', '#c2703d', '#7c3f1d', '#f3c09a', 1],
    ['quartz', 'קוורץ', 'Quartz', '#f9a8d4', '#c4b5fd', '#fdf2f8', 0], ['volcano', 'הר געש', 'Volcano', '#dc2626', '#f59e0b', '#fde047', 1],
    ['arctic', 'ארקטי', 'Arctic', '#7dd3fc', '#e0f2fe', '#0369a1', 0], ['jungle', 'ג\'ונגל', 'Jungle', '#15803d', '#ca8a04', '#bbf7d0', 1],
    ['galaxy', 'גלקסיה', 'Galaxy', '#7c3aed', '#0ea5e9', '#f0abfc', 1], ['pearl', 'פנינה', 'Pearl', '#e2e8f0', '#cbd5e1', '#94a3b8', 0],
    ['blush', 'סומק', 'Blush', '#f472b6', '#fb7185', '#fce7f3', 0], ['denim', 'ג\'ינס', 'Denim', '#3b5998', '#1e3a5f', '#8bb4e7', 1],
    ['mocha', 'מוקה', 'Mocha', '#8b5e3c', '#4a2f1d', '#d9b99b', 1], ['tropical', 'טרופי', 'Tropical', '#06d6a0', '#ffd166', '#ef476f', 0],
    ['berry', 'פירות יער', 'Berry', '#7b2cbf', '#c9184a', '#ffb3c1', 1], ['blossom', 'פריחה', 'Blossom', '#ffafcc', '#cdb4db', '#fff0f6', 0],
    ['desert', 'מדבר', 'Desert', '#e09f3e', '#9e2a2b', '#fff3b0', 0], ['glacier', 'קרחון', 'Glacier', '#a8dadc', '#457b9d', '#f1faee', 0],
    ['flamingo', 'פלמינגו', 'Flamingo', '#ff6f91', '#ff9671', '#ffc75f', 0], ['charcoal', 'פחם', 'Charcoal', '#4b5563', '#111827', '#d1d5db', 1],
    ['rainforest', 'יער גשם', 'Rainforest', '#2d6a4f', '#1b4332', '#95d5b2', 1], ['honey', 'דבש', 'Honey', '#f4a261', '#e9c46a', '#fff1d0', 0]
  ];
  const PAL = {};
  for (const [k, he, en, a, b, c, dark] of PAL_LIST) PAL[k] = { k, he, en, a, b, c, dark: !!dark };
  const getPal = (k, st = R) => k === 'custom' ? { k: 'custom', he: TXT.he.mine3, en: TXT.en.mine3, ...st.custom, dark: (lum(st.custom.a) + lum(st.custom.b)) / 2 < .12 } : PAL[k];

  const STYLES = {
    soft: { he: 'רך', en: 'Soft', f: p => ({ bg: p.dark ? mix(p.a, 24, '#12141c') : mix(p.a, 14, '#ffffff'), fg: p.dark ? '#eef0f6' : '#1f2430', border: `1px solid ${rgba(p.a, .3)}`, shadow: `0 2px 10px ${rgba(p.a, .16)}` }) },
    solid: { he: 'מלא', en: 'Solid', f: p => ({ bg: p.a, fg: onC(p.a), border: 'none', shadow: `0 3px 10px ${rgba(p.b, .3)}` }) },
    gradient: { he: 'מעבר צבע', en: 'Gradient', f: p => ({ bg: `linear-gradient(135deg,${p.a},${p.b})`, fg: onC(p.a, p.b), border: 'none', shadow: `0 6px 18px ${rgba(p.a, .35)}` }) },
    glass: { he: 'זכוכית', en: 'Glass', f: p => ({ bg: `linear-gradient(135deg,${rgba(p.a, .3)},${rgba(p.b, .18)})`, fg: p.dark ? '#f4f5fb' : '#14161c', border: '1px solid rgba(255,255,255,.5)', shadow: `0 8px 24px ${rgba(p.b, .18)}, inset 0 1px 0 rgba(255,255,255,.5)`, blur: 'blur(14px) saturate(1.6)' }) },
    neon: { he: 'ניאון', en: 'Neon', dark: 1, f: p => ({ bg: '#07070d', fg: mix(p.c, 70, '#ffffff'), border: `1px solid ${p.a}`, shadow: `0 0 12px ${rgba(p.a, .65)}, inset 0 0 8px ${rgba(p.a, .3)}`, ts: `0 0 6px ${rgba(p.a, .8)}`, amb: 'cs-flick 5s infinite' }) },
    outline: { he: 'קו מתאר', en: 'Outline', f: p => ({ bg: p.dark ? 'rgba(10,12,18,.4)' : 'rgba(255,255,255,.65)', fg: p.dark ? mix(p.c, 80, '#ffffff') : mix(p.b, 85, '#000000'), border: `2px solid ${p.a}`, shadow: 'none' }) },
    '3d': { he: 'תלת-ממד', en: '3D', light: 1, f: p => ({ bg: `linear-gradient(145deg,${mix(p.a, 6, '#ffffff')},${mix(p.a, 18, '#e9ebf1')})`, fg: '#22262f', border: 'none', shadow: `5px 5px 12px ${rgba(p.b, .28)}, -5px -5px 12px rgba(255,255,255,.85)` }) },
    glow: { he: 'קורן', en: 'Glow', f: p => ({ bg: `linear-gradient(135deg,${p.a},${p.b})`, fg: onC(p.a, p.b), border: `1px solid ${rgba(p.c, .6)}`, shadow: `0 0 0 1px ${rgba(p.a, .25)}, 0 10px 30px ${rgba(p.a, .6)}` }) },
    metal: { he: 'מתכתי', en: 'Metallic', f: p => ({ bg: `linear-gradient(145deg,${p.b},${p.a} 45%,${mix(p.c, 70, p.a)} 55%,${p.b})`, fg: onC(p.a, p.b), border: `1px solid ${rgba(p.c, .7)}`, shadow: '0 6px 18px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.35)', sheen: 1 }) },
    aurora: { he: 'זוהר צפוני', en: 'Aurora', f: p => ({ bg: `linear-gradient(45deg,${p.a},${p.c},${p.b},${p.a})`, bgsize: '300% 300%', amb: 'cs-flow 8s ease infinite', fg: onC(p.a, p.b, p.c), border: 'none', shadow: `0 6px 18px ${rgba(p.a, .35)}` }) },
    paper: { he: 'נייר', en: 'Paper', light: 1, f: p => ({ bg: mix(p.a, 7, '#fffdf7'), fg: '#2a2620', border: `1px solid ${rgba(p.b, .18)}`, shadow: `0 1px 1px rgba(0,0,0,.06), 0 6px 0 -3px ${rgba(p.a, .45)}` }) },
    retro: { he: 'רטרו', en: 'Retro', light: 1, f: p => ({ bg: mix(p.c, 55, '#ffffff'), fg: '#111111', border: '2px solid #111111', shadow: `4px 4px 0 ${p.a}`, font: '"Courier New",Consolas,monospace' }) },
    holo: { he: 'הולוגרמה', en: 'Holographic', light: 1, f: p => ({ bg: `linear-gradient(115deg,${p.a},${p.c},#ffffff,${p.b},${p.a})`, bgsize: '400% 400%', amb: 'cs-flow 6s linear infinite', fg: '#16181d', border: '1px solid rgba(255,255,255,.7)', shadow: `0 6px 20px ${rgba(p.a, .35)}`, sheen: 1 }) },
    frost: { he: 'כפור לילי', en: 'Night frost', dark: 1, f: p => ({ bg: 'rgba(14,16,26,.8)', fg: '#eef0fb', border: `1px solid ${rgba(p.a, .55)}`, shadow: `0 8px 24px rgba(0,0,0,.4), inset 0 0 0 1px ${rgba(p.c, .08)}`, blur: 'blur(10px)' }) },
    duo: { he: 'מסגרת צבעונית', en: 'Gradient frame', f: p => { const b = p.dark ? '#11131b' : '#ffffff'; return { bg: `linear-gradient(${b},${b}), linear-gradient(135deg,${p.a},${p.b},${p.c})`, clip: 'padding-box, border-box', fg: p.dark ? '#eef0f6' : '#1f2430', border: '2px solid transparent', shadow: `0 4px 14px ${rgba(p.a, .22)}` }; } },
    pulse: { he: 'פועם', en: 'Pulse', f: p => ({ bg: `linear-gradient(135deg,${p.a},${p.b})`, fg: onC(p.a, p.b), border: 'none', pc: rgba(p.a, .55), amb: 'cs-pulse 2.6s ease-out infinite' }) },
    candy: { he: 'ממתק', en: 'Candy', f: p => ({ bg: `repeating-linear-gradient(45deg,${p.a} 0 10px,${mix(p.a, 72, '#ffffff')} 10px 20px)`, fg: '#ffffff', ts: '0 1px 2px rgba(0,0,0,.45)', border: '2px solid #ffffff', shadow: `0 4px 12px ${rgba(p.a, .35)}` }) },
    comic: { he: 'קומיקס', en: 'Comic', light: 1, f: p => ({ bg: `radial-gradient(${rgba(p.b, .22)} 1px, transparent 1.4px), linear-gradient(${mix(p.c, 45, '#ffffff')},${mix(p.c, 45, '#ffffff')})`, bgsize: '6px 6px, auto', fg: '#111111', border: '3px solid #111111', shadow: '3px 3px 0 #111111', font: '"Comic Sans MS","Segoe Print",cursive' }) },
    emboss: { he: 'חריטה', en: 'Emboss', light: 1, f: p => ({ bg: mix(p.a, 12, '#f2f3f7'), fg: '#2a2e38', border: 'none', shadow: `inset 2px 2px 5px ${rgba(p.b, .25)}, inset -2px -2px 5px rgba(255,255,255,.9)` }) },
    crystal: { he: 'קריסטל', en: 'Crystal', light: 1, f: p => ({ bg: `linear-gradient(135deg,rgba(255,255,255,.6),${rgba(p.a, .28)})`, fg: '#14161c', border: `1px solid ${rgba(p.c, .85)}`, shadow: `0 8px 26px ${rgba(p.a, .3)}, inset 0 0 18px rgba(255,255,255,.4)`, blur: 'blur(10px) saturate(1.5)', sheen: 1 }) },
    velvet: { he: 'קטיפה', en: 'Velvet', dark: 1, f: p => ({ bg: `radial-gradient(circle at 30% 20%,${p.a},${mix(p.b, 70, '#000000')} 75%)`, fg: '#ffffff', ts: '0 1px 2px rgba(0,0,0,.35)', border: 'none', shadow: `0 10px 24px ${rgba(p.b, .5)}` }) },
    pastel: { he: 'פסטל', en: 'Pastel', light: 1, f: p => ({ bg: `linear-gradient(135deg,${mix(p.a, 22, '#ffffff')},${mix(p.c, 30, '#ffffff')})`, fg: '#2b2f3a', border: `1px solid ${rgba(p.a, .18)}`, shadow: `0 4px 14px ${rgba(p.a, .14)}` }) },
    card: { he: 'כרטיס', en: 'Card', light: 1, f: p => ({ bg: '#ffffff', fg: '#1f2430', border: `1px solid ${rgba(p.a, .2)}`, shadow: `0 2px 4px rgba(0,0,0,.06), 7px 7px 0 -2px ${rgba(p.a, .55)}` }) },
    accent: { he: 'פס הדגשה', en: 'Accent bar', f: p => ({ bg: p.dark ? '#161924' : '#ffffff', fg: p.dark ? '#eef0f6' : '#1f2430', border: 'none', shadow: `inset 5px 0 0 ${p.a}, 0 3px 12px rgba(0,0,0,.08)` }) }
  };

  const CLASSIC = {
    modern: { he: 'מודרני', en: 'Modern', card: '#eef0ff', v: { bg: 'linear-gradient(135deg,hsl(var(--cs-hue,255) 85% 62%),hsl(calc(var(--cs-hue,255) + 45) 80% 52%))', fg: '#ffffff', border: 'none', shadow: '0 8px 22px hsla(var(--cs-hue,255),70%,50%,.35)', radius: '20px 20px 20px 6px' } },
    day: { he: 'יום', en: 'Day', card: 'linear-gradient(135deg,#f8fafc,#e0e7ff)', v: { bg: '#ffffff', fg: '#1f2937', border: '1px solid rgba(0,0,0,.05)', shadow: '0 1px 2px rgba(0,0,0,.08),0 4px 14px rgba(0,0,0,.07)' } },
    night: { he: 'לילה', en: 'Night', dark: 1, card: '#0f1320', v: { bg: '#1e2230', fg: '#e7e9f3', border: '1px solid rgba(255,255,255,.06)', shadow: '0 4px 16px rgba(0,0,0,.35)' } },
    lux: { he: 'יוקרתי', en: 'Luxury', dark: 1, card: 'radial-gradient(circle at 30% 20%,#3a2f1a,#0e0b06)', v: { bg: 'linear-gradient(145deg,#1a1611,#2a2318)', fg: '#f3e3bd', border: '1px solid rgba(212,175,55,.6)', shadow: '0 8px 22px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,235,180,.18)', font: 'Georgia,"Frank Ruhl Libre",David,serif', sheen: 1 } },
    royal: { he: 'מלכותי', en: 'Royal', dark: 1, card: '#0f0c2e', v: { bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', fg: '#fde68a', border: '1px solid #d4af37', shadow: '0 8px 22px rgba(30,27,75,.45)', font: 'Georgia,serif', sheen: 1 } },
    glass: { he: 'זכוכית', en: 'Glass', card: 'linear-gradient(135deg,#a18cd1,#8fd3f4)', v: { bg: 'rgba(255,255,255,.3)', fg: '#111111', border: '1px solid rgba(255,255,255,.6)', shadow: '0 8px 24px rgba(0,0,0,.12)', blur: 'blur(14px) saturate(1.6)' } },
    wa: { he: 'וואטסאפ', en: 'WhatsApp', card: '#efeae2', v: { bg: '#ffffff', fg: '#111b21', border: 'none', shadow: '0 1px .5px rgba(11,20,26,.13)', radius: '7.5px', me: '#d9fdd3', font: 'system-ui,"Segoe UI",Helvetica,Arial,sans-serif' } },
    wadark: { he: 'וואטסאפ לילה', en: 'WhatsApp dark', dark: 1, card: '#0b141a', v: { bg: '#202c33', fg: '#e9edef', border: 'none', shadow: '0 1px .5px rgba(11,20,26,.13)', radius: '7.5px', me: '#005c4b', font: 'system-ui,"Segoe UI",Helvetica,Arial,sans-serif' } },
    neon: { he: 'ניאון', en: 'Neon', dark: 1, card: '#05050a', v: { bg: '#07070d', fg: 'hsl(var(--cs-hue,180) 100% 72%)', border: '1px solid hsl(var(--cs-hue,180) 100% 60%)', shadow: '0 0 12px hsla(var(--cs-hue,180),100%,60%,.6), inset 0 0 8px hsla(var(--cs-hue,180),100%,60%,.25)', ts: '0 0 6px hsla(var(--cs-hue,180),100%,60%,.7)', amb: 'cs-flick 5s infinite' } },
    '3d': { he: 'תלת-ממד', en: '3D', card: '#e6e8ef', v: { bg: 'linear-gradient(145deg,#ffffff,#e4e6ee)', fg: '#2c3e50', border: 'none', shadow: '6px 6px 14px #c5c8d2, -6px -6px 14px #ffffff' } },
    fire: { he: 'אש וקרח', en: 'Fire & Ice', dark: 1, card: '#1d1d24', v: { bg: 'linear-gradient(45deg,#ff4e50,#f9d423,#3498db,#2c3e50)', bgsize: '300% 300%', amb: 'cs-flow 7s ease infinite', fg: '#ffffff', ts: '0 1px 2px rgba(0,0,0,.5)', border: 'none', shadow: '0 6px 16px rgba(0,0,0,.2)' } },
    rainbow: { he: 'קשת', en: 'Rainbow', card: '#f5f5fa', v: { bg: 'linear-gradient(90deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff,#9b5de5,#ff6b6b)', bgsize: '400% 100%', amb: 'cs-flow 10s linear infinite', fg: '#ffffff', ts: '0 1px 2px rgba(0,0,0,.4)', border: 'none', shadow: '0 6px 16px rgba(0,0,0,.15)' } },
    sunrise: { he: 'זריחה', en: 'Sunrise', card: '#fff7ef', v: { bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', fg: '#4a2c1a', border: 'none', shadow: '0 6px 16px rgba(252,182,159,.45)' } },
    candy: { he: 'סוכריה', en: 'Candy', card: '#fff0f6', v: { bg: 'repeating-linear-gradient(45deg,#ffb3c6 0 10px,#ffc8dd 10px 20px)', fg: '#5a1030', border: '2px solid #ffffff', shadow: '0 4px 12px rgba(255,105,180,.35)' } },
    ink: { he: 'דיו', en: 'Ink', card: '#f4f4f4', v: { bg: '#111111', fg: '#fafafa', border: 'none', shadow: '0 4px 12px rgba(0,0,0,.25)', font: 'Georgia,serif' } },
    matrix: { he: 'מטריקס', en: 'Matrix', dark: 1, card: '#000000', v: { bg: '#020a02', fg: '#3dff6e', border: '1px solid #1a7a2e', shadow: '0 0 10px rgba(61,255,110,.35)', ts: '0 0 5px rgba(61,255,110,.8)', font: 'Consolas,"Courier New",monospace' } },
    terminal: { he: 'מסוף', en: 'Terminal', dark: 1, card: '#1b1b1b', v: { bg: '#282c34', fg: '#e5c07b', border: '1px solid #3e4451', shadow: '0 4px 14px rgba(0,0,0,.35)', font: 'Consolas,"Courier New",monospace', radius: '6px' } },
    bubblegum: { he: 'מסטיק', en: 'Bubblegum', card: '#fdf4ff', v: { bg: 'linear-gradient(135deg,#f9a8d4,#c4b5fd)', fg: '#3b0a45', border: 'none', shadow: '0 6px 18px rgba(196,181,253,.5)', radius: '24px' } },
    sepia: { he: 'ספיה', en: 'Sepia', card: '#f3e9d7', v: { bg: '#efe2c8', fg: '#4a3720', border: '1px solid #d8c29a', shadow: '0 3px 10px rgba(120,90,40,.18)', font: 'Georgia,serif' } },
    mono: { he: 'שחור לבן', en: 'Mono', card: '#ffffff', v: { bg: '#ffffff', fg: '#000000', border: '2px solid #000000', shadow: '4px 4px 0 #000000', radius: '4px' } },
    vapor: { he: 'ויפור', en: 'Vapor', dark: 1, card: '#1a0b2e', v: { bg: 'linear-gradient(135deg,#ff71ce,#01cdfe 60%,#b967ff)', bgsize: '300% 300%', amb: 'cs-flow 9s ease infinite', fg: '#ffffff', ts: '0 0 6px rgba(255,113,206,.8)', border: 'none', shadow: '0 0 18px rgba(185,103,255,.55)' } },
    chalk: { he: 'לוח גיר', en: 'Chalkboard', dark: 1, card: '#26332b', v: { bg: '#2f3b33', fg: '#f4f4ec', border: '2px dashed rgba(255,255,255,.35)', shadow: '0 4px 12px rgba(0,0,0,.3)', font: '"Segoe Print","Comic Sans MS",cursive', ts: '0 0 1px rgba(255,255,255,.6)' } },
    blueprint: { he: 'שרטוט', en: 'Blueprint', dark: 1, card: '#123a7a', v: { bg: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(#1e4fa0,#1e4fa0)', bgsize: '12px 12px, 12px 12px, auto', fg: '#ffffff', border: '1px solid rgba(255,255,255,.5)', shadow: '0 4px 14px rgba(10,30,80,.4)', font: 'Consolas,"Courier New",monospace', radius: '4px' } },
    goldleaf: { he: 'עלה זהב', en: 'Gold leaf', card: '#fffaf0', v: { bg: 'linear-gradient(135deg,#fff8e1,#f6e3a8 50%,#fff3cf)', fg: '#5b4513', border: '1px solid #d4af37', shadow: '0 6px 18px rgba(212,175,55,.35)', font: 'Georgia,serif', sheen: 1 } }
  };

  const FEATURED = ['none', 'k:modern', 'k:day', 'k:night', 'k:wa', 'k:wadark', 'k:lux', 'k:royal', 'k:goldleaf', 'k:glass', 'k:vapor', 's:aurora:galaxy', 's:glass:ocean',
    's:neon:cyber', 's:holo:pearl', 's:glow:sunset', 's:crystal:lavender', 's:metal:gold', 's:velvet:berry', 's:frost:sapphire', 's:3d:sky', 's:card:tropical',
    's:retro:citrus', 's:pulse:ruby', 's:pastel:blossom', 's:accent:teal', 's:comic:honey', 's:candy:flamingo', 'k:rainbow', 'k:chalk', 'k:blueprint', 'k:matrix'];

  const ALL_THEMES = ['none', ...Object.keys(CLASSIC).map(k => 'k:' + k)];
  for (const st in STYLES) for (const p of PAL_LIST) ALL_THEMES.push(`s:${st}:${p[0]}`);

  /* WhatsApp: the regular WhatsApp themes carry the full look (bubbles, wallpaper, time and ticks) */
  const WA_FONT = '"Segoe UI","Helvetica Neue",Helvetica,"Lucida Grande",Arial,Ubuntu,Cantarell,"Fira Sans",sans-serif';
  Object.assign(CLASSIC.wa.v, { bg: '#ffffff', fg: '#111b21', border: 'none', shadow: '0 1px .5px rgba(11,20,26,.13)', radius: '7.5px', me: '#d9fdd3', font: WA_FONT, size: '14.2px', lh: '19px', pad: '6px 7px 8px 9px' });
  Object.assign(CLASSIC.wadark.v, { bg: '#202c33', fg: '#e9edef', border: 'none', shadow: '0 1px .5px rgba(11,20,26,.13)', radius: '7.5px', me: '#005c4b', font: WA_FONT, size: '14.2px', lh: '19px', pad: '6px 7px 8px 9px' });
  const isWAId = id => id === 'k:wa' || id === 'k:wadark';
  /* picking a WhatsApp theme switches on everything that makes it look like WhatsApp */
  const WA_PRESET = { scope: 'all', shape: 'auto', font: 'auto', size: 'm', weight: 'auto', uniq: 'none', shadow: 'theme', border: 'theme', textFx: 'none', enter: 'rise', hover: 'none', fx: 'none' };

  function themeDef(id, st = R) {
    if (!id || id === 'none') return null;
    const [k, a, b] = id.split(':');
    if (k === 'k' && CLASSIC[a]) return { v: CLASSIC[a].v, dark: !!CLASSIC[a].dark, card: CLASSIC[a].card, pal: null };
    const p = k === 's' && STYLES[a] && getPal(b, st);
    if (p) {
      const dark = !!STYLES[a].dark || (p.dark && !STYLES[a].light);
      return { v: STYLES[a].f(p), dark, card: dark ? `radial-gradient(circle at 30% 20%, ${mix(p.b, 30, '#151827')}, #0b0c14)` : `linear-gradient(135deg, ${mix(p.a, 10, '#ffffff')}, ${mix(p.c, 16, '#f4f5fa')})`, pal: p };
    }
    return null;
  }
  function themeName(id, short, st = S) {
    if (!id || id === 'none') return L().none;
    const [k, a, b] = id.split(':');
    if (k === 'k' && CLASSIC[a]) return N(CLASSIC[a]);
    const p = k === 's' && STYLES[a] && getPal(b, st);
    if (p) return short ? N(p) : `${N(p)} · ${N(STYLES[a])}`;
    return id;
  }

