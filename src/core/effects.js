  /* ================= Ambient effects engine (canvas) ================= */
  const fxColors = () => { const d = themeDef(curTheme()); return d && d.pal ? [d.pal.a, d.pal.b, d.pal.c] : ['#7c5cff', '#00c9c8', '#ff6b9d', '#ffd166']; };
  function star4(c, x, y, s) { c.beginPath(); c.moveTo(x, y - s); c.quadraticCurveTo(x, y, x + s, y); c.quadraticCurveTo(x, y, x, y + s); c.quadraticCurveTo(x, y, x - s, y); c.quadraticCurveTo(x, y, x, y - s); c.fill(); }
  const fall = (n, mk) => ({ n, spawn: (f, i) => Object.assign({ x: rnd(0, f.w), y: i ? rnd(0, f.h) : -15 }, mk(f)) });
  const FXDEF = {
    stars: { n: 45, spawn: f => ({ x: rnd(0, f.w), y: rnd(0, f.h), r: rnd(.8, 2), ph: rnd(0, 6.3), sp: rnd(1, 3), c: Math.random() < .35 ? pick(f.colors) : '#ffffff' }),
      step: () => true, draw: (c, p, f) => { c.globalAlpha = .25 + .75 * Math.abs(Math.sin(f.t * p.sp + p.ph)); c.fillStyle = p.c; star4(c, p.x, p.y, p.r * 2.4); } },
    bubbles: { n: 22, spawn: (f, i) => ({ x: rnd(0, f.w), y: i ? rnd(0, f.h) : f.h + 20, r: rnd(4, 14), vy: rnd(18, 45), ph: rnd(0, 6.3), c: pick(f.colors) }),
      step: (p, dt, f) => { p.y -= p.vy * dt; p.x += Math.sin(f.t * 1.5 + p.ph) * .4; return p.y > -30; },
      draw: (c, p) => { c.globalAlpha = .6; c.strokeStyle = p.c; c.lineWidth = 1.3; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.stroke(); c.globalAlpha = .45; c.fillStyle = '#fff'; c.beginPath(); c.arc(p.x - p.r * .35, p.y - p.r * .35, p.r * .25, 0, 7); c.fill(); } },
    snow: { ...fall(60, () => ({ r: rnd(1.2, 3.4), vy: rnd(18, 50), ph: rnd(0, 6.3) })),
      step: (p, dt, f) => { p.y += p.vy * dt; p.x += Math.sin(f.t + p.ph) * .35; return p.y < f.h + 10; },
      draw: (c, p) => { c.globalAlpha = .9; c.fillStyle = '#ffffff'; c.strokeStyle = 'rgba(120,140,175,.45)'; c.lineWidth = .8; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fill(); c.stroke(); } },
    sparkles: { n: 26, spawn: f => ({ x: rnd(0, f.w), y: rnd(0, f.h), life: rnd(-1.5, 0), max: rnd(.8, 1.8), s: rnd(3, 8), c: pick(f.colors.concat(['#ffd166', '#ffffff'])) }),
      step: (p, dt) => (p.life += dt) < p.max,
      draw: (c, p) => { if (p.life < 0) return; const k = Math.sin(Math.PI * p.life / p.max); c.globalAlpha = k; c.fillStyle = p.c; star4(c, p.x, p.y, p.s * k); } },
    fireflies: { n: 20, spawn: f => ({ x: rnd(0, f.w), y: rnd(0, f.h), vx: rnd(-15, 15), vy: rnd(-15, 15), ph: rnd(0, 6.3) }),
      step: (p, dt, f) => { p.vx += rnd(-40, 40) * dt; p.vy += rnd(-40, 40) * dt; p.vx = Math.max(-25, Math.min(25, p.vx)); p.vy = Math.max(-25, Math.min(25, p.vy)); p.x = (p.x + p.vx * dt + f.w) % f.w; p.y = (p.y + p.vy * dt + f.h) % f.h; return true; },
      draw: (c, p, f) => { const a = .3 + .7 * Math.abs(Math.sin(f.t * 1.4 + p.ph)); const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9); g.addColorStop(0, `rgba(228,255,122,${a})`); g.addColorStop(1, 'rgba(228,255,122,0)'); c.globalAlpha = 1; c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, 9, 0, 7); c.fill(); } },
    rain: { n: 70, spawn: (f, i) => ({ x: rnd(0, f.w * 1.2), y: i ? rnd(0, f.h) : -20, l: rnd(10, 22), vy: rnd(450, 750) }),
      step: (p, dt, f) => { p.y += p.vy * dt; p.x -= p.vy * dt * .12; return p.y < f.h + 20; },
      draw: (c, p) => { c.globalAlpha = .45; c.strokeStyle = '#7fa8dc'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + p.l * .12, p.y - p.l); c.stroke(); } },
    leaves: { ...fall(18, () => ({ vy: rnd(25, 60), rot: rnd(0, 6.3), vr: rnd(-2, 2), ph: rnd(0, 6.3), s: rnd(5, 9), c: pick(['#e9a23b', '#d9622b', '#8fb339', '#c2452d', '#f2c14e']) })),
      step: (p, dt, f) => { p.y += p.vy * dt; p.x += Math.sin(f.t * 1.2 + p.ph) * .9; p.rot += p.vr * dt; return p.y < f.h + 20; },
      draw: (c, p) => { c.globalAlpha = .85; c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.fillStyle = p.c; c.beginPath(); c.ellipse(0, 0, p.s, p.s * .5, 0, 0, 7); c.fill(); c.restore(); } },
    petals: { ...fall(24, () => ({ vy: rnd(20, 45), rot: rnd(0, 6.3), vr: rnd(-1.5, 1.5), ph: rnd(0, 6.3), s: rnd(4, 7), c: pick(['#ffc8dd', '#ffafcc', '#ffffff', '#fde2e4']) })),
      step: (p, dt, f) => { p.y += p.vy * dt; p.x += Math.sin(f.t * .9 + p.ph) * 1.1; p.rot += p.vr * dt; return p.y < f.h + 20; },
      draw: (c, p) => { c.globalAlpha = .9; c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.fillStyle = p.c; c.strokeStyle = 'rgba(220,120,160,.35)'; c.lineWidth = .6; c.beginPath(); c.ellipse(0, 0, p.s, p.s * .6, 0, 0, 7); c.fill(); c.stroke(); c.restore(); } },
    confetti: { ...fall(40, f => ({ vy: rnd(40, 90), rot: rnd(0, 6.3), vr: rnd(-6, 6), w: rnd(5, 9), h: rnd(3, 5), c: pick(f.colors.concat(['#ffd166', '#ff6b9d'])) })),
      step: (p, dt, f) => { p.y += p.vy * dt; p.rot += p.vr * dt; return p.y < f.h + 10; },
      draw: (c, p) => { c.globalAlpha = .9; c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.scale(1, Math.cos(p.rot * 2)); c.fillStyle = p.c; c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); c.restore(); } },
    bokeh: { n: 12, spawn: f => ({ x: rnd(0, f.w), y: rnd(0, f.h), r: rnd(20, 60), vx: rnd(-8, 8), vy: rnd(-8, 8), ph: rnd(0, 6.3), c: pick(f.colors) }),
      step: (p, dt, f) => { p.x = (p.x + p.vx * dt + f.w) % f.w; p.y = (p.y + p.vy * dt + f.h) % f.h; return true; },
      draw: (c, p, f) => { const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); g.addColorStop(0, p.c); g.addColorStop(1, 'transparent'); c.globalAlpha = .12 + .1 * Math.sin(f.t * .8 + p.ph); c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fill(); } },
    orbs: { n: 16, spawn: (f, i) => ({ x: rnd(0, f.w), y: i ? rnd(0, f.h) : f.h + 20, r: rnd(3, 7), vy: rnd(12, 30), ph: rnd(0, 6.3), c: pick(f.colors) }),
      step: (p, dt, f) => { p.y -= p.vy * dt; p.x += Math.sin(f.t + p.ph) * .5; return p.y > -20; },
      draw: (c, p, f) => { const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3); g.addColorStop(0, p.c); g.addColorStop(.3, p.c); g.addColorStop(1, 'transparent'); c.globalAlpha = Math.min(1, (f.h - p.y) / 80) * Math.min(1, p.y / 80) * .8; c.fillStyle = g; c.beginPath(); c.arc(p.x, p.y, p.r * 3, 0, 7); c.fill(); } },
    meteors: { n: 4, spawn: f => ({ x: rnd(f.w * .3, f.w * 1.2), y: rnd(-f.h * .3, f.h * .4), v: rnd(500, 900), l: rnd(60, 140), wait: rnd(0, 4) }),
      step: (p, dt, f) => { if (p.wait > 0) { p.wait -= dt; return true; } p.x -= p.v * dt * .8; p.y += p.v * dt * .6; return p.x > -150 && p.y < f.h + 150; },
      draw: (c, p) => { if (p.wait > 0) return; const g = c.createLinearGradient(p.x, p.y, p.x + p.l * .8, p.y - p.l * .6); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)'); c.globalAlpha = 1; c.strokeStyle = g; c.lineWidth = 2; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + p.l * .8, p.y - p.l * .6); c.stroke(); } },
    fireworks: { n: 3, spawn: f => ({ x: rnd(f.w * .15, f.w * .85), y: rnd(f.h * .15, f.h * .6), t: rnd(-2.5, 0), max: 1.6, c: pick(f.colors.concat(['#ffd166', '#ff6b9d'])), k: 22 + (Math.random() * 10 | 0) }),
      step: (p, dt) => (p.t += dt) < p.max,
      draw: (c, p) => { if (p.t < 0) return; const r = 70 * (1 - Math.pow(1 - p.t / p.max, 3)), g = 30 * p.t * p.t; c.globalAlpha = Math.max(0, 1 - p.t / p.max); c.fillStyle = p.c; for (let i = 0; i < p.k; i++) { const a = i / p.k * 6.283; c.beginPath(); c.arc(p.x + Math.cos(a) * r, p.y + Math.sin(a) * r + g, 1.8, 0, 7); c.fill(); } } },
    aurora: { n: 3, spawn: (f, i) => ({ i: f.ps ? f.ps.length : 0, c: pick(['#3dffb0', '#7c5cff', '#00c9c8', '#ff6b9d']), ph: rnd(0, 6.3), y: rnd(.15, .5), amp: rnd(14, 30) }),
      step: () => true,
      draw: (c, p, f) => { const base = f.h * p.y; c.globalAlpha = .18; const g = c.createLinearGradient(0, base - 60, 0, base + 60); g.addColorStop(0, 'transparent'); g.addColorStop(.5, p.c); g.addColorStop(1, 'transparent'); c.fillStyle = g; c.beginPath(); c.moveTo(0, base + 60); for (let x = 0; x <= f.w; x += 16) c.lineTo(x, base + Math.sin(x / 90 + f.t * .7 + p.ph) * p.amp - 40); c.lineTo(f.w, base + 60); c.closePath(); c.fill(); } },
    matrix: { n: 26, spawn: (f, i) => ({ x: Math.round(rnd(0, f.w) / 14) * 14, y: i ? rnd(0, f.h) : -40, vy: rnd(60, 140), len: 6 + (Math.random() * 8 | 0) }),
      step: (p, dt, f) => { p.y += p.vy * dt; return p.y - p.len * 14 < f.h; },
      draw: (c, p) => { c.font = '12px Consolas, monospace'; for (let i = 0; i < p.len; i++) { c.globalAlpha = (1 - i / p.len) * .55; c.fillStyle = i ? '#3dff6e' : '#d6ffe0'; c.fillText(String((p.x * 7 + i * 3 + (p.y / 14 | 0)) % 2), p.x, p.y - i * 14); } } },
    ripples: { n: 8, spawn: f => ({ x: rnd(0, f.w), y: rnd(0, f.h), r: 0, max: rnd(30, 80), wait: rnd(0, 3), c: pick(f.colors) }),
      step: (p, dt) => { if (p.wait > 0) { p.wait -= dt; return true; } p.r += 38 * dt; return p.r < p.max; },
      draw: (c, p) => { if (p.wait > 0) return; c.globalAlpha = .55 * (1 - p.r / p.max); c.strokeStyle = p.c; c.lineWidth = 1.5; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.stroke(); } }
  };
  const fxs = new Map(); // area -> effect instance
  function fxSync() {
    const want = IS_CHAT && active() && R.fx !== 'none' && FXDEF[R.fx] && !calm() && !tiny();
    const list = want ? liveAreas() : [];
    for (const [a, f] of [...fxs]) if (!list.includes(a) || f.type !== R.fx || f.density !== R.fxDensity) fxStop(a);
    for (const area of list) {
      const cur = fxs.get(area);
      if (cur) { cur.colors = fxColors(); continue; }
      const cv = el('canvas', { class: 'cs-fx', 'aria-hidden': 'true' });
      document.body.append(cv);
      const f = { cv, ctx: cv.getContext('2d'), area, type: R.fx, density: R.fxDensity, colors: fxColors(), ps: [], last: performance.now(), t: 0, rt: 0, w: 1, h: 1 };
      fxs.set(area, f);
      fxRect(f);
      f.io = new IntersectionObserver(es => { f.off = !es[0].isIntersecting; }); f.io.observe(area);
      const n = Math.max(2, Math.round(FXDEF[R.fx].n * R.fxDensity / 50));
      for (let i = 0; i < n; i++) f.ps.push(FXDEF[R.fx].spawn(f, true));
      const loop = now => fxLoop(f, now);
      f.loop = loop;
      f.raf = requestAnimationFrame(loop);
    }
  }
  function fxStop(area) {
    const stop = f => { cancelAnimationFrame(f.raf); f.dead = true; if (f.io) f.io.disconnect(); f.cv.remove(); fxs.delete(f.area); };
    if (area) { const f = fxs.get(area); if (f) stop(f); } else [...fxs.values()].forEach(stop);
  }
  function fxRect(f) {
    const r = f.area.getBoundingClientRect(), dpr = Math.min(1.5, devicePixelRatio || 1);
    f.w = Math.max(1, r.width); f.h = Math.max(1, r.height);
    Object.assign(f.cv.style, { left: r.left + 'px', top: r.top + 'px', width: f.w + 'px', height: f.h + 'px' });
    const W = Math.round(f.w * dpr), Hh = Math.round(f.h * dpr);
    if (f.cv.width !== W || f.cv.height !== Hh) { f.cv.width = W; f.cv.height = Hh; }
    f.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function fxLoop(f, now) {
    if (f.dead) return;
    f.raf = requestAnimationFrame(f.loop);
    if (document.hidden || f.off || now - f.last < 32) { if (document.hidden || f.off) f.last = now; return; }
    const dt = Math.min(.06, (now - f.last) / 1000); f.last = now; f.t += dt;
    if ((f.rt += dt) > .5) { f.rt = 0; if (!f.area.isConnected) { fxStop(f.area); fxSync(); return; } fxRect(f); }
    const { ctx } = f, D = FXDEF[f.type];
    ctx.clearRect(0, 0, f.w, f.h);
    for (let i = 0; i < f.ps.length; i++) {
      if (D.step(f.ps[i], dt, f) === false) f.ps[i] = D.spawn(f, false);
      D.draw(ctx, f.ps[i], f);
    }
    ctx.globalAlpha = 1;
  }

