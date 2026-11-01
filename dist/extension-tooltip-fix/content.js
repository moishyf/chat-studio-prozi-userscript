/* Chat Studio v15 — Google Chat designer.
   - No HTML-string sinks (Google enforces Trusted Types): DOM is built with createElement / createElementNS.
   - No data: URLs in the page (Google's image policy blocks them): icons are inline SVG, patterns are extension files,
     uploaded images are decoded with createImageBitmap and painted on a canvas layer.
   - Styles Google's own message bubble (and the text inside it).
   - Fast: starts at document_start, reads only small settings from storage (each picture is stored separately and
     loaded only when it is shown), batches DOM reads before writes, and does nothing in frames where it is off. */
(() => {
  if (window.__chatStudio15) return;
  window.__chatStudio15 = true;

/* Scoped stacking repair. Keep Google's node, events, focus and placement intact.
 * Raising only the tooltip fails when its containing row is a stacking context.
 * Observe visibility changes as well as insertions (Google reuses popup nodes).
 */
function createPopupGuard(root=document) {
  const selector='[role="tooltip"],[role="menu"],[role="dialog"],[role="alertdialog"],[role="listbox"]';
  const candidates=new Set(),applied=new Map();let observer=null,frame=0;
  const own=e=>e.closest?.('#cs-panel,.cs-root,.cs-asset,.cs-imglayer,.cs-wa-meta');
  function collect(e){if(!e?.querySelectorAll||own(e))return;if(e.matches?.(selector))candidates.add(e);for(const p of e.querySelectorAll(selector))if(!own(p))candidates.add(p);}
  const open=e=>e.isConnected&&!e.hidden&&e.getAttribute('aria-hidden')!=='true'&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none';
  function sync(){
    frame=0;const desired=new Map();
    for(const popup of candidates){
      if(!popup.isConnected){candidates.delete(popup);continue;}
      if(!open(popup))continue;
      for(let e=popup;e&&e!==document.body&&e!==document.documentElement;e=e.parentElement){
        if(e!==popup&&e.matches('.cs-chat-pane,[role="list"],[role="main"]'))break;
        const cs=getComputedStyle(e);
        const bubble=e.classList.contains('cs-msg');
        const stacking=cs.position!=='static'||cs.transform!=='none'||cs.filter!=='none'||cs.isolation==='isolate'||Number(cs.opacity)<1||cs.backdropFilter!=='none';
        if(e===popup||bubble||stacking){
          const classes=new Set();
          if(cs.zIndex==='auto'||Number(cs.zIndex)<1000||e.classList.contains('cs-popup-raised'))classes.add('cs-popup-raised');
          if(cs.position==='static'||e.classList.contains('cs-popup-position'))classes.add('cs-popup-position');
          if(bubble)classes.add('cs-popup-frozen');
          const existing=desired.get(e)||new Set();classes.forEach(c=>existing.add(c));desired.set(e,existing);
        }
      }
    }
    for(const [e,classes]of applied)for(const c of classes)if(!desired.get(e)?.has(c))e.classList.remove(c);
    for(const [e,classes]of desired)for(const c of classes)if(!e.classList.contains(c))e.classList.add(c);
    applied.clear();for(const [e,classes]of desired)applied.set(e,classes);
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(sync);};
  const stripped=s=>(s||'').split(/\s+/).filter(c=>c&&!c.startsWith('cs-')).sort().join(' ');
  function start(){
    if(observer)return;collect(root);
    observer=new MutationObserver(mutations=>{
      let relevant=false;
      for(const m of mutations){
        if(own(m.target))continue;
        if(m.type==='attributes'){
          if(m.attributeName==='class'&&stripped(m.oldValue)===stripped(m.target.getAttribute('class')))continue;
          if(candidates.has(m.target)||m.target.matches?.(selector)||m.target.querySelector?.(selector)){collect(m.target);relevant=true;}
        }else{for(const n of m.addedNodes)if(n.nodeType===1){collect(n);relevant=true;}if(m.removedNodes.length)relevant=true;}
      }
      if(relevant)schedule();
    });
    observer.observe(root.documentElement||root,{subtree:true,childList:true,attributes:true,attributeOldValue:true,attributeFilter:['hidden','aria-hidden','style','class','role']});
    schedule();
  }
  function stop(){observer?.disconnect();observer=null;cancelAnimationFrame(frame);frame=0;for(const [e,classes]of applied)e.classList.remove(...classes);applied.clear();candidates.clear();}
  return {start,stop,sync};
}
const popupGuard=createPopupGuard();

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
  const XURL = p => { try { return chrome.runtime.getURL(p); } catch { return ''; } };

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
  const store = (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) || null;
  const sget = keys => new Promise(r => { try { store ? store.get(keys, d => r(d || {})) : r({}); } catch { r({}); } });
  const FID = Math.random().toString(36).slice(2); // identifies this window, so it ignores the echo of its own saves
  let saveT = 0;
  const dirty = new Set();
  function save(...what) {
    (what.length ? what : ['g']).forEach(w => dirty.add(w));
    clearTimeout(saveT);
    saveT = setTimeout(() => {
      const o = {};
      if (dirty.has('g')) o[KEY] = { ...G, _w: FID };
      if (dirty.has('p')) o[PKEY] = { _w: FID, p: PROF };
      if (dirty.has('x')) o[XKEY] = { _w: FID, x: IMGIX };
      dirty.clear();
      try { store && store.set(o); } catch {}
    }, 150);
  }
  const active = () => IS_MAIL ? !!G.inMail : IN_GMAIL ? !!G.inGmail : !!G.onChat;
  const isNight = () => { const h = new Date().getHours(); return h >= 19 || h < 6; };
  const nightNow = (st = R) => st.autoNight && isNight();
  const curTheme = (st = R) => nightNow(st) ? st.nightTheme : st.theme;
  const calm = () => REDUCED || !!G.lite;

  /* ---------- accounts ---------- */
  const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/;
  let pageAcct = null; // { email, name } read from this page (top frames only)
  /* Google's apps embed the signed-in address in the page data (WIZ_global_data "oPEP7c"; Gmail's GLOBALS) — works in every frame */
  function readFrameEmail() {
    try {
      for (const s of document.scripts) {
        if (s.src) continue;
        const t = s.textContent || '';
        let i = t.indexOf('oPEP7c');
        if (i >= 0) { const m = t.slice(i, i + 300).replace(/\\u0040/g, '@').match(/oPEP7c\\?"\s*:\s*\\?"([\w.+-]+@[\w-]+(?:\.[\w-]+)+)\\?"/); if (m) return m[1].toLowerCase(); }
        i = t.indexOf('var GLOBALS');
        if (i >= 0) { const m = t.slice(i, i + 3000).match(EMAIL_RE); if (m) return m[0].toLowerCase(); }
      }
    } catch {}
    return '';
  }
  function readPageAccount() {
    let email = '', name = '';
    if (IS_TOP) {
      const a = document.querySelector('a[aria-label*="@"][href*="accounts.google.com"], a[aria-label*="@"][href*="SignOutOptions"], [data-ogsr-up] a[aria-label*="@"]');
      const lab = a ? a.getAttribute('aria-label') || '' : '';
      const m = lab.match(EMAIL_RE) || (document.title || '').match(EMAIL_RE);
      if (m) email = m[0].toLowerCase();
      const nm = lab.replace(/[\u200e\u200f]/g, '').match(/:\s*([^\n(]+?)\s*[\n(]/);
      if (nm) name = nm[1].trim();
    }
    const w = readFrameEmail();
    if (w) { if (email && email !== w) name = ''; email = w; }
    return email ? { email, name } : null;
  }
  /* the e-mail of the account this page belongs to (frames learn it from the top page through storage) */
  function curEmail() {
    if (pageAcct) return pageAcct.email;
    let best = null;
    for (const k in ACCTS) { const a = ACCTS[k]; if (a.email && a.idx === ACCT_IDX && (!best || (a.seen || 0) > (best.seen || 0))) best = a; }
    return best ? best.email : '';
  }
  const acctKeyOf = a => a.email ? a.email.toLowerCase() : 'u' + a.idx;
  const myAcctKey = () => curEmail() || 'u' + ACCT_IDX;
  const myAcct = () => ACCTS[myAcctKey()] || ACCTS['u' + ACCT_IDX] || null;
  const onProf = k => !!(k && PROF[k] && !PROF[k].off);
  function meKey() {
    const e = curEmail();
    if (e && onProf(e)) return e;
    if (onProf('u' + ACCT_IDX) && !(e && PROF[e])) return 'u' + ACCT_IDX;
    return null;
  }
  /* the profile key for this account: its e-mail when known, otherwise its account number */
  const thisKey = () => { const e = curEmail(); if (e) return e; return 'u' + ACCT_IDX; };
  /* account list: several windows/frames may write at the same moment, so changes are merged into what is stored, never overwritten */
  const acctPut = new Map(); // key -> entry (null = delete)
  let acctT = 0;
  function putAcct(k, entry) {
    if (entry) ACCTS[k] = entry; else delete ACCTS[k];
    acctPut.set(k, entry);
    clearTimeout(acctT);
    acctT = setTimeout(async () => {
      const d = await sget([AKEY]);
      const A = (d[AKEY] && d[AKEY].a) || {};
      for (const [key, e] of acctPut) { if (e) A[key] = { ...(A[key] || {}), ...e }; else delete A[key]; }
      acctPut.clear();
      ACCTS = A;
      try { store && store.set({ [AKEY]: { _w: FID, a: A } }); } catch {}
    }, 60 + Math.random() * 120);
  }
  /* every account signed in to this browser, straight from Google (through the extension's background helper) */
  let acctFetchAt = 0;
  function fetchAccounts(force) {
    if (!force && Date.now() - acctFetchAt < 10 * 60e3) return Promise.resolve(null);
    acctFetchAt = Date.now();
    return new Promise(res => {
      try { chrome.runtime.sendMessage({ type: 'cs-accounts', force: !!force }, r => { const le = chrome.runtime.lastError; res(r || { ok: false, list: [], error: le ? le.message : 'no answer' }); }); }
      catch (e) { res({ ok: false, list: [], error: String(e && e.message || e) }); }
    });
  }
  /* remember this account: top pages read the e-mail from Google's account button; frames get it from them */
  let regTries = 0;
  function registerAccount() {
    const p = readPageAccount(); if (p) pageAcct = p;
    const now = Date.now();
    if (pageAcct) {
      const email = pageAcct.email, cur = ACCTS[email] || {};
      let changed = false;
      if (ACCTS['u' + ACCT_IDX] && !ACCTS['u' + ACCT_IDX].email) { const old = ACCTS['u' + ACCT_IDX]; putAcct('u' + ACCT_IDX, null); if (old.me && !cur.me) cur.me = old.me; changed = true; }
      for (const k in ACCTS) if (k !== email && ACCTS[k].idx === ACCT_IDX && ACCTS[k].email) { putAcct(k, { ...ACCTS[k], idx: null }); changed = true; }
      const next = { ...cur, email, idx: ACCT_IDX, name: pageAcct.name || cur.name || '' };
      if (changed || cur.idx !== next.idx || cur.name !== next.name || cur.email !== email || now - (cur.seen || 0) > 6 * 3600e3) { next.seen = now; putAcct(email, next); return true; }
      return false;
    }
    // no e-mail on this page (yet): after a while list it by its account number
    if (IS_TOP && IS_CHAT && ++regTries === 4 && !Object.values(ACCTS).some(a => a.idx === ACCT_IDX)) { putAcct('u' + ACCT_IDX, { idx: ACCT_IDX, seen: now }); return true; }
    return false;
  }
  function viewFor(k) {
    const p = k && PROF[k];
    if (!p || p.off) return G;
    const v = { ...G };
    for (const key of DESIGN_KEYS) if (key in p) v[key] = p[key];
    v.custom = { ...G.custom, ...(p.custom || {}) };
    return v;
  }
  function recompute() { R = viewFor(meKey()); if (editKey && !onProf(editKey)) editKey = null; S = viewFor(editKey); }
  const pickDesign = src => { const o = {}; for (const k of DESIGN_KEYS) o[k] = k === 'custom' ? { ...src.custom } : src[k]; return o; };

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

  /* ================= i18n ================= */
  const TXT = {
    he: {
      title: 'סטודיו צ\'אט', btn: 'עיצוב הצ\'אט', tabThemes: 'עיצובים', tabBg: 'רקעים', tabFx: 'אפקטים', tabSet: 'הגדרות',
      search: n => `חיפוש בין ${n} עיצובים`, top: 'מומלצים', favs: 'מועדפים', classic: 'קלאסיים', build: 'בנה בעצמך', none: 'ללא עיצוב',
      noFavs: 'סמנו כוכב על עיצוב כדי לשמור אותו כאן', noRes: 'לא נמצאו עיצובים', editingNight: 'מצב לילה פעיל כעת: הבחירה תשנה את עיצוב הלילה',
      buildHint: 'בחרו 3 צבעים, ואז סגנון', c1: 'ראשי', c2: 'משני', c3: 'הדגשה', mine3: 'הצבעים שלי',
      scope: 'מה לעצב', onlyMsg: 'הודעות בלבד', msgBg: 'הודעות + רקע', bgHint: 'בחירת רקע תפעיל אותו אוטומטית', bgMove: 'רקע מונפש',
      mine: 'התמונות שלי', upload: 'העלאה מהמחשב', url: 'הדבק קישור לתמונה מהרשת', apply: 'החל', tone: 'שכבת גוון', fit: 'התאמת התמונה', ticks: 'שעה ווי בתוך הבועה', tk: { off: 'כבוי', wa: 'בעיצובי וואטסאפ', all: 'בכל העיצובים' }, ticksD: 'וי אפור כפול: ההודעה נמסרה. וי כחול כפול: ההודעה נקראה. המידע נלקח מסימון הקריאה של Google Chat.', toneLight: 'בהירה', toneDark: 'כהה',
      opacity: 'עוצמת התמונה', noImgs: 'עדיין לא נוספו תמונות', enter: 'הנפשת כניסה להודעות', hover: 'אפקט במעבר עכבר', fx: 'אפקטי אווירה',
      subMotion: 'תנועה', subLook: 'מראה', subText: 'טקסט',
      density: 'כמות', shape: 'צורת בועה', font: 'גופן', size: 'גודל טקסט', spacing: 'ריווח', sp: { s: 'צפוף', m: 'רגיל', l: 'מרווח' },
      shadow: 'צל', border: 'מסגרת', textFx: 'אפקט טקסט', weight: 'עובי טקסט',
      where: 'איפה התוסף פועל', inGmail: 'צ\'אט בתוך Gmail', inGmailD: 'פעיל כברירת מחדל', onChat: 'Google Chat בחלון נפרד', onChatD: 'chat.google.com',
      inMail: 'גם תיבת הדואר של Gmail', inMailD: 'רקע ועיצוב לשורות המיילים',
      uniq: 'צבע ייחודי לכל משתמש', u: { none: 'ללא', stripe: 'פס צבע', tint: 'גוון מלא' },
      dayNight: 'יום ולילה', autoNight: 'מעבר אוטומטי לעיצוב לילה', autoNightD: 'בין 19:00 ל-06:00', nightIs: 'עיצוב הלילה:', setNight: 'קבע את הנוכחי ללילה',
      lang: 'שפה', share: 'שיתוף וגיבוי', copy: 'העתק קוד עיצוב', paste: 'הדבק כאן קוד עיצוב', load: 'טען', copied: 'קוד העיצוב הועתק',
      loaded: 'העיצוב נטען', badCode: 'הקוד אינו תקין', reset: 'איפוס הכל', random: 'הפתע אותי', surprised: 'עיצוב אקראי הופעל',
      tooBig: 'הקובץ גדול מדי (עד 15MB)', badUrl: 'לא ניתן לטעון תמונה מהקישור', saved: 'הרקע עודכן', nightSet: 'עיצוב הלילה נקבע',
      note: 'הכל נשמר אוטומטית', perf: 'ביצועים', live: 'הנפשה רציפה בבועות', liveD: 'כבוי: הבועה מונפשת רק כשהעכבר מעליה (מהיר יותר)', lite: 'מצב חסכוני', liteD: 'בלי הנפשות, טשטוש ואפקטים, למחשבים חלשים', themesN: 'עיצובים', bgsN: 'רקעים', byTheme: 'לפי העיצוב'
    },
    en: {
      title: 'Chat Studio', btn: 'Chat design', tabThemes: 'Themes', tabBg: 'Backgrounds', tabFx: 'Effects', tabSet: 'Settings',
      search: n => `Search ${n} themes`, top: 'Featured', favs: 'Favorites', classic: 'Classic', build: 'Build your own', none: 'No design',
      noFavs: 'Star a theme to keep it here', noRes: 'No themes found', editingNight: 'Night mode is active: your pick changes the night theme',
      buildHint: 'Pick 3 colors, then a style', c1: 'Main', c2: 'Second', c3: 'Accent', mine3: 'My colors',
      scope: 'Style what', onlyMsg: 'Messages only', msgBg: 'Messages + background', bgHint: 'Picking a background turns it on', bgMove: 'Animated background',
      mine: 'My images', upload: 'Upload from computer', url: 'Paste an image link', apply: 'Apply', tone: 'Overlay', fit: 'Picture fit', ticks: 'Time and ticks in bubbles', tk: { off: 'Off', wa: 'WhatsApp themes', all: 'All themes' }, ticksD: 'Grey double tick: delivered. Blue double tick: read. Based on Google Chat’s own read indicator.', toneLight: 'Light', toneDark: 'Dark',
      opacity: 'Image strength', noImgs: 'No images yet', enter: 'Message entry animation', hover: 'Hover effect', fx: 'Ambient effects',
      subMotion: 'Motion', subLook: 'Look', subText: 'Text',
      density: 'Amount', shape: 'Bubble shape', font: 'Font', size: 'Text size', spacing: 'Spacing', sp: { s: 'Compact', m: 'Normal', l: 'Airy' },
      shadow: 'Shadow', border: 'Border', textFx: 'Text effect', weight: 'Text weight',
      where: 'Where it runs', inGmail: 'Chat inside Gmail', inGmailD: 'On by default', onChat: 'Google Chat standalone', onChatD: 'chat.google.com',
      inMail: 'Also the Gmail inbox', inMailD: 'Background and styled mail rows',
      uniq: 'Unique color per user', u: { none: 'None', stripe: 'Stripe', tint: 'Full tint' },
      dayNight: 'Day & night', autoNight: 'Auto-switch to night theme', autoNightD: '19:00 to 06:00', nightIs: 'Night theme:', setNight: 'Use current for night',
      lang: 'Language', share: 'Share & backup', copy: 'Copy design code', paste: 'Paste a design code', load: 'Load', copied: 'Design code copied',
      loaded: 'Design loaded', badCode: 'Invalid code', reset: 'Reset everything', random: 'Surprise me', surprised: 'Random design applied',
      tooBig: 'File too large (max 15MB)', badUrl: 'Could not load image from link', saved: 'Background updated', nightSet: 'Night theme set',
      note: 'Everything is saved automatically', perf: 'Performance', live: 'Continuous bubble animation', liveD: 'Off: a bubble animates only while hovered (faster)', lite: 'Lite mode', liteD: 'No animations, blur or effects, for slower computers', themesN: 'themes', bgsN: 'backgrounds', byTheme: 'Theme default'
    }
  };
  const L = () => TXT[S.lang] || TXT.he;
  const N = o => (o && (o[S.lang] || o.he)) || '';

  Object.assign(TXT.he, {
    accts: 'חשבונות', acctBtn: 'הגדרה אישית לכל חשבון', acctClose: 'הסתר את רשימת החשבונות',
    acctD: 'כברירת מחדל העיצוב חל על כל החשבונות. לחצו על חשבון כדי לתת לו עיצוב, רקע ותמונה משלו.',
    acctAll: 'כל החשבונות', acctAllD: 'עיצוב ברירת המחדל', acctCur: 'נוכחי', acctOwn: 'עיצוב אישי', acctShared: 'משתמש בעיצוב הכללי',
    acctEditing: 'עורכים רק את העיצוב של', acctDone: 'סיום', acctReset: 'חזרה לעיצוב הכללי', acctN: n => `חשבון ${n}`,
    acctHint: 'כל חשבונות הגוגל שמחוברים בדפדפן הזה מזוהים אוטומטית. פרופיל אחר של כרום הוא דפדפן נפרד: מתקינים בו את התוסף וההגדרות שלו נפרדות.',
    acctElse: 'השינויים יוצגו כשתפתחו את החשבון הזה', acctMade: 'לחשבון הזה יש עכשיו עיצוב משלו. כל מה שתבחרו יחול רק עליו', acctBack: 'החשבון חזר לעיצוב הכללי',
    acctEditingThis: 'עורכים רק את החשבון הזה', acctAllShort: 'לכל החשבונות', acctThis: 'החשבון הפתוח כעת', acctSep: 'עיצוב נפרד לחשבון הזה', acctSepOff: 'כבוי: החשבון משתמש בעיצוב של כל החשבונות', acctSepOn: 'פועל: לחשבון הזה יש עיצוב, רקע ותמונה משלו', acctEditThis: 'עריכת החשבון הזה', acctEditAll: 'עריכת כל החשבונות', acctNoEmail: 'כתובת המייל עדיין לא זוהתה', acctOther: 'בכל חשבון אחר שתפתחו אפשר להפעיל עיצוב נפרד באותה דרך. חשבון שלא הפעלתם בו עיצוב נפרד משתמש בעיצוב של כל החשבונות.',
    sending: 'נשלחת', acctFinding: 'מזהה את החשבונות המחוברים…', acctRefresh: 'רענון רשימת החשבונות', acctFail: 'לא הצלחתי לקרוא מגוגל את רשימת החשבונות. החשבונות שכבר פתחתם בהם את Gmail או את הצ\'אט מופיעים בכל זאת. אם זה חוזר, שלחו לי צילום של השורה הזו:'
  });
  Object.assign(TXT.en, {
    accts: 'Accounts', acctBtn: 'Separate design per account', acctClose: 'Hide the account list',
    acctD: 'By default the design applies to every account. Click an account to give it its own design, background and picture.',
    acctAll: 'All accounts', acctAllD: 'Default design', acctCur: 'Current', acctOwn: 'Own design', acctShared: 'Uses the default design',
    acctEditing: 'Editing only the design of', acctDone: 'Done', acctReset: 'Back to the default design', acctN: n => `Account ${n}`,
    acctHint: 'Every Google account signed in to this browser is found automatically. Another Chrome profile is a separate browser: install the extension there and it keeps its own settings.',
    acctElse: 'You will see the changes when you open that account', acctMade: 'This account now has its own design. Everything you pick applies only to it', acctBack: 'The account is back on the default design',
    acctEditingThis: 'Editing only this account', acctAllShort: 'All accounts', acctThis: 'The account open now', acctSep: 'Separate design for this account', acctSepOff: 'Off: this account uses the design of all accounts', acctSepOn: 'On: this account has its own design, background and picture', acctEditThis: 'Edit this account', acctEditAll: 'Edit all accounts', acctNoEmail: 'E-mail address not detected yet', acctOther: 'In any other account you open, you can switch on a separate design the same way. Accounts without one use the design of all accounts.',
    sending: 'Sending', acctFinding: 'Finding the signed-in accounts…', acctRefresh: 'Refresh the account list', acctFail: 'Could not read the account list from Google. Accounts you already opened Gmail or Chat in are still listed. If this keeps happening, send a screenshot of this line:'
  });

  /* ================= Animated SVG icons ================= */
  const GRAD = `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#7c5cff'><animate attributeName='stop-color' values='#7c5cff;#00c9c8;#7c5cff' dur='4s' repeatCount='indefinite'/></stop><stop offset='1' stop-color='#00c9c8'><animate attributeName='stop-color' values='#00c9c8;#ff6b9d;#00c9c8' dur='4s' repeatCount='indefinite'/></stop></linearGradient></defs>`;
  const ST = `fill='none' stroke='url(#g)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'`;
  const SVG = {
    palette: `${GRAD}<path d='M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.3-1-1.6-1-2.6 0-.9.7-1.6 1.6-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z' ${ST} stroke-width='1.9'/>`
      + [['7.5', '11', '#ff6b9d', '0s'], ['10', '7', '#ffb86b', '.3s'], ['14.5', '7', '#00c9c8', '.6s'], ['17', '10.5', '#7c5cff', '.9s']]
        .map(([x, y, c, d]) => `<circle cx='${x}' cy='${y}' r='1.4' fill='${c}'><animate attributeName='r' values='1.2;1.9;1.2' dur='1.8s' begin='${d}' repeatCount='indefinite'/></circle>`).join(''),
    sparkle: `${GRAD}<path d='M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z' fill='url(#g)'><animateTransform attributeName='transform' type='rotate' from='0 12 10' to='360 12 10' dur='9s' repeatCount='indefinite'/></path><circle cx='19' cy='19' r='1.6' fill='#ff6b9d'><animate attributeName='opacity' values='1;.15;1' dur='1.6s' repeatCount='indefinite'/></circle><circle cx='5' cy='19' r='1.1' fill='#00c9c8'><animate attributeName='opacity' values='.15;1;.15' dur='2s' repeatCount='indefinite'/></circle>`,
    brush: `${GRAD}<g><path d='M14 4l6 6-9 9H5v-6z' ${ST}/><path d='M12 6l6 6' ${ST}/><animateTransform attributeName='transform' type='rotate' values='0 12 12;-12 12 12;0 12 12' dur='2.4s' repeatCount='indefinite'/></g>`,
    image: `${GRAD}<rect x='3' y='4' width='18' height='16' rx='3' ${ST}/><circle cx='9' cy='10' r='2' fill='#ffb86b'><animate attributeName='cy' values='10;8.3;10' dur='2.2s' repeatCount='indefinite'/></circle><path d='M21 16l-5-5-9 9' ${ST}/>`,
    wand: `${GRAD}<path d='M4 20L15 9' ${ST}/><path d='M14 4v2M14 10v2M10 8h2M16 8h2' ${ST}><animate attributeName='opacity' values='1;.2;1' dur='1.4s' repeatCount='indefinite'/></path><circle cx='19' cy='4' r='1.2' fill='#ff6b9d'><animate attributeName='r' values='.6;1.6;.6' dur='1.8s' repeatCount='indefinite'/></circle>`,
    gear: `${GRAD}<g ${ST}><circle cx='12' cy='12' r='3.2'/><path d='M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1'/><animateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='8s' repeatCount='indefinite'/></g>`,
    dice: `<g fill='none' stroke='#fff' stroke-width='2' stroke-linejoin='round'><rect x='4' y='4' width='16' height='16' rx='4'/></g><g fill='#fff'><circle cx='9' cy='9' r='1.5'/><circle cx='15' cy='15' r='1.5'/><circle cx='15' cy='9' r='1.5'><animate attributeName='opacity' values='1;.2;1' dur='1.2s' repeatCount='indefinite'/></circle><circle cx='9' cy='15' r='1.5'><animate attributeName='opacity' values='.2;1;.2' dur='1.2s' repeatCount='indefinite'/></circle></g>`,
    search: `${GRAD}<circle cx='11' cy='11' r='6' ${ST}/><path d='M20 20l-4.5-4.5' ${ST}/>`,
    star: `<path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z' fill='none' stroke='#fff' stroke-width='2' stroke-linejoin='round'/>`,
    starOn: `<path d='M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z' fill='#ffc94d' stroke='#ffc94d' stroke-width='1.5' stroke-linejoin='round'/>`,
    upload: `<g fill='none' stroke='#fff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 16V4M6 10l6-6 6 6'><animateTransform attributeName='transform' type='translate' values='0 1;0 -1;0 1' dur='1.2s' repeatCount='indefinite'/></path><path d='M4 20h16'/></g>`,
    link: `<g fill='none' stroke='#fff' stroke-width='2.2' stroke-linecap='round'><path d='M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'/></g>`,
    copy: `<g fill='none' stroke='#fff' stroke-width='2' stroke-linejoin='round'><rect x='8' y='8' width='12' height='12' rx='2'/><path d='M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3'/></g>`,
    moon: `${GRAD}<path d='M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z' ${ST}/><circle cx='18' cy='5' r='1' fill='#ffd166'><animate attributeName='opacity' values='1;.1;1' dur='2s' repeatCount='indefinite'/></circle>`,
    pin: `${GRAD}<path d='M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z' ${ST}/><circle cx='12' cy='9.5' r='2.5' fill='url(#g)'><animate attributeName='r' values='2;3;2' dur='1.6s' repeatCount='indefinite'/></circle>`,
    users: `${GRAD}<circle cx='9' cy='8' r='3.5' ${ST}/><path d='M2.5 20a6.5 6.5 0 0 1 13 0' ${ST}/><circle cx='17' cy='9' r='2.5' ${ST}><animate attributeName='cy' values='9;8;9' dur='1.8s' repeatCount='indefinite'/></circle><path d='M17 14.5a5 5 0 0 1 4.5 5' ${ST}/>`,
    globe: `${GRAD}<g ${ST}><circle cx='12' cy='12' r='9'/><path d='M3 12h18'/><ellipse cx='12' cy='12' rx='4' ry='9'><animate attributeName='rx' values='4;1;4' dur='3s' repeatCount='indefinite'/></ellipse></g>`,
    share: `${GRAD}<g ${ST}><circle cx='18' cy='5' r='2.5'/><circle cx='6' cy='12' r='2.5'/><circle cx='18' cy='19' r='2.5'/><path d='M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4'/></g>`,
    type: `${GRAD}<path d='M4 7V5h16v2M12 5v14M9 19h6' ${ST}/>`,
    bubble: `${GRAD}<path d='M4 5h16v11H9l-5 4z' ${ST}><animateTransform attributeName='transform' type='translate' values='0 0;0 -1;0 0' dur='1.6s' repeatCount='indefinite'/></path>`,
    drop: `${GRAD}<path d='M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z' ${ST}><animateTransform attributeName='transform' type='scale' values='1;1.05;1' dur='2s' additive='sum' repeatCount='indefinite'/></path>`,
    frame: `${GRAD}<rect x='4' y='4' width='16' height='16' rx='4' ${ST}><animate attributeName='rx' values='4;8;4' dur='2.4s' repeatCount='indefinite'/></rect>`,
    close: `<path d='M6 6l12 12M18 6L6 18' stroke='#8a87a8' stroke-width='2.6' stroke-linecap='round'/>`,
    reset: `${GRAD}<path d='M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4' ${ST}/>`
  };
  const FXI = {
    none: `<circle cx='12' cy='12' r='7' fill='none' stroke='#8d90b8' stroke-width='2'/><path d='M7 17L17 7' stroke='#8d90b8' stroke-width='2'/>`,
    stars: [[6, 7, 0], [17, 5, .5], [12, 13, 1], [5, 18, 1.4], [19, 16, .8]].map(([x, y, d]) => `<path d='M${x} ${y - 2}Q${x} ${y} ${x + 2} ${y}Q${x} ${y} ${x} ${y + 2}Q${x} ${y} ${x - 2} ${y}Q${x} ${y} ${x} ${y - 2}z' fill='#fff'><animate attributeName='opacity' values='1;.1;1' dur='1.6s' begin='${d}s' repeatCount='indefinite'/></path>`).join(''),
    bubbles: [[6, 2.5, 0], [13, 3.5, .7], [18, 2, 1.3]].map(([x, r, d]) => `<circle cx='${x}' cy='24' r='${r}' fill='none' stroke='#7fe3ff' stroke-width='1'><animate attributeName='cy' values='26;-4' dur='2.4s' begin='${d}s' repeatCount='indefinite'/></circle>`).join(''),
    snow: [[5, 0], [11, .6], [17, 1.1], [8, 1.6], [20, .3]].map(([x, d]) => `<circle cx='${x}' cy='0' r='1.3' fill='#fff'><animate attributeName='cy' values='-2;26' dur='2.6s' begin='${d}s' repeatCount='indefinite'/></circle>`).join(''),
    sparkles: [[8, 8, 0, '#ffd166'], [16, 14, .6, '#ff9bd2'], [10, 17, 1.1, '#9be7ff']].map(([x, y, d, c]) => `<path d='M${x} ${y - 4}Q${x} ${y} ${x + 4} ${y}Q${x} ${y} ${x} ${y + 4}Q${x} ${y} ${x - 4} ${y}Q${x} ${y} ${x} ${y - 4}z' fill='${c}'><animate attributeName='opacity' values='0;1;0' dur='1.6s' begin='${d}s' repeatCount='indefinite'/></path>`).join(''),
    fireflies: [[6, 9, 0], [15, 6, .5], [12, 16, 1], [19, 14, 1.4]].map(([x, y, d]) => `<circle cx='${x}' cy='${y}' r='1.6' fill='#e4ff7a'><animate attributeName='opacity' values='.1;1;.1' dur='2s' begin='${d}s' repeatCount='indefinite'/><animate attributeName='cx' values='${x};${x + 2};${x}' dur='3s' repeatCount='indefinite'/></circle>`).join(''),
    rain: [[5, 0], [10, .3], [15, .6], [20, .15], [8, .45]].map(([x, d]) => `<path d='M${x} 0l-1 5' stroke='#8fc3ff' stroke-width='1.3' stroke-linecap='round'><animateTransform attributeName='transform' type='translate' values='0 -6;-3 26' dur='.8s' begin='${d}s' repeatCount='indefinite'/></path>`).join(''),
    leaves: [['#f2a541', 0, 6], ['#d9622b', .8, 14], ['#8fb339', 1.5, 19]].map(([c, d, x]) => `<ellipse cx='${x}' cy='0' rx='3' ry='1.6' fill='${c}'><animate attributeName='cy' values='-3;27' dur='2.8s' begin='${d}s' repeatCount='indefinite'/></ellipse>`).join(''),
    confetti: [['#ff6b9d', 5, 0], ['#7c5cff', 11, .5], ['#ffd166', 16, 1], ['#00c9c8', 20, .25]].map(([c, x, d]) => `<rect x='${x}' y='0' width='2.6' height='1.6' fill='${c}'><animate attributeName='y' values='-3;26' dur='2s' begin='${d}s' repeatCount='indefinite'/></rect>`).join(''),
    bokeh: [['#7c5cff', 8, 9, 5, 0], ['#00c9c8', 16, 15, 6, .8], ['#ff6b9d', 15, 6, 3.5, 1.4]].map(([c, x, y, r, d]) => `<circle cx='${x}' cy='${y}' r='${r}' fill='${c}' opacity='.4'><animate attributeName='opacity' values='.15;.6;.15' dur='3s' begin='${d}s' repeatCount='indefinite'/></circle>`).join(''),
    meteors: `<path d='M20 2l-9 9' stroke='#fff' stroke-width='1.5' stroke-linecap='round'><animateTransform attributeName='transform' type='translate' values='6 -6;-14 14' dur='1.4s' repeatCount='indefinite'/><animate attributeName='opacity' values='0;1;0' dur='1.4s' repeatCount='indefinite'/></path>`,
    ripples: [0, .7, 1.4].map(d => `<circle cx='12' cy='12' r='2' fill='none' stroke='#7fe3ff' stroke-width='1.2'><animate attributeName='r' values='1;10' dur='2.1s' begin='${d}s' repeatCount='indefinite'/><animate attributeName='opacity' values='1;0' dur='2.1s' begin='${d}s' repeatCount='indefinite'/></circle>`).join(''),
    petals: [['#ffc8dd', 6, 0], ['#ffffff', 13, .9], ['#ffafcc', 19, 1.6]].map(([c, x, d]) => `<ellipse cx='${x}' cy='0' rx='2.2' ry='1.3' fill='${c}'><animate attributeName='cy' values='-3;27' dur='3s' begin='${d}s' repeatCount='indefinite'/><animate attributeName='cx' values='${x};${x - 3};${x}' dur='3s' begin='${d}s' repeatCount='indefinite'/></ellipse>`).join(''),
    matrix: [[6, 0], [12, .5], [18, .25]].map(([x, d]) => `<path d='M${x} 0v4M${x} 7v3' stroke='#3dff6e' stroke-width='1.6'><animateTransform attributeName='transform' type='translate' values='0 -10;0 24' dur='1.6s' begin='${d}s' repeatCount='indefinite'/></path>`).join(''),
    fireworks: [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d='M12 12l0 -1' stroke='${['#ffd166', '#ff6b9d', '#7fe3ff', '#b69cff'][a / 45 % 4]}' stroke-width='1.6' stroke-linecap='round' transform='rotate(${a} 12 12)'><animate attributeName='d' values='M12 12l0 -1;M12 5l0 -2' dur='1.4s' repeatCount='indefinite'/><animate attributeName='opacity' values='1;0' dur='1.4s' repeatCount='indefinite'/></path>`).join(''),
    orbs: [['#7c5cff', 7, 0], ['#00c9c8', 15, .8], ['#ff6b9d', 11, 1.5]].map(([c, x, d]) => `<circle cx='${x}' cy='24' r='2.4' fill='${c}'><animate attributeName='cy' values='26;-3' dur='3s' begin='${d}s' repeatCount='indefinite'/><animate attributeName='opacity' values='0;1;0' dur='3s' begin='${d}s' repeatCount='indefinite'/></circle>`).join(''),
    aurora: [['#3dffb0', 9, 0], ['#7c5cff', 13, .7], ['#00c9c8', 17, 1.2]].map(([c, y, d]) => `<path d='M0 ${y}Q6 ${y - 4} 12 ${y}T24 ${y}' fill='none' stroke='${c}' stroke-width='2.4' opacity='.7'><animate attributeName='d' values='M0 ${y}Q6 ${y - 4} 12 ${y}T24 ${y};M0 ${y}Q6 ${y + 4} 12 ${y}T24 ${y};M0 ${y}Q6 ${y - 4} 12 ${y}T24 ${y}' dur='3s' begin='${d}s' repeatCount='indefinite'/></path>`).join('')
  };
  const icon = n => svgNode(SVG[n]);

  Object.assign(SVG, {
    user: `${GRAD}<circle cx='12' cy='8.5' r='3.8' ${ST}/><path d='M4.5 20a7.5 7.5 0 0 1 15 0' ${ST}/>`,
    back: `<path d='M15 5l-7 7 7 7' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/>`
  });

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

  /* ================= Background catalogue ================= */
  const fileBg = (name, size) => `url("${XURL('img/' + name + '.svg')}") 0 0/${size} repeat`;
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
    if (k === 'c' && CBG[a]) return CBG[a];
    if (k === 'p' && PATTERNS[a] && getPal(b, st)) return PATTERNS[a].f(getPal(b, st));
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

  /* ================= Message detection ================= */
  const SPECIFIC = '[jsname="bgckF"], .DTp27d';
  const GENERIC = '[data-message-id] div[dir="auto"], [role="listitem"] div[dir="auto"], [data-topic-id] div[dir="auto"]';
  const BOX = '[data-message-id],[data-topic-id],[role="listitem"],c-wiz[data-id]';
  /* Google's own floating UI (menus, tooltips, dialogs): never restyled, never made transparent */
  const POP = '[role="menu"],[role="menubar"],[role="menuitem"],[role="toolbar"],[role="dialog"],[role="alertdialog"],[role="listbox"],[role="option"],[role="tooltip"]';
  const POPUP = ':is([role="menu"],[role="dialog"],[role="alertdialog"],[role="listbox"],[role="tooltip"])';
  const EDITOR = '[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"],[role="textbox"]';
  const hueCache = new Map();
  const hueOf = s => { if (hueCache.has(s)) return hueCache.get(s); let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; const v = h % 360; hueCache.set(s, v); return v; };
  const nameIn = n => n && (n.getAttribute('data-member-id') || n.getAttribute('data-hovercard-id') || n.getAttribute('data-name') || '');
  function senderOf(m) {
    let box = m.closest(BOX);
    for (let i = 0; box && i < 20; i++) {
      const n = box.querySelector('[data-member-id],[data-hovercard-id],[data-name]');
      if (n) return nameIn(n);
      box = box.previousElementSibling;
    }
    return '';
  }
  let hasSpecific = false;
  function candidates(root) {
    const list = root.querySelectorAll(SPECIFIC);
    if (list.length) { hasSpecific = true; return list; }
    if (hasSpecific) return [];
    return [...root.querySelectorAll(GENERIC)].filter(e => !e.querySelector('div[dir="auto"]'));
  }
  const hasPaint = cs => !isTransparent(cs.backgroundColor) || (cs.backgroundImage && cs.backgroundImage !== 'none');
  /* Google draws its own bubble around the text: find it, so we restyle the real bubble instead of stacking a second one. */
  function bubbleOf(txt) {
    const box = txt.closest(BOX);
    for (let e = txt, i = 0; e && i < 7; e = e.parentElement, i++) {
      if (e === box && i > 0) break;
      if (e === document.body || e.matches('[role="list"],[role="main"]') || e.classList.contains('cs-clear')) break;
      if (e !== txt && e.querySelector('[data-cs-c]') && e.querySelectorAll('[data-cs-c]').length > 1) break;
      const cs = getComputedStyle(e);
      if (hasPaint(cs) && (parseFloat(cs.borderTopLeftRadius) || 0) + (parseFloat(cs.borderTopRightRadius) || 0) >= 8) return e;
    }
    return null;
  }
  let firstPass = true;
  function tagMessages(roots) {
    if (!IS_CHAT || !active()) return;
    const found = new Set();
    for (const r of roots) {
      if (!r || (r !== document && !r.isConnected)) continue;
      if (r.nodeType === 1) { const c = r.closest(SPECIFIC); if (c) found.add(c); }
      if (r.querySelectorAll) for (const m of candidates(r)) found.add(m);
    }
    const todo = [];
    for (const m of found) {
      if (m.hasAttribute('data-cs-c')) continue;
      if (m.closest(EDITOR + ',#cs-panel,.cs-root')) { m.setAttribute('data-cs-c', 'x'); continue; }
      if (m.parentElement && m.parentElement.closest('[data-cs-c]')) continue;
      if (!m.textContent.trim() && !m.querySelector('img')) continue; // not filled yet: picked up again when its text arrives
      todo.push(m);
    }
    if (!todo.length) { if (found.size) firstPass = false; return; }
    /* read everything first, then write: no forced re-layout per message */
    const plans = [];
    for (const m of todo) {
      const bub = bubbleOf(m), target = bub || m;
      if (target.classList.contains('cs-msg')) { plans.push({ m, skip: true }); continue; }
      plans.push({ m, bub, target, pos: !bub || getComputedStyle(bub).position !== 'static', sender: senderOf(m), box: m.closest(BOX) });
    }
    if (!firstPass && !calm() && R.enter !== 'none') {
      const vh = innerHeight;
      for (const p of plans) if (!p.skip) { const r = p.target.getBoundingClientRect(); p.anim = r.height > 0 && r.bottom > vh * .3 && r.top < vh; }
    }
    const fresh = [];
    for (const p of plans) {
      p.m.setAttribute('data-cs-c', '');
      if (p.skip) continue;
      const t = p.target;
      t.classList.add('cs-msg', p.bub ? 'cs-wrap' : 'cs-solo');
      if (p.pos) t.classList.add('cs-pos');
      p.m.classList.add('cs-txt');
      if (p.anim) { t.classList.add('cs-new'); setTimeout(() => t.classList.remove('cs-new'), 900); }
      if (p.sender) { t.style.setProperty('--cs-hue', hueOf(p.sender)); t.setAttribute('data-cs-hue', ''); t.dataset.csFrom = p.sender; }
      if (p.box && (p.box.querySelector('[data-is-self="true"],[data-is-own="true"]') || /\b(self|own|outgoing)\b/i.test(typeof p.box.className === 'string' ? p.box.className : ''))) t.classList.add('cs-self');
      // sender name + time line: readable on dark backgrounds too
      const nm = p.box && p.box.querySelector('[data-name],[data-hovercard-id],[data-member-id]');
      const meta = nm && nm.parentElement;
      if (meta && !meta.contains(t) && !t.contains(meta) && !meta.classList.contains('cs-meta')) {
        meta.classList.add('cs-meta'); if (p.sender) meta.style.setProperty('--cs-hue', hueOf(p.sender));
        for (const x of meta.querySelectorAll('*')) x.classList.add('cs-c');
      }
      visIO.observe(t);
      learnMine(p);
      if (p.box) for (const pop of p.box.querySelectorAll(POPUP)) if (!t.contains(pop)) raisePopup(pop);
      fresh.push(t);
    }
    firstPass = false;
    if (!fresh.length) return;
    for (const t of fresh) areaOf(t);
    scanInner(fresh);
    if (bgOn()) { const by = new Map(); for (const t of fresh) { const a = areaOf(t); if (a) (by.get(a) || by.set(a, []).get(a)).push(t); } by.forEach((list, a) => clearRows(list, a)); chipScan(fresh.map(t => t.closest(BOX))); }
    if (metaWanted()) scheduleMeta();
  }
  /* Inside a bubble: elements with their own paint keep Google's colors (mentions, chips, menus, popups);
     boxes outside the text (quotes, link cards) get readable text. Re-run when content loads late. */
  const doneEl = new WeakSet();   // elements with a final decision; others are looked at again later
  const bgLum = c => { const m = String(c).match(/[\d.]+/g); if (!m || m.length < 3) return 1; const a = m.length > 3 ? +m[3] : 1; if (a < .35) return -1; const [r, g, b] = m.slice(0, 3).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  function scanInner(bubs) {
    const W = [];
    const settle = d => { doneEl.add(d); for (const x of d.querySelectorAll('*')) doneEl.add(x); };
    for (const bub of bubs) {
      if (!bub || !bub.isConnected) continue;
      const txt = bub.classList.contains('cs-txt') ? bub : (bub.querySelector('.cs-txt') || bub);
      let abs = false;
      for (const d of bub.querySelectorAll('*')) {
        if (doneEl.has(d)) continue;
        if (d.classList.contains('cs-wa-meta') || d.closest('.cs-keep,.cs-wa-meta')) { settle(d); continue; }
        if (d.matches(POP) || d.querySelector(POP)) { W.push([d, 'keep']); settle(d); continue; }
        const tag = d.tagName;
        if (d.namespaceURI === SVGNS || tag === 'IMG' || tag === 'VIDEO' || tag === 'CANVAS') { doneEl.add(d); continue; }
        const inTxt = d !== txt && txt.contains(d);
        if (!d.hasAttribute('class') && !d.hasAttribute('style')) { if (inTxt) W.push([d, 'c']); doneEl.add(d); continue; }
        const cs = getComputedStyle(d);
        if (cs.position === 'fixed' || cs.position === 'absolute' || cs.position === 'sticky') { abs = true; W.push([d, 'keep']); settle(d); continue; }
        if (hasPaint(cs) && d !== txt && !d.contains(txt)) {
          if (inTxt || d.offsetWidth <= 30 || d.offsetHeight <= 18) W.push([d, 'keep']);          // mention chips, badges, inline code: Google's own colors
          else { const l = bgLum(cs.backgroundColor); W.push([d, 'box', l === -1 || l > .45 ? 'cs-light' : 'cs-dark']); } // quote / link card
          settle(d); continue;
        }
        if (inTxt) { W.push([d, 'c']); doneEl.add(d); }
        // classed, unpainted and outside the text: may get painted once its content loads, so it is checked again later
      }
      if (abs) W.push([bub, 'abs']);
      // an open Google popup inside (tooltip, menu, dialog, "who reacted" card): freeze the bubble so the popup is never moved or made see-through
      const hold = !!bub.querySelector(POPUP) || [...bub.querySelectorAll('.cs-keep')].some(isOpenPopup) || W.some(([d, k]) => k === 'keep' && bub.contains(d) && isOpenPopup(d));
      if (hold !== bub.classList.contains('cs-hold')) W.push([bub, hold ? 'hold' : 'unhold']);
    }
    for (const [d, k, x] of W) {
      if (k === 'keep') { d.classList.remove('cs-c', 'cs-box', 'cs-light', 'cs-dark'); d.classList.add('cs-keep'); }
      else if (k === 'c') d.classList.add('cs-c');
      else if (k === 'box') d.classList.add('cs-box', x);
      else if (k === 'hold') d.classList.add('cs-hold');
      else if (k === 'unhold') d.classList.remove('cs-hold');
      else d.setAttribute('data-cs-abs', '');
    }
  }
  function isOpenPopup(k) {
    if (!k.isConnected || k.offsetWidth < 40 || k.offsetHeight < 18) return false;
    const cs = getComputedStyle(k);
    return (cs.position === 'absolute' || cs.position === 'fixed') && cs.visibility !== 'hidden' && cs.display !== 'none' && hasPaint(cs);
  }
  /* Google's popups next to a message ("who reacted", tooltips, menus) are lifted above the bubbles: themed bubbles
     (glass, glow, animated) form their own layer and would otherwise cover a popup from the message before them */
  function raisePopup(e) {
    if (e.classList.contains('cs-ontop')) return;
    const z = getComputedStyle(e).zIndex;
    if (z === 'auto' || +z < 1000) e.classList.add('cs-ontop');
  }
  /* a floating card Google adds to the page (not a full-width bar or panel): keep it above the themed bubbles */
  function floatCard(e) {
    if (OWN(e) || e.closest('#cs-panel')) return;
    const list = e.matches(POPUP) ? [e] : [...e.querySelectorAll(POPUP)];
    if (isOpenPopup(e)) list.push(e);
    for (const x of list) { const r = x.getBoundingClientRect(); if (r.width < innerWidth * .7 && r.height < innerHeight * .7) raisePopup(x); }
  }
  function rescanVisible() { scanInner([...document.querySelectorAll('.cs-msg.cs-vis')]); }
  /* continuous effects run only on bubbles that are actually on screen */
  const visIO = new IntersectionObserver(es => { for (const e of es) e.target.classList.toggle('cs-vis', e.isIntersecting); }, { rootMargin: '80px' });
  function untagAll() {
    visIO.disconnect();
    document.querySelectorAll('.cs-wa-meta').forEach(e => e.remove());
    document.querySelectorAll('.cs-msg').forEach(m => {
      m.classList.remove('cs-msg', 'cs-new', 'cs-me', 'cs-them', 'cs-self', 'cs-first', 'cs-wrap', 'cs-solo', 'cs-pos', 'cs-rel', 'cs-vis', 'cs-hold');
      for (const a of ['data-cs-side', 'data-cs-edge', 'data-cs-hue', 'data-cs-from', 'data-cs-abs', 'data-cs-mine', 'data-cs-time']) m.removeAttribute(a);
      m.style.removeProperty('--cs-hue'); m.style.removeProperty('animation-delay');
    });
    document.querySelectorAll('.cs-box,.cs-txt,.cs-keep,.cs-c,.cs-meta').forEach(m => m.classList.remove('cs-box', 'cs-light', 'cs-dark', 'cs-txt', 'cs-keep', 'cs-c', 'cs-meta', 'cs-meta-me'));
    document.querySelectorAll('[data-cs-c]').forEach(m => m.removeAttribute('data-cs-c'));
    timeTries.clear();
  }

  /* ================= Who wrote it: learn "me" from the message you just sent ================= */
  let pendingSend = null;
  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  function noteSend(ed) {
    const t = norm(ed && (ed.innerText || ed.value || ''));
    if (t) pendingSend = { t: t.slice(0, 40), at: Date.now() };
  }
  if (IS_CHAT) {
    document.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
      const ed = e.target && e.target.closest && e.target.closest(EDITOR + ',textarea');
      if (ed && !ed.closest('#cs-panel')) noteSend(ed);
    }, true);
    document.addEventListener('click', e => {
      const b = e.target && e.target.closest && e.target.closest('[role="button"],button');
      if (!b || b.closest('#cs-panel,.cs-root') || !SEND.test(labelOf(b))) return;
      for (let x = b.parentElement, i = 0; x && i < 8; x = x.parentElement, i++) { const ed = x.querySelector(EDITOR + ',textarea'); if (ed) { noteSend(ed); break; } }
    }, true);
  }
  function learnMine(p) {
    if (!pendingSend || !p.sender || Date.now() - pendingSend.at > 20000) return;
    const t = norm(p.m.textContent);
    if (!t || !(t.startsWith(pendingSend.t.slice(0, 24)) || pendingSend.t.startsWith(t.slice(0, 24)))) return;
    pendingSend = null;
    const k = myAcctKey(), a = ACCTS[k] || { idx: ACCT_IDX, email: curEmail() || undefined, seen: Date.now() };
    if (a.me === p.sender) return;
    putAcct(k, { ...a, me: p.sender });
    document.querySelectorAll('.cs-msg[data-cs-side]').forEach(b => b.removeAttribute('data-cs-side'));
  }

  /* ================= WhatsApp layer: whose message, time, read ticks ================= */
  const isWA = (st = R) => isWAId(curTheme(st));
  const ticksOn = () => IS_CHAT && active() && R.ticks !== 'off' && (R.ticks === 'all' ? !!themeDef(curTheme()) : isWA());
  const metaWanted = () => IS_CHAT && active() && (ticksOn() || isWA());
  /* own messages: learned sender first, then Google's own markers, then where the bubble sits (Google puts yours on the other side) */
  function updateSides(a, bubs) {
    const ac = myAcct() || {};
    let mine = ac.me || '';
    if (!mine && ac.gaia) { const hit = bubs.find(b => (b.dataset.csFrom || '').endsWith('/' + ac.gaia) || b.dataset.csFrom === ac.gaia); if (hit) mine = hit.dataset.csFrom; }
    const need = bubs.filter(b => !b.hasAttribute('data-cs-side'));
    if (!need.length) return;
    const ar = a.getBoundingClientRect(); if (!ar.width) return;
    const rtl = getComputedStyle(a).direction === 'rtl';
    const reads = need.map(b => [b, b.getBoundingClientRect()]);
    for (const [b, r] of reads) {
      if (!r.width) continue;
      const startGap = rtl ? ar.right - r.right : r.left - ar.left, endGap = rtl ? r.left - ar.left : ar.right - r.right;
      const from = b.dataset.csFrom;
      const me = mine && from ? from === mine : b.classList.contains('cs-self') || endGap + 24 < startGap;
      b.setAttribute('data-cs-side', me ? 'me' : 'them');
      b.setAttribute('data-cs-edge', r.left - ar.left <= ar.right - r.right ? 'l' : 'r');
      b.classList.toggle('cs-me', me); b.classList.toggle('cs-them', !me);
      const box = b.closest(BOX), meta = box && box.querySelector('.cs-meta');
      if (meta) meta.classList.toggle('cs-meta-me', me);
    }
  }
  /* first bubble of a run from the same person gets the WhatsApp "tail" */
  function updateGroups(bubs) {
    let prev = null;
    for (const b of bubs) {
      const side = b.getAttribute('data-cs-side'), from = b.dataset.csFrom || '';
      const first = !prev || prev.side !== side || (!!from && !!prev.from && from !== prev.from);
      if (b.classList.contains('cs-first') !== first) b.classList.toggle('cs-first', first);
      prev = { side, from };
    }
  }
  const TIME_RE = /\b([01]?\d|2[0-3]):[0-5]\d\b/;
  const timeTries = new Map();
  function timeOf(b) {
    if (b.dataset.csTime) return b.dataset.csTime;
    const box = b.closest(BOX) || b.parentElement;
    let t = '';
    const ts = box && box.querySelector('[data-absolute-timestamp]');
    if (ts) { const d = new Date(+ts.getAttribute('data-absolute-timestamp')); if (!isNaN(d)) t = d.toTimeString().slice(0, 5); }
    if (!t && box) for (const e of box.querySelectorAll('*')) {
      if (b.contains(e) || e.closest('.cs-wa-meta')) continue;
      const src = [e.getAttribute('aria-label'), e.getAttribute('data-tooltip'), e.getAttribute('title'), e.children.length ? '' : e.textContent].join(' ');
      const m = src.match(TIME_RE); if (m) { t = m[0]; break; }
    }
    if (!t) { // consecutive messages: Google shows the time once per group, so reuse the group's time
      let prev = box && box.previousElementSibling;
      for (let i = 0; prev && i < 12; i++, prev = prev.previousElementSibling) { const pb = prev.querySelector('.cs-msg'); if (pb && pb.getAttribute('data-cs-side') === b.getAttribute('data-cs-side')) { const pt = timeOf(pb); if (pt) { t = pt; break; } } }
    }
    if (t) b.dataset.csTime = t;
    else { const n = (timeTries.get(b) || 0) + 1; timeTries.set(b, n); if (n > 3) b.dataset.csTime = ''; }
    return t;
  }
  /* Read receipts: only Google's own "seen by" marker counts, so the ticks turn blue only when the other side really saw the message */
  const SEEN_POS = /\bseen\b|\bread by\b|\bread receipt|\bviewed by\b|אישור קריאה|נצפ|נקרא(?:ה)?\s+(?:על[\s-]ידי|ע"י|ע״י)|ראה את|ראתה את|ראו את|צפה ב|צפתה ב|צפו ב|\bvisto\b|\bgelesen\b|\bvu par\b/i;
  const SEEN_NEG = /mark|סמן|סימון|unread|לא נקר|לא נצפ|not seen|typing|מקליד|כותב|כותבת/i;
  const SEEN_ATTRS = ['aria-label', 'data-tooltip', 'title', 'alt', 'data-tooltip-text'];
  const isSeenLabel = v => !!v && SEEN_POS.test(v) && !SEEN_NEG.test(v);
  function lastSeenMarker(a) {
    const els = a.querySelectorAll('[aria-label],[data-tooltip],[title],img[alt],[data-tooltip-text]');
    for (let i = els.length - 1; i >= 0; i--) {
      const e = els[i];
      if (!SEEN_ATTRS.some(at => isSeenLabel(e.getAttribute(at)))) continue;
      if (e.closest('.cs-txt,.cs-wa-meta,#cs-panel') || e.closest(EDITOR)) continue;
      return e;
    }
    return null;
  }
  /* Google Chat shows the other person's small round picture (or letter) next to the last message they have seen.
     It often has no "seen" text at all, so it is recognised by what it is: a small round avatar beside a message,
     not inside the text, the sender line, a button or a reaction. Checked from the newest message backwards. */
  const NOT_MARK = '.cs-txt,.cs-meta,.cs-wa-meta,[role="button"],button,[role="toolbar"],[role="menu"],[role="tooltip"],[role="dialog"],a[href],' + EDITOR;
  const TYPING = /typing|מקליד|מקלידה|כותב|כותבת|מקלידים/i;
  function avatarMark(el, br) {
    const r = el.getBoundingClientRect();
    if (r.width < 10 || r.width > 28 || Math.abs(r.width - r.height) > 3) return false;
    if (r.top + r.height / 2 < br.top + br.height * .5) return false; // the sender's picture sits at the top of a message, a read marker at its bottom
    if (el.closest(NOT_MARK)) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || +cs.opacity === 0) return false;
    const round = (parseFloat(cs.borderTopLeftRadius) || 0) >= r.width * .35 || (el.tagName === 'IMG' && el.parentElement && (parseFloat(getComputedStyle(el.parentElement).borderTopLeftRadius) || 0) >= r.width * .35);
    if (!round) return false;
    const pic = el.tagName === 'IMG' || (cs.backgroundImage && cs.backgroundImage !== 'none') || el.querySelector('img');
    const letter = !pic && hasPaint(cs) && el.textContent.trim().length <= 2 && el.children.length <= 1;
    if (!pic && !letter) return false;
    for (let x = el, i = 0; x && i < 4; x = x.parentElement, i++) if (TYPING.test((x.getAttribute && (x.getAttribute('aria-label') || x.getAttribute('data-tooltip'))) || '')) return false;
    return true;
  }
  function lastAvatarMarker(bubs) {
    for (let i = bubs.length - 1, n = 0; i >= 0 && n < 40; i--, n++) {
      const b = bubs[i], box = b.closest(BOX) || b.parentElement;
      if (!box) continue;
      const br = b.getBoundingClientRect();
      if (!br.height) continue;
      const zone = [box];
      for (let s = box.nextElementSibling, j = 0; s && j < 2; s = s.nextElementSibling, j++) { if (s.querySelector('.cs-msg,' + SPECIFIC)) break; zone.push(s); }
      for (let z = zone.length - 1; z >= 0; z--) {
        const list = [...zone[z].querySelectorAll('img,div,span')];
        for (let k = list.length - 1; k >= 0; k--) if (avatarMark(list[k], br)) return list[k];
      }
    }
    return null;
  }
  const SENDING = /sending|שולח|נשלחת|בשליחה|pending/i;
  const TICK = {
    sent: `<path d='M1.5 6.3l2.9 2.9L10.6 2' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/>`,
    two: `<path d='M1 6.3l2.9 2.9L10.1 2' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/><path d='M7.2 8.4l.8.8L14.2 2' fill='none' stroke='currentColor' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/>`,
    clock: `<circle cx='7' cy='5.5' r='4.6' fill='none' stroke='currentColor' stroke-width='1.2'/><path d='M7 3v2.7l1.8 1.1' fill='none' stroke='currentColor' stroke-width='1.2' stroke-linecap='round'/>`
  };
  function setMeta(b, state, t) {
    const host = b.classList.contains('cs-txt') ? b : (b.querySelector('.cs-txt') || b);
    let m = host.querySelector(':scope > .cs-wa-meta');
    const key = `${t}|${state}`;
    if (m && m.dataset.k === key) { if (m !== host.lastChild) host.appendChild(m); return; }
    if (!t && !state) { if (m) m.remove(); return; }
    const was = m ? (m.dataset.k || '').split('|')[1] : '';
    if (!m) m = el('span', { class: 'cs-wa-meta', 'aria-hidden': 'true' });
    m.textContent = '';
    m.dataset.k = key;
    if (t) m.append(el('span', { class: 'cs-wa-time' }, t));
    if (state) {
      const s = svgNode(state === 'sending' ? TICK.clock : state === 'sent' ? TICK.sent : TICK.two, state === 'sending' ? '0 0 14 11' : '0 0 16 11');
      s.setAttribute('class', 'cs-tick cs-tick-' + state + (was && was !== state && state === 'read' ? ' cs-tick-pop' : ''));
      m.append(s);
    }
    if (m !== host.lastChild) host.appendChild(m);
  }
  const MARK_SEL = 'img,[aria-label],[data-tooltip],[data-tooltip-text]';
  let metaT = 0, metaAgain = 0, metaLast = 0;
  function scheduleMeta(now) {
    clearTimeout(metaT);
    const wait = now ? 0 : Math.max(140, 450 - (Date.now() - metaLast)); // at most ~2 checks a second
    metaT = setTimeout(() => idle(() => { metaLast = Date.now(); updateMeta(); }, 300), wait);
  }
  function updateMeta() {
    const want = metaWanted(), showTicks = ticksOn();
    if (!showTicks && document.querySelector('.cs-wa-meta')) document.querySelectorAll('.cs-wa-meta').forEach(e => e.remove());
    if (!want) return;
    let sending = false;
    for (const a of liveAreas()) {
      const bubs = [...a.querySelectorAll('.cs-msg')];
      if (!bubs.length) continue;
      updateSides(a, bubs);
      updateGroups(bubs);
      if (!showTicks) continue;
      const byLabel = lastSeenMarker(a), byAvatar = lastAvatarMarker(bubs);
      const last = byLabel && byAvatar ? (byLabel.compareDocumentPosition(byAvatar) & Node.DOCUMENT_POSITION_FOLLOWING ? byAvatar : byLabel) : byLabel || byAvatar;
      for (const b of bubs) {
        const t = timeOf(b);
        if (b.getAttribute('data-cs-side') !== 'me') { setMeta(b, '', t); continue; }
        const box = b.closest(BOX) || b;
        let state = 'delivered';
        if (SENDING.test(box.getAttribute('aria-label') || '') || box.querySelector('[aria-busy="true"]')) { state = 'sending'; sending = true; }
        else if (last && (box.contains(last) || (b.compareDocumentPosition(last) & Node.DOCUMENT_POSITION_FOLLOWING))) state = 'read';
        setMeta(b, state, t);
      }
    }
    clearTimeout(metaAgain);
    if (sending) metaAgain = setTimeout(scheduleMeta, 1200); // Google clears "sending" without adding nodes
  }

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

  /* ================= Apply ================= */
  let dynStyle = null, panel = null, anchor = null, lastCSS = null;
  function ensureStyle() {
    if (!dynStyle || !dynStyle.isConnected) { dynStyle = document.createElement('style'); dynStyle.id = 'cs-dyn'; (document.head || H).append(dynStyle); lastCSS = null; }
    return dynStyle;
  }
  function setCSS(css) { const s = ensureStyle(); if (css !== lastCSS) { s.textContent = css; lastCSS = css; } }
  function applyAll(cascadeAnim) {
    if (!active()) { cleanup(); stopObs(); return; }
    if (IS_MAIL) { applyMail(); return; }
    if (tiny()) return; // hidden helper frame: wakes up if it is ever shown (resize)
    const id = curTheme(), d = themeDef(id);
    H.classList.toggle('cs-on', !!d);
    H.classList.toggle('cs-lite', !!G.lite);
    H.classList.toggle('cs-wa', isWAId(id));
    H.classList.toggle('cs-wadk', id === 'k:wadark');
    setCSS(buildCSS());
    if (!document.body) return;
    startObs();
    popupGuard.start();
    tagMessages([document]);
    applyBg();
    fxSync();
    if (metaWanted() || document.querySelector('.cs-wa-meta')) scheduleMeta(true);
    if (cascadeAnim) cascade();
  }
  function cleanup() {
    popupGuard.stop();
    H.classList.remove('cs-on', 'cs-bgmode', 'cs-bgdark', 'cs-wa', 'cs-wadk', 'cs-lite');
    if (dynStyle) { dynStyle.textContent = ''; lastCSS = ''; }
    clearBg(); untagAll(); fxStop();
    if (IS_MAIL) unMail();
  }
  function cascade() {
    if (calm() || R.enter === 'none') return;
    const vh = innerHeight; let i = 0;
    const list = [];
    for (const m of document.querySelectorAll('.cs-msg')) { const r = m.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh || !r.height) continue; list.push(m); if (list.length > 40) break; }
    for (const m of list) {
      const delay = i++ * 30;
      m.classList.remove('cs-new'); void m.offsetWidth;
      m.style.animationDelay = delay + 'ms';
      m.classList.add('cs-new');
      setTimeout(() => { m.classList.remove('cs-new'); m.style.removeProperty('animation-delay'); }, 800 + delay);
    }
  }

  /* ---------- chat areas (one per open chat window; Gmail can show several in one frame) ---------- */
  const areas = new Set();
  const isScroller = e => { const oy = getComputedStyle(e).overflowY; return (oy === 'auto' || oy === 'scroll') && e.clientHeight > 150; };
  function areaOf(node) {
    for (const a of areas) if (a.isConnected && a.contains(node)) return a;
    for (let e = node.parentElement; e && e !== document.body && e !== H; e = e.parentElement) {
      if (isScroller(e)) { areas.add(e); return e; }
    }
    return null;
  }
  function liveAreas() {
    for (const a of areas) if (!a.isConnected) areas.delete(a);
    if (!areas.size) { const m = document.querySelector('.cs-msg'); if (m) areaOf(m); }
    return [...areas];
  }
  /* the conversation column: header + messages + composer (also when a thread / details panel is open beside it),
     but never the app's navigation, search bar or the whole window */
  const SHELL = '[role="navigation"],[role="banner"],[role="search"],input[type="search"]';
  function paneOf(area) {
    let pane = area;
    const A = area.getBoundingClientRect();
    for (let e = area.parentElement; e && e !== H; e = e.parentElement) {
      if (e.id === 'cs-panel') break;
      const r = e.getBoundingClientRect();
      if (r.width > A.width * 1.1 + 12) {
        if (e === document.body && !IN_GMAIL) break;
        if (e.querySelector(SHELL)) break;
        if (!IN_GMAIL && r.width >= innerWidth * .97 && A.width < innerWidth * .75) break;
        if (r.height > Math.max(A.height * 2.5, innerHeight * 1.05)) break;
      }
      pane = e;
      if (e === document.body) break;
    }
    return pane;
  }
  const BG_PROPS = ['background', 'background-image', 'background-size', 'background-color', 'background-attachment', 'background-position'];
  function paintBg(target, d) {
    for (const p of BG_PROPS) target.style.removeProperty(p);
    if (d.img) {
      target.style.setProperty('background-image', d.img, 'important');
      target.style.setProperty('background-color', 'transparent', 'important');
      target.style.setProperty('background-size', 'cover', 'important');
    } else target.style.setProperty('background', d.css, 'important');
  }
  /* moving backgrounds: a separate layer that only slides (GPU), so the chat itself is never repainted */
  function setMover(pane, d) {
    const on = !!(d.img && d.move && R.bgMove && !calm());
    let mv = pane.querySelector(':scope > .cs-bgl');
    if (!on) { if (mv) mv.remove(); pane.classList.remove('cs-bg-move'); return; }
    const td = themeDef(curTheme());
    const bubblesMove = !!(td && td.v.amb && R.liveAnim); // animated bubbles over a sliding layer would re-composite every frame
    if (bubblesMove || getComputedStyle(pane).position === 'static') {   // slow, cheap background drift instead
      if (mv) mv.remove();
      pane.classList.add('cs-bg-move');
      pane.style.setProperty('background-size', '300% 300%', 'important');
      return;
    }
    pane.classList.remove('cs-bg-move');
    if (!mv) { mv = el('div', { class: 'cs-bgl', 'aria-hidden': 'true' }, el('div', { class: 'cs-bgl-in' })); pane.classList.add('cs-il-host'); pane.prepend(mv); }
    if (mv.firstChild.style.backgroundImage !== d.img) mv.firstChild.style.backgroundImage = d.img;
  }
  const isFloating = (e, cs) => cs.position === 'fixed' || e.matches(POP) || !!e.closest(POP);
  const inAny = (list, e) => list.some(a => a === e || a.contains(e));
  const holdsAny = (list, e) => list.some(a => e.contains(a));
  /* strips of the column (top bar, banners, composer bar) and side panels (thread, details): frosted, so the background
     shows through and text stays readable; wrappers that hold a message list become see-through */
  function stripScan(pane, list) {
    const pr = pane.getBoundingClientRect(), pw = pr.width, ph = pr.height;
    if (!pw) return;
    const aw = Math.max(...list.map(a => a.getBoundingClientRect().width), 1);
    const wide = Math.min(pw, aw) * .8;
    const q = [...pane.children]; let n = 0;
    const bars = [];
    while (q.length && n < 400) {
      const e = q.shift(); n++;
      if (inAny(list, e) || e.id === 'cs-panel' || e.classList.contains('cs-imglayer') || e.classList.contains('cs-bgl') || e.classList.contains('cs-fx') || e.closest('.cs-msg,.cs-root,.cs-keep')) continue;
      const r = e.getBoundingClientRect();
      const holds = holdsAny(list, e), panelish = r.width >= pw * .2 && r.height >= ph * .45;
      if (!holds && r.width < wide && !panelish) continue;
      const cs = getComputedStyle(e);
      if (isFloating(e, cs)) continue;
      if (hasPaint(cs) || paintedPseudo(e) || e.classList.contains('cs-bar') || e.classList.contains('cs-clear')) {
        if (!e.classList.contains('cs-clear') && !e.classList.contains('cs-bar')) { e.classList.add(holds ? 'cs-clear' : 'cs-bar'); if (!holds) bars.push(e); }
        if (!holds) continue;
      }
      if (holds || panelish || r.height < ph * .5) q.push(...e.children);
    }
    for (const b of bars) barText(b);
    composerScan(pane, list);
  }
  /* inside a frosted bar: what has its own colour keeps it; the rest can switch to light text over dark backgrounds */
  function barText(bar) {
    const list = bar.querySelectorAll('*'), W = [[bar, 'cs-bt']];
    let n = 0;
    for (const d of list) {
      if (++n > 250) break;
      if (d.closest('.cs-bkeep') || (d.namespaceURI === SVGNS && d.tagName !== 'svg')) continue;
      const cs = getComputedStyle(d);
      if (hasPaint(cs)) { const l = bgLum(cs.backgroundColor); W.push([d, 'cs-bkeep', l === -1 ? '' : l > .4 ? 'cs-bk-l' : 'cs-bk-d']); }
      else if (d.matches(EDITOR + ',input,textarea')) W.push([d, 'cs-bkeep', '']);
      else W.push([d, 'cs-bt']);
    }
    for (const [d, c, x] of W) if (c === 'cs-bkeep' || !d.closest('.cs-bkeep')) { d.classList.add(c); if (x) d.classList.add(x); }
  }
  /* ---------- the composer ----------
     Google draws the input area as: page-coloured surface layer(s)  >  tinted pill  >  editor.
     The surface may be a wrapper, a separate backdrop layer or a pseudo-element, so we go by colour:
     every layer painted in the column's original surface colour is made transparent; anything tinted
     (the pill, the + and send buttons) keeps its own look. */
  const surfaces = new WeakMap(); // pane -> original surface colour (measured before we paint)
  const rgbOf = c => { const m = String(c).match(/[\d.]+/g); return m && m.length >= 3 ? { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? +m[3] : 1 } : null; };
  const near = (c1, c2) => { const x = rgbOf(c1), y = rgbOf(c2); if (!x || !y || x.a < .5) return false; return Math.abs(x.r - y.r) + Math.abs(x.g - y.g) + Math.abs(x.b - y.b) <= 18; };
  function measureSurface(area) {
    for (let e = area; e && e !== H; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor, v = rgbOf(c);
      if (v && v.a >= .5) return c;
      if (e === document.body) break;
    }
    return 'rgb(255, 255, 255)';
  }
  const pseudoBg = e => { for (const ps of ['::before', '::after']) { const c = getComputedStyle(e, ps); if (c.content !== 'none' && c.content !== 'normal' && hasPaint(c)) return c.backgroundColor; } return null; };
  const paintedPseudo = e => !!pseudoBg(e);
  const isSurfaceLayer = (e, surf) => { const c = getComputedStyle(e).backgroundColor; if (near(c, surf)) return true; const p = pseudoBg(e); return !!p && near(p, surf); };
  function clearEl(e) { if (e.matches(POP) || e.closest(POP) || e.closest('.cs-keep')) return; e.classList.remove('cs-bar'); e.classList.add('cs-clear'); }
  function composerScan(pane, list) {
    const surf = surfaces.get(pane);
    const pw = pane.getBoundingClientRect().width;
    // seeds: the editor itself, and our own palette button (it sits in Google's toolbar inside the pill)
    for (const ed of pane.querySelectorAll('[contenteditable]:not([contenteditable="false"]), textarea, .cs-root')) {
      if (inAny(list, ed) || (ed.closest('#cs-panel') && !ed.classList.contains('cs-root'))) continue;
      if (ed.closest(POPUP)) continue;
      let pill = null;
      const cw = Math.min(pw, ...list.map(a => a.getBoundingClientRect().width).filter(Boolean));
      for (let e = ed.parentElement; e && e !== pane; e = e.parentElement) {
        if (holdsAny(list, e)) break;
        if (e.classList.contains('cs-clear')) continue;
        const cs = getComputedStyle(e);
        if (!hasPaint(cs) && !paintedPseudo(e) && !e.classList.contains('cs-bar')) continue;
        if (surf && (e.classList.contains('cs-bar') || isSurfaceLayer(e, surf))) { clearEl(e); if (e.getBoundingClientRect().width >= cw * .8 && !e.classList.contains('cs-cbar')) { e.classList.add('cs-cbar'); barText(e); } continue; }
        if (!pill) { if (e.getBoundingClientRect().width >= cw * .3) pill = e; continue; }
        if (!surf) clearEl(e);
      }
      if (!pill) for (let e = ed.parentElement; e && e !== pane; e = e.parentElement) { if (e.getBoundingClientRect().width >= cw * .3) { pill = e; break; } }
      if (pill) { pill.classList.add('cs-pill'); clearBehind(pane, list, pill, surf); }
    }
  }
  /* look at what is actually rendered around the pill (catches separate backdrop layers and floating layers) */
  function clearBehind(pane, list, pill, surf) {
    const pr = pill.getBoundingClientRect(), qr = pane.getBoundingClientRect(), pw = qr.width;
    if (!pr.width || !pr.height) return;
    const cx = pr.left + pr.width / 2;
    const pts = [[cx, pr.top - 8], [cx, pr.bottom + 8], [cx, Math.min(qr.bottom - 3, pr.bottom + 40)], [pr.left + 14, pr.top - 6], [pr.right - 14, pr.top - 6], [pr.left - 6, pr.top + pr.height / 2], [pr.right + 6, pr.top + pr.height / 2]];
    for (const [x, y] of pts) {
      if (y < qr.top || y > qr.bottom || x < qr.left || x > qr.right) continue;
      for (const e of document.elementsFromPoint(x, y)) {
        if (e === pane || e.contains(pane) || holdsAny(list, e)) break;
        if (e.matches(POP) || e.closest(POP) || e.closest('.cs-keep')) continue;   // a tooltip or menu that happens to be open
        if (!pane.contains(e)) { const r = e.getBoundingClientRect(); if (r.left < qr.left - 4 || r.right > qr.right + 4) continue; } // a floating layer drawn over the column
        if (inAny(list, e) || pill.contains(e) || e.closest('.cs-msg,#cs-panel,.cs-root,.cs-fx,.cs-imglayer,.cs-bgl') || e.classList.contains('cs-clear')) continue;
        const w = e.getBoundingClientRect().width;
        if (surf) { if (w >= pw * .25 && isSurfaceLayer(e, surf)) clearEl(e); }
        else if (w >= pr.width * 1.02 && (hasPaint(getComputedStyle(e)) || paintedPseudo(e))) clearEl(e);
      }
    }
  }
  /* small painted things next to a message (reaction chips, date chips): their text follows their own colour, so they stay readable on dark backgrounds */
  const chipDone = new WeakSet();
  function chipScan(boxes) {
    const W = [];
    for (const box of boxes) {
      if (!box || !box.isConnected) continue;
      let n = 0;
      for (const d of box.querySelectorAll('*')) {
        if (++n > 120) break;
        if (chipDone.has(d)) continue;
        if (d.closest('.cs-msg,.cs-meta,.cs-wa-meta') || d.namespaceURI === SVGNS || d.tagName === 'IMG') { chipDone.add(d); continue; }
        const cs = getComputedStyle(d);
        if (!hasPaint(cs) || cs.backgroundImage !== 'none') continue;
        chipDone.add(d);
        const l = bgLum(cs.backgroundColor);
        if (l !== -1 && d.offsetWidth < box.offsetWidth * .6) W.push([d, l > .4 ? 'cs-bk-l' : 'cs-bk-d']);
      }
    }
    for (const [d, c] of W) d.classList.add(c);
  }
  /* the wrappers between the column and the scroller, and the full-width rows around each message, are painted in
     Google's surface colour: those (and only those) are made see-through, so popups and menus keep their own look */
  function clearChain(area, pane) {
    const W = [];
    for (let e = area.parentElement; e && e !== pane && e !== H; e = e.parentElement) {
      if (e.classList.contains('cs-clear')) continue;
      if (hasPaint(getComputedStyle(e)) || paintedPseudo(e)) W.push(e);
    }
    W.forEach(clearEl);
  }
  const rowSeen = new WeakSet();
  const areaSurf = new WeakMap(); // scroller -> its column's original surface colour
  const surfOf = a => { if (!areaSurf.has(a)) areaSurf.set(a, measureSurface(a)); return areaSurf.get(a); };
  /* a layer counts as "page surface" when it is painted in the column's own colour (or plain white/near-white) */
  const surfaceish = (e, cs, surf) => { const c = cs.backgroundColor, v = rgbOf(c); if (near(c, surf) || (v && v.a >= .5 && v.r + v.g + v.b >= 735)) return true; const p = pseudoBg(e); return !!p && near(p, surf); };
  function clearRows(bubs, area) {
    const aw = area.clientWidth; if (!aw) return;
    const surf = surfOf(area), W = [];
    for (const b of bubs) for (let e = b.parentElement; e && e !== area && e !== H; e = e.parentElement) {
      if (rowSeen.has(e)) break; // the rest of this chain was already checked
      rowSeen.add(e);
      if (e.classList.contains('cs-msg') || e.classList.contains('cs-clear')) continue;
      const cs = getComputedStyle(e);
      if (cs.position === 'fixed' || cs.position === 'absolute') continue;
      if ((hasPaint(cs) || paintedPseudo(e)) && surfaceish(e, cs, surf) && e.getBoundingClientRect().width >= aw * .6) W.push(e);
    }
    W.forEach(clearEl);
  }
  /* wide blocks inside the scroller painted in the page colour that hold no message yet (loading area, history banners) */
  function areaScan(area) {
    const aw = area.clientWidth; if (!aw) return;
    const surf = surfOf(area);
    const q = [...area.children].map(e => [e, 0]); let n = 0;
    const W = [];
    while (q.length && n < 160) {
      const [e, depth] = q.shift(); n++;
      if (e.classList.contains('cs-msg') || e.classList.contains('cs-keep') || e.classList.contains('cs-imglayer') || e.matches(POP)) continue;
      const r = e.getBoundingClientRect();
      if (r.width < aw * .6) continue;
      const cs = getComputedStyle(e);
      if (cs.position === 'fixed' || cs.position === 'absolute') continue;
      if (!e.classList.contains('cs-clear') && (hasPaint(cs) || paintedPseudo(e)) && surfaceish(e, cs, surf)) W.push(e);
      if (depth < 3) for (const c of e.children) q.push([c, depth + 1]);
    }
    W.forEach(clearEl);
  }
  /* last check: sample the top and bottom edge of the column; any wide strip still painted in a solid page colour is frosted */
  function probeStrips(pane, list) {
    const pr = pane.getBoundingClientRect(); if (!pr.width || !pr.height) return;
    const hits = new Set();
    for (const area of list) {
      const ar = area.getBoundingClientRect(); if (!ar.width) continue;
      const ys = [pr.top + 3, pr.top + 26, pr.top + 54, ar.top - 4, ar.top - 22, ar.bottom + 6, pr.bottom - 6].filter(y => (y < ar.top || y > ar.bottom) && y > pr.top && y < pr.bottom);
      const xs = [ar.left + ar.width * .2, ar.left + ar.width * .5, ar.left + ar.width * .8];
      for (const y of ys) for (const x of xs) { const e = document.elementFromPoint(x, y); if (e && pane.contains(e)) hits.add(e); }
    }
    const W = [];
    for (let e of hits) {
      for (; e && e !== pane; e = e.parentElement) {
        if (inAny(list, e)) break;
        if (e.closest('.cs-msg,#cs-panel,.cs-root,.cs-keep,.cs-pill') || e.matches(POP) || e.closest(POP)) break;
        if (e.classList.contains('cs-bar') || e.classList.contains('cs-clear') || e.classList.contains('cs-bkeep')) continue;
        const r = e.getBoundingClientRect();
        if (r.width < Math.min(pr.width, ...list.map(a => a.getBoundingClientRect().width).filter(Boolean)) * .6) continue;
        const cs = getComputedStyle(e);
        if (cs.position === 'fixed') break;
        if (hasPaint(cs) || paintedPseudo(e)) W.push([e, holdsAny(list, e)]);
      }
    }
    for (const [e, holds] of W) { if (holds) clearEl(e); else { e.classList.add('cs-bar'); barText(e); } }
  }
  const panes = new Map(); // pane -> its chat areas (main list, thread panel …)
  function unpaint(pane) {
    const list = panes.get(pane) || [];
    pane.classList.remove('cs-chat-pane', 'cs-bg-move', 'cs-il-host');
    for (const p of BG_PROPS) pane.style.removeProperty(p);
    pane.querySelectorAll(':scope > .cs-bgl').forEach(e => e.remove());
    pane.querySelectorAll('.cs-bar,.cs-clear,.cs-cbar,.cs-pill,.cs-bt,.cs-bkeep,.cs-bk-l,.cs-bk-d').forEach(e => e.classList.remove('cs-bar', 'cs-clear', 'cs-cbar', 'cs-pill', 'cs-bt', 'cs-bkeep', 'cs-bk-l', 'cs-bk-d'));
    for (const a of list) a.classList.remove('cs-chat-bg');
    removeLayer(pane);
    panes.delete(pane);
  }
  function clearBg() {
    for (const p of [...panes.keys()]) unpaint(p);
    document.querySelectorAll('.cs-bar,.cs-clear,.cs-cbar,.cs-pill,.cs-bt,.cs-bkeep,.cs-bk-l,.cs-bk-d').forEach(e => e.classList.remove('cs-bar', 'cs-clear', 'cs-cbar', 'cs-pill', 'cs-bt', 'cs-bkeep', 'cs-bk-l', 'cs-bk-d'));
  }
  const bgOn = () => IS_CHAT && active() && R.scope === 'all';
  function applyBg() {
    if (!IS_CHAT || !active()) return;
    const on = R.scope === 'all';
    H.classList.toggle('cs-bgmode', on);
    if (!on) { if (panes.size || document.querySelector('.cs-clear,.cs-bar')) clearBg(); H.classList.remove('cs-bgdark'); return; }
    const d = bgDef(effBg(R));
    const want = new Map();
    for (const a of liveAreas()) { const pn = paneOf(a); (want.get(pn) || want.set(pn, []).get(pn)).push(a); }
    const same = (x, y) => x && y && x.length === y.length && x.every(a => y.includes(a));
    for (const p of [...panes.keys()]) if (!want.has(p) || !p.isConnected || !same(panes.get(p), want.get(p))) unpaint(p);
    H.classList.toggle('cs-bgdark', !!d.dark);
    for (const [pane, list] of want) {
      if (!surfaces.has(pane) && !pane.classList.contains('cs-chat-pane')) surfaces.set(pane, measureSurface(list[0]));
      for (const area of list) if (!areaSurf.has(area)) areaSurf.set(area, surfaces.get(pane) || measureSurface(area));
      panes.set(pane, list);
      pane.classList.add('cs-chat-pane');
      paintBg(pane, d);
      setMover(pane, d);
      for (const area of list) { area.classList.add('cs-chat-bg'); clearChain(area, pane); }
      stripScan(pane, list);
      for (const area of list) { const bubs = [...area.querySelectorAll('.cs-msg')]; clearRows(bubs, area); areaScan(area); chipScan(bubs.map(b => b.closest(BOX))); }
      probeStrips(pane, list);
      if (d.layer) setLayer(pane, list[0], d.layer); else removeLayer(pane);
    }
  }
  function needBg() {
    let n = 0;
    for (const [p, list] of panes) { if (!p.isConnected || list.some(a => !a.isConnected)) return true; n += list.length; }
    for (const Ly of layers.values()) if (!Ly.cv.isConnected) return true;
    let live = 0; for (const a of areas) if (a.isConnected) live++;
    return live !== n;
  }

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

  /* ---------- Gmail inbox mode ---------- */
  /* Gmail's layers are opaque: full-window layers become transparent, large panels (the mail list, the open mail) become frosted glass */
  function mailScan() {
    if (!document.body) return;
    const vw = innerWidth, vh = innerHeight;
    const q = [...document.body.children]; let n = 0;
    while (q.length && n < 700) {
      const e = q.shift(); n++;
      if (e.id === 'cs-panel' || e.classList.contains('cs-imglayer') || e.tagName === 'SCRIPT' || e.tagName === 'STYLE') continue;
      const r = e.getBoundingClientRect();
      if (r.width < vw * .25 || r.height < vh * .25) continue;
      if (e.classList.contains('cs-mglass')) continue;
      const cs = getComputedStyle(e);
      if (isFloating(e, cs)) continue;
      if (hasPaint(cs) || e.classList.contains('cs-mclear')) {
        if (r.width >= vw * .9 && r.height >= vh * .8) e.classList.add('cs-mclear');
        else { e.classList.add('cs-mglass'); continue; }
      }
      q.push(...e.children);
    }
  }
  function applyMail() {
    if (!document.body) return;
    H.classList.add('cs-mail');
    const d = bgDef(R.bg);
    paintBg(document.body, d);
    document.body.style.setProperty('background-attachment', 'fixed', 'important');
    if (d.layer) setLayer(document.body, document.body, d.layer); else removeLayer(document.body);
    H.classList.toggle('cs-mdark', !!d.dark);
    mailScan();
  }
  function unMail() {
    H.classList.remove('cs-mail', 'cs-mdark');
    if (document.body) for (const p of BG_PROPS) document.body.style.removeProperty(p);
    document.querySelectorAll('.cs-mclear,.cs-mglass').forEach(e => e.classList.remove('cs-mclear', 'cs-mglass'));
    removeLayer(document.body);
  }

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

  /* ================= Panel UI ================= */
  let query = '';
  const sec = (ic, txt) => el('div', { class: 'cs-sec' }, ic ? icon(ic) : null, txt);
  const seg = items => el('div', { class: 'cs-seg' }, items.map(([lbl, on, fn]) => el('button', { type: 'button', class: on ? 'cs-on' : '', onclick: fn }, lbl)));
  const sw = (lbl, desc, on, fn) => el('div', { class: 'cs-sw', onclick: fn }, el('span', null, lbl, desc ? el('small', null, desc) : null), el('div', { class: 'cs-tg' + (on ? ' cs-on' : '') }));
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
    return el('div', { class: 'cs-card' + (S.bg === id && S.scope === 'all' ? ' cs-sel' : ''), title: bgName(id), style: 'background:' + (d.css || d.img), onclick: () => update({ bg: id, scope: 'all' }) },
      el('span', { class: 'cs-lbl' }, bgName(id)));
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
        icon('sparkle'), el('b', null, 'כל הזכויות שמורות בס"ד: לשכת הרב'))
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
  function addImg(entry, data) {
    const put = {};
    if (data) put[IPFX + entry.id] = data;
    IMGIX = [entry, ...IMGIX.filter(x => x.id !== entry.id && !(entry.u && x.u === entry.u))];
    const gone = IMGIX.slice(MAX_IMGS); IMGIX = IMGIX.slice(0, MAX_IMGS);
    for (const g of gone) forgetImg(g.id);
    put[XKEY] = { _w: FID, x: IMGIX };
    try { store && store.set(put); } catch {}
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
      addImg({ id: newId(), t: 'd', th: makeThumb(c) }, c.toDataURL('image/jpeg', 0.9));
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
  const OWN_CLS = ['cs-root', 'cs-toast', 'cs-fx', 'cs-imglayer', 'cs-wa-meta', 'cs-bgl'];
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
    chrome.storage.onChanged.addListener((ch, areaName) => {
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
        if ((IS_TOP || IS_CHAT) && (!pageAcct || (IS_TOP && tick % 8 === 0))) { const before = meKey(), had = !!pageAcct; registerAccount(); if (meKey() !== before) { recompute(); applyAll(); } if (!had && pageAcct && panel) refreshPanel(); }
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
})();
