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

