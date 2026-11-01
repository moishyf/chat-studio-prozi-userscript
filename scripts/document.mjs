import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('original/v15.3/content.js','utf8');
const from=source.indexOf('const DEFAULTS = ')+17,to=source.indexOf('\n  /* everything',from);
const defaults=vm.runInNewContext('('+source.slice(from,to).trim().replace(/;$/,'')+')');
const groups=[
 ['עיצובים, חיפוש, מומלצים ומועדפים','עיצובים','themeDef, themeList, themeCard, toggleFav','cs6 / cs6prof','themes.js / ui.js','השוואת 1,177 הגדרות ומזהים: עבר; גלריה בדפדפן fixture'],
 ['שלושה צבעים אישיים','עיצובים → בנה בעצמך','getPal, builder','custom','themes.js / ui.js','מנוע המקור נשמר; בדיקת כל שילובי צבעי המשתמש לא בוצעה'],
 ['רקעים וגרפיקות','רקעים','bgDef, PATTERNS, CBG, applyBg','bg / scope','backgrounds.js / chat-background.js','688 הגדרות: עבר; גרפיקה עוברת ל־SVG DOM'],
 ['תמונות אישיות וחמש התאמות','רקעים → התמונות שלי','addImg, onFile, imgSource, drawFit, removeImg','cs7imgs / cs7i:','images.js / image-layers.js / ui.js','Canvas וטעינה עצלה הועברו; בדיקת quota עוברת ביחידה; Google חי ממתין'],
 ['מיגרציית תמונות ישנות','ברקע','migrateImages','cs5img / cs6img / cs7i:','images.js','קוד מקור הועבר; מיגרציה מהתוסף בפועל ממתינה'],
 ['חשבונות ופרופילים','הגדרות','readPageAccount, curEmail, viewFor, toggleOwn','cs6prof / cs6acct','accounts.js / runtime/accounts.js','בדיקות זיהוי לא ודאי וכתיבה לשני פרופילים: עבר; Google חי ממתין'],
 ['עיצוב כללי/אישי ושחזור פרופיל כבוי','הגדרות','applyPatch, meKey, recompute','DESIGN_KEYS / off','accounts.js / ui.js','היקף שדות המקור נשמר; fallback לפי u0 בוטל במכוון'],
 ['ListAccounts ותפריט Google','ברקע','parseList, parseChooser, scan','cs6acct / cs6acctdiag','runtime/accounts.js / account-menu.js','GM_xmlhttpRequest במקום worker; parsing נבדק; רשת Google אמיתית ממתינה'],
 ['סנכרון חלונות','ברקע','save, storage.onChanged','כל המפתחות','runtime/storage.js','GM records במקום Chrome storage; בדיקת שדות מקבילים: עבר'],
 ['WhatsApp צבעים, רצפים, זנבות ושולחים','עיצובים → WhatsApp','pickTheme, updateSides, updateGroups','theme / ticks / acct.me','themes.js / receipts.js','מנוע מקור נשמר; צבע עצמי: עבר ב־fixture'],
 ['שעה וסימוני שליחה/קריאה','הגדרות → שעה ווי','timeOf, lastSeenMarker, lastAvatarMarker, setMeta','ticks','receipts.js','לא מניחים שכל הודעה ישנה נקראה; קבוצות חיות ממתינות'],
 ['21 אפשרויות כניסה, ריחוף ואווירה','אפקטים → תנועה','ENTERS, HOVERS, FXDEF, fxSync','enter / hover / fx / fxDensity','options.js / effects.js','קטלוג נשמר; אפקטים לאורך זמן ממתינים'],
 ['צורה, צל, מסגרת ומרווחים','אפקטים → מראה','SHAPES, SHADOWS, BORDERS, SPACING','shape / shadow / border / spacing','options.js / theme-css.js','מנוע מקורי ללא צמצום'],
 ['גופן, גודל, משקל וטקסט','אפקטים → טקסט','FONTS, SIZES, WEIGHTS, TEXTFX','font / size / weight / textFx','options.js / theme-css.js','מנוע מקורי ללא צמצום'],
 ['יום/לילה ועיצוב לילה','הגדרות','nightNow, curTheme, isNight','autoNight / nightTheme','context-state.js / ui.js','תזמון המקור נשמר; מעבר שעה אמיתי ממתין'],
 ['מצב חסכוני והעדפת פחות תנועה','הגדרות → ביצועים','calm, cheapAnim, fxLoop','lite / liveAnim','effects.js / styles.css','קוד המקור והרחבת reduced motion לחלונית'],
 ['Chat עצמאי ו־Gmail','הגדרות → איפה פועל','active, applyAll, applyMail','onChat / inGmail / inMail','context-state.js / gmail.js','@match בשלושה מקורות; בדיקות Google חיות ממתינות'],
 ['מסגרות fallback','ברקע','IS_CHAT / IS_MAIL / IN_GMAIL','ללא','context-state.js','אין תחליף מוכח ל־match_origin_as_fallback; חסם שחרור'],
 ['כמה חלונות, שרשורים ומעבר שיחה','ברקע','liveAreas, panes, areaOf, run','DOM בלבד','chat-background.js / ui.js','לוגיקת המקור נשמרה; בדיקות Google ממתינות'],
 ['זיהוי הודעות חדשות וניקוי','ברקע','tagMessages, untagAll, cleanup','DOM בלבד','messages.js / apply.js','זיהוי 5 הודעות וכיבוי: עבר ב־fixture'],
 ['חלוניות צפות, תפריטים ותגובות','בריחוף/קליק','scanInner, floatCard, createPopupGuard','DOM בלבד','messages.js / runtime/popups.js','תיקון הוספה/נראות ושכבות אבות; ראו TEST_REPORT'],
 ['שיתוף עיצוב','הגדרות → שיתוף','copyCode, loadCode','CS5 / CS6','ui.js','פורמט המקור נשמר; נוספה בדיקת תקינות'],
 ['גיבוי מלא וייבוא','הגדרות → גיבוי','exportBackup, validateBackup, backupControls','סכמה 1','runtime/backup.js','תוספת; בדיקות קלט זדוני/חסר עברו'],
 ['איפוס והפתעה','ראש חלונית / הגדרות','resetAll, surprise','cs6 / cs6prof','ui.js','התנהגות המקור נשמרה'],
 ['עברית, אנגלית ונגישות','ראש חלונית / הגדרות','TXT, L, sw, el','lang','i18n.js / helpers.js / ui.js','ארבע לשוניות נשמרו; מתגים/כרטיסים נגישים במקלדת'],
 ['עדכוני סקריפט','Tampermonkey','metadata / release workflow','version','scripts/build.mjs','מטא תואם: עבר; עדכון אמיתי ממתין'],
];
let out='# מיפוי יכולות V15.3 → Userscript\n\nהסטטוס ״הועבר״ מציין קוד קיים; אינו אישור בדיקת Google חיה. תלות Chrome באחסון הוחלפה במתאם GM, משאבים הוחלפו ב־SVG DOM ובקשות worker ב־GM_xmlhttpRequest.\n\n| יכולת | מיקום | פונקציות מקור/המרה | מידע | מימוש | השוואה ובדיקה |\n|---|---|---|---|---|---|\n';
for(const row of groups)out+='| '+row.join(' | ')+' |\n';
out+='\n## כל שדות ההגדרות המקוריים\n\nכל שדה להלן נשמר עם אותה ברירת מחדל. DESIGN_KEYS נשמר ללא הרחבת היקף אישי.\n\n| שדה | ברירת מחדל |\n|---|---|\n';
for(const [k,v]of Object.entries(defaults))out+='| `'+k+'` | `'+JSON.stringify(v)+'` |\n';
out+='\n## אינדקס פונקציות מקור\n\n';
for(const match of source.matchAll(/^  (?:async )?function (\w+)\(/gm))out+='- `'+match[1]+'` — שורה '+(source.slice(0,match.index).split('\n').length)+' ב־original/v15.3/content.js.\n';
fs.writeFileSync('FEATURE_MATRIX.md',out);
fs.mkdirSync('website/docs',{recursive:true});fs.mkdirSync('website/images',{recursive:true});
for(const file of fs.readdirSync('docs'))if(file.endsWith('.md'))fs.copyFileSync('docs/'+file,'website/docs/'+file);
for(const file of ['FEATURE_MATRIX.md','CHANGELOG.md','TEST_REPORT.md'])if(fs.existsSync(file))fs.copyFileSync(file,'website/docs/'+file);
for(const file of fs.readdirSync('docs/images'))fs.copyFileSync('docs/images/'+file,'website/images/'+file);
console.log('Feature matrix and website documentation synchronized.');
