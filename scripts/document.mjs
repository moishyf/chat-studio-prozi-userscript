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
fs.cpSync('docs/original','website/docs/original',{recursive:true});
for(const file of fs.readdirSync('docs'))if(file.endsWith('.md'))fs.copyFileSync('docs/'+file,'website/docs/'+file);
for(const file of ['FEATURE_MATRIX.md','CHANGELOG.md','TEST_REPORT.md'])if(fs.existsSync(file))fs.copyFileSync(file,'website/docs/'+file);
for(const file of fs.readdirSync('docs/images'))fs.copyFileSync('docs/images/'+file,'website/images/'+file);
// Publish readable static guide pages as well as the editable Markdown sources.
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const inline=s=>escape(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,url)=>{
 if(!/^(https?:\/\/|[\w./#-])/.test(url))return label;
 if(url.startsWith('docs/'))url='https://github.com/moishyf/chat-studio-prozi-userscript/blob/main/'+url;
 else if(url.endsWith('.md')&&!url.startsWith('http'))url=url.replace(/\.md$/,'.html');
 return `<a href="${url}">${label}</a>`;
}).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
for(const file of fs.readdirSync('website/docs').filter(f=>f.endsWith('.md'))){
 const lines=fs.readFileSync('website/docs/'+file,'utf8').split(/\r?\n/);let body='',list=false,code=false,table=false;
 const close=()=>{if(list){body+='</ul>';list=false;}if(table){body+='</tbody></table></div>';table=false;}};
 for(const line of lines){
  if(line.startsWith('```')){close();body+=code?'</code></pre>':'<pre dir="ltr"><code>';code=!code;continue;}
  if(code){body+=escape(line)+'\n';continue;}
  if(line.startsWith('|')){if(!table){close();body+='<div class="doc-table"><table><tbody>';table=true;}if(/^\|[\s:|-]+\|$/.test(line))continue;body+='<tr>'+line.split('|').slice(1,-1).map(v=>'<td>'+inline(v.trim())+'</td>').join('')+'</tr>';continue;}
  if(/^[-*] |^\d+\. /.test(line)){if(!list){close();body+='<ul>';list=true;}body+='<li>'+inline(line.replace(/^[-*] |^\d+\. /,''))+'</li>';continue;}
  close();const heading=line.match(/^(#{1,4}) (.+)/);
  if(heading)body+=`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;
  else if(line.trim())body+='<p>'+inline(line)+'</p>';
 }close();
 const title=lines.find(l=>l.startsWith('# '))?.slice(2)||file;
 fs.writeFileSync('website/docs/'+file.replace(/\.md$/,'.html'),`<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · Chat Studio</title><link rel="stylesheet" href="../site.css"><style>article{max-width:900px;margin:50px auto;padding:0 24px 80px}article h1{font-size:42px;letter-spacing:-1px}article h2{margin-top:40px}article a{color:#6842bd;text-decoration:underline}article code{direction:ltr;unicode-bidi:embed;background:#eee9f6;padding:2px 5px;border-radius:5px}pre{overflow:auto;background:#eee9f6;padding:20px;border-radius:14px}pre code{padding:0}.doc-table{overflow:auto}td{border-bottom:1px solid #ddd3e8;padding:10px;vertical-align:top}tr:first-child{font-weight:bold}li{margin:9px 0}</style></head><body><nav><a class="brand" href="../index.html">✦ Chat Studio</a><a href="${file}">קובץ Markdown ↗</a></nav><article>${body}</article></body></html>`);
}
console.log('Feature matrix and website documentation synchronized.');
