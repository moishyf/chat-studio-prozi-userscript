  /* ================= Context ================= */
  const HOST = location.hostname;
  const IS_TOP = (() => { try { return window.top === window; } catch { return false; } })();
  const IS_CHAT = HOST === 'chat.google.com' || (HOST === 'mail.google.com' && !IS_TOP && /^\/chat\//.test(location.pathname));
  const IS_MAIL = HOST === 'mail.google.com' && IS_TOP;
  if (!IS_CHAT && !IS_MAIL) return;
  const IN_GMAIL = IS_CHAT && !IS_TOP && (HOST === 'mail.google.com' || Array.from(location.ancestorOrigins || []).some(o => /mail\.google\.com/.test(o)));
  /* which signed-in Google account this page belongs to (/u/0/, /u/1/ … or ?authuser=) */
  const ACCT_IDX = (() => { const m = location.pathname.match(/\/u\/(\d+)(?=\/|$)/) || location.search.match(/[?&]authuser=(\d+)/); return m ? +m[1] : 0; })();
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiny = () => innerWidth < 80 || innerHeight < 80; // hidden helper frames: do nothing there
  const idle = (fn, t = 400) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: t }) : setTimeout(fn, 60));
  const H = document.documentElement;
  const XURL = () => ''; // Assets are rendered as SVG DOM by embeddedBackground.

  /* ================= State ================= */
  const DEFAULTS = {
    theme: 'k:modern', nightTheme: 'k:night', autoNight: false,
    scope: 'messages', bg: 'c:whatsapp', bgMove: true, bgOpacity: 85, bgTone: 'light',
    lang: 'he', uniq: 'stripe', enter: 'pop', hover: 'lift', fx: 'none', fxDensity: 50,
    shape: 'auto', font: 'auto', size: 'm', spacing: 'm', shadow: 'theme', textFx: 'none', weight: 'auto', border: 'theme',
    custom: { a: '#7c5cff', b: '#00c9c8', c: '#ffd166' }, favs: [], lite: false, liveAnim: true, bgFit: 'contain', ticks: 'wa',
    inGmail: true, onChat: true, inMail: false,
    tab: 'themes', cat: 'top', bgCat: 'classic', fxSub: 'motion', _v: 15
  };
  /* everything that makes up a "look": these can be set separately for each Google account */
  const DESIGN_KEYS = ['theme', 'nightTheme', 'autoNight', 'scope', 'bg', 'bgMove', 'bgOpacity', 'bgTone', 'bgFit', 'uniq', 'enter', 'hover', 'fx', 'fxDensity',
    'shape', 'font', 'size', 'spacing', 'shadow', 'textFx', 'weight', 'border', 'custom', 'ticks'];
  let G = { ...DEFAULTS };   // global settings (apply to every account that has no look of its own)
  let PROF = {};             // account key -> its own look
  let ACCTS = {};            // account key -> { idx, email, name, seen, me }
  let IMGIX = [];            // picture index: [{ id, t: 'd' (stored picture) | 'u' (link), u, th (small preview) }]
  let R = G;                 // what this page shows
  let S = G;                 // what the panel is editing
  let editKey = null;        // null = global look; otherwise an account key
  const KEY = 'cs6', PKEY = 'cs6prof', AKEY = 'cs6acct', XKEY = 'cs7imgs', IPFX = 'cs7i:';
  const store = (typeof csPlatform !== 'undefined' && csPlatform.storage && csPlatform.storage.local) || null;
  const sget = keys => new Promise(r => { try { store ? store.get(keys, d => r(d || {})) : r({}); } catch { r({}); } });
  const FID = Math.random().toString(36).slice(2); // identifies this window, so it ignores the echo of its own saves
  let saveT = 0;
  const dirty = new Set();
  function save(...what) {
    (what.length ? what : ['g']).forEach(w => dirty.add(w));
    clearTimeout(saveT);
    (() => {
      const o = {};
      if (dirty.has('g')) o[KEY] = { ...G, _w: FID };
      if (dirty.has('p')) o[PKEY] = { _w: FID, p: PROF };
      if (dirty.has('x')) o[XKEY] = { _w: FID, x: IMGIX };
      dirty.clear();
      try { store && store.set(o); } catch {}
    })();
  }
  const active = () => IS_MAIL ? !!G.inMail : IN_GMAIL ? !!G.inGmail : !!G.onChat;
  const isNight = () => { const h = new Date().getHours(); return h >= 19 || h < 6; };
  const nightNow = (st = R) => st.autoNight && isNight();
  const curTheme = (st = R) => nightNow(st) ? st.nightTheme : st.theme;
  const calm = () => REDUCED || !!G.lite;

