# מיפוי יכולות V15.3 → Userscript

הסטטוס ״הועבר״ מציין קוד קיים; אינו אישור בדיקת Google חיה. תלות Chrome באחסון הוחלפה במתאם GM, משאבים הוחלפו ב־SVG DOM ובקשות worker ב־GM_xmlhttpRequest.

| יכולת | מיקום | פונקציות מקור/המרה | מידע | מימוש | השוואה ובדיקה |
|---|---|---|---|---|---|
| עיצובים, חיפוש, מומלצים ומועדפים | עיצובים | themeDef, themeList, themeCard, toggleFav | cs6 / cs6prof | themes.js / ui.js | השוואת 1,177 הגדרות ומזהים: עבר; גלריה בדפדפן fixture |
| שלושה צבעים אישיים | עיצובים → בנה בעצמך | getPal, builder | custom | themes.js / ui.js | מנוע המקור נשמר; בדיקת כל שילובי צבעי המשתמש לא בוצעה |
| רקעים וגרפיקות | רקעים | bgDef, PATTERNS, CBG, applyBg | bg / scope | backgrounds.js / chat-background.js | 688 הגדרות: עבר; גרפיקה עוברת ל־SVG DOM |
| תמונות אישיות וחמש התאמות | רקעים → התמונות שלי | addImg, onFile, imgSource, drawFit, removeImg | cs7imgs / cs7i: | images.js / image-layers.js / ui.js | Canvas וטעינה עצלה הועברו; בדיקת quota עוברת ביחידה; Google חי ממתין |
| מיגרציית תמונות ישנות | ברקע | migrateImages | cs5img / cs6img / cs7i: | images.js | קוד מקור הועבר; מיגרציה מהתוסף בפועל ממתינה |
| חשבונות ופרופילים | הגדרות | readPageAccount, curEmail, viewFor, toggleOwn | cs6prof / cs6acct | accounts.js / runtime/accounts.js | בדיקות זיהוי לא ודאי וכתיבה לשני פרופילים: עבר; Google חי ממתין |
| עיצוב כללי/אישי ושחזור פרופיל כבוי | הגדרות | applyPatch, meKey, recompute | DESIGN_KEYS / off | accounts.js / ui.js | היקף שדות המקור נשמר; fallback לפי u0 בוטל במכוון |
| ListAccounts ותפריט Google | ברקע | parseList, parseChooser, scan | cs6acct / cs6acctdiag | runtime/accounts.js / account-menu.js | GM_xmlhttpRequest במקום worker; parsing נבדק; רשת Google אמיתית ממתינה |
| סנכרון חלונות | ברקע | save, storage.onChanged | כל המפתחות | runtime/storage.js | GM records במקום Chrome storage; בדיקת שדות מקבילים: עבר |
| WhatsApp צבעים, רצפים, זנבות ושולחים | עיצובים → WhatsApp | pickTheme, updateSides, updateGroups | theme / ticks / acct.me | themes.js / receipts.js | מנוע מקור נשמר; צבע עצמי: עבר ב־fixture |
| שעה וסימוני שליחה/קריאה | הגדרות → שעה ווי | timeOf, lastSeenMarker, lastAvatarMarker, setMeta | ticks | receipts.js | לא מניחים שכל הודעה ישנה נקראה; קבוצות חיות ממתינות |
| 21 אפשרויות כניסה, ריחוף ואווירה | אפקטים → תנועה | ENTERS, HOVERS, FXDEF, fxSync | enter / hover / fx / fxDensity | options.js / effects.js | קטלוג נשמר; אפקטים לאורך זמן ממתינים |
| צורה, צל, מסגרת ומרווחים | אפקטים → מראה | SHAPES, SHADOWS, BORDERS, SPACING | shape / shadow / border / spacing | options.js / theme-css.js | מנוע מקורי ללא צמצום |
| גופן, גודל, משקל וטקסט | אפקטים → טקסט | FONTS, SIZES, WEIGHTS, TEXTFX | font / size / weight / textFx | options.js / theme-css.js | מנוע מקורי ללא צמצום |
| יום/לילה ועיצוב לילה | הגדרות | nightNow, curTheme, isNight | autoNight / nightTheme | context-state.js / ui.js | תזמון המקור נשמר; מעבר שעה אמיתי ממתין |
| מצב חסכוני והעדפת פחות תנועה | הגדרות → ביצועים | calm, cheapAnim, fxLoop | lite / liveAnim | effects.js / styles.css | קוד המקור והרחבת reduced motion לחלונית |
| Chat עצמאי ו־Gmail | הגדרות → איפה פועל | active, applyAll, applyMail | onChat / inGmail / inMail | context-state.js / gmail.js | @match בשלושה מקורות; בדיקות Google חיות ממתינות |
| מסגרות fallback | ברקע | IS_CHAT / IS_MAIL / IN_GMAIL | ללא | context-state.js | אין תחליף מוכח ל־match_origin_as_fallback; חסם שחרור |
| כמה חלונות, שרשורים ומעבר שיחה | ברקע | liveAreas, panes, areaOf, run | DOM בלבד | chat-background.js / ui.js | לוגיקת המקור נשמרה; בדיקות Google ממתינות |
| זיהוי הודעות חדשות וניקוי | ברקע | tagMessages, untagAll, cleanup | DOM בלבד | messages.js / apply.js | זיהוי 5 הודעות וכיבוי: עבר ב־fixture |
| חלוניות צפות, תפריטים ותגובות | בריחוף/קליק | scanInner, floatCard, createPopupGuard | DOM בלבד | messages.js / runtime/popups.js | תיקון הוספה/נראות ושכבות אבות; ראו TEST_REPORT |
| שיתוף עיצוב | הגדרות → שיתוף | copyCode, loadCode | CS5 / CS6 | ui.js | פורמט המקור נשמר; נוספה בדיקת תקינות |
| גיבוי מלא וייבוא | הגדרות → גיבוי | exportBackup, validateBackup, backupControls | סכמה 1 | runtime/backup.js | תוספת; בדיקות קלט זדוני/חסר עברו |
| איפוס והפתעה | ראש חלונית / הגדרות | resetAll, surprise | cs6 / cs6prof | ui.js | התנהגות המקור נשמרה |
| עברית, אנגלית ונגישות | ראש חלונית / הגדרות | TXT, L, sw, el | lang | i18n.js / helpers.js / ui.js | ארבע לשוניות נשמרו; מתגים/כרטיסים נגישים במקלדת |
| עדכוני סקריפט | Tampermonkey | metadata / release workflow | version | scripts/build.mjs | מטא תואם: עבר; עדכון אמיתי ממתין |

## כל שדות ההגדרות המקוריים

כל שדה להלן נשמר עם אותה ברירת מחדל. DESIGN_KEYS נשמר ללא הרחבת היקף אישי.

| שדה | ברירת מחדל |
|---|---|
| `theme` | `"k:modern"` |
| `nightTheme` | `"k:night"` |
| `autoNight` | `false` |
| `scope` | `"messages"` |
| `bg` | `"c:whatsapp"` |
| `bgMove` | `true` |
| `bgOpacity` | `85` |
| `bgTone` | `"light"` |
| `lang` | `"he"` |
| `uniq` | `"stripe"` |
| `enter` | `"pop"` |
| `hover` | `"lift"` |
| `fx` | `"none"` |
| `fxDensity` | `50` |
| `shape` | `"auto"` |
| `font` | `"auto"` |
| `size` | `"m"` |
| `spacing` | `"m"` |
| `shadow` | `"theme"` |
| `textFx` | `"none"` |
| `weight` | `"auto"` |
| `border` | `"theme"` |
| `custom` | `{"a":"#7c5cff","b":"#00c9c8","c":"#ffd166"}` |
| `favs` | `[]` |
| `lite` | `false` |
| `liveAnim` | `true` |
| `bgFit` | `"contain"` |
| `ticks` | `"wa"` |
| `inGmail` | `true` |
| `onChat` | `true` |
| `inMail` | `false` |
| `tab` | `"themes"` |
| `cat` | `"top"` |
| `bgCat` | `"classic"` |
| `fxSub` | `"motion"` |
| `_v` | `15` |

## אינדקס פונקציות מקור

- `save` — שורה 53 ב־original/v15.3/content.js.
- `readFrameEmail` — שורה 75 ב־original/v15.3/content.js.
- `readPageAccount` — שורה 88 ב־original/v15.3/content.js.
- `curEmail` — שורה 103 ב־original/v15.3/content.js.
- `meKey` — שורה 113 ב־original/v15.3/content.js.
- `putAcct` — שורה 124 ב־original/v15.3/content.js.
- `fetchAccounts` — שורה 139 ב־original/v15.3/content.js.
- `registerAccount` — שורה 149 ב־original/v15.3/content.js.
- `viewFor` — שורה 165 ב־original/v15.3/content.js.
- `recompute` — שורה 173 ב־original/v15.3/content.js.
- `el` — שורה 186 ב־original/v15.3/content.js.
- `svgNode` — שורה 204 ב־original/v15.3/content.js.
- `themeDef` — שורה 449 ב־original/v15.3/content.js.
- `themeName` — שורה 460 ב־original/v15.3/content.js.
- `bgDef` — שורה 594 ב־original/v15.3/content.js.
- `bgName` — שורה 604 ב־original/v15.3/content.js.
- `imgSource` — שורה 623 ב־original/v15.3/content.js.
- `drawCover` — שורה 638 ב־original/v15.3/content.js.
- `blurFill` — שורה 644 ב־original/v15.3/content.js.
- `drawFit` — שורה 648 ב־original/v15.3/content.js.
- `makeThumb` — שורה 662 ב־original/v15.3/content.js.
- `thumb` — שורה 667 ב־original/v15.3/content.js.
- `migrateImages` — שורה 676 ב־original/v15.3/content.js.
- `senderOf` — שורה 704 ב־original/v15.3/content.js.
- `candidates` — שורה 714 ב־original/v15.3/content.js.
- `bubbleOf` — שורה 722 ב־original/v15.3/content.js.
- `tagMessages` — שורה 734 ב־original/v15.3/content.js.
- `scanInner` — שורה 796 ב־original/v15.3/content.js.
- `isOpenPopup` — שורה 835 ב־original/v15.3/content.js.
- `raisePopup` — שורה 842 ב־original/v15.3/content.js.
- `floatCard` — שורה 848 ב־original/v15.3/content.js.
- `rescanVisible` — שורה 854 ב־original/v15.3/content.js.
- `untagAll` — שורה 857 ב־original/v15.3/content.js.
- `noteSend` — שורה 873 ב־original/v15.3/content.js.
- `learnMine` — שורה 889 ב־original/v15.3/content.js.
- `updateSides` — שורה 905 ב־original/v15.3/content.js.
- `updateGroups` — שורה 927 ב־original/v15.3/content.js.
- `timeOf` — שורה 938 ב־original/v15.3/content.js.
- `lastSeenMarker` — שורה 962 ב־original/v15.3/content.js.
- `avatarMark` — שורה 977 ב־original/v15.3/content.js.
- `lastAvatarMarker` — שורה 992 ב־original/v15.3/content.js.
- `setMeta` — שורה 1013 ב־original/v15.3/content.js.
- `scheduleMeta` — שורה 1033 ב־original/v15.3/content.js.
- `updateMeta` — שורה 1038 ב־original/v15.3/content.js.
- `msgDecls` — שורה 1066 ב־original/v15.3/content.js.
- `buildCSS` — שורה 1083 ב־original/v15.3/content.js.
- `ensureStyle` — שורה 1117 ב־original/v15.3/content.js.
- `setCSS` — שורה 1121 ב־original/v15.3/content.js.
- `applyAll` — שורה 1122 ב־original/v15.3/content.js.
- `cleanup` — שורה 1140 ב־original/v15.3/content.js.
- `cascade` — שורה 1146 ב־original/v15.3/content.js.
- `areaOf` — שורה 1163 ב־original/v15.3/content.js.
- `liveAreas` — שורה 1170 ב־original/v15.3/content.js.
- `paneOf` — שורה 1178 ב־original/v15.3/content.js.
- `paintBg` — שורה 1196 ב־original/v15.3/content.js.
- `setMover` — שורה 1205 ב־original/v15.3/content.js.
- `stripScan` — שורה 1226 ב־original/v15.3/content.js.
- `barText` — שורה 1251 ב־original/v15.3/content.js.
- `measureSurface` — שורה 1272 ב־original/v15.3/content.js.
- `clearEl` — שורה 1283 ב־original/v15.3/content.js.
- `composerScan` — שורה 1284 ב־original/v15.3/content.js.
- `clearBehind` — שורה 1307 ב־original/v15.3/content.js.
- `chipScan` — שורה 1327 ב־original/v15.3/content.js.
- `clearChain` — שורה 1347 ב־original/v15.3/content.js.
- `clearRows` — שורה 1360 ב־original/v15.3/content.js.
- `areaScan` — שורה 1374 ב־original/v15.3/content.js.
- `probeStrips` — שורה 1392 ב־original/v15.3/content.js.
- `unpaint` — שורה 1417 ב־original/v15.3/content.js.
- `clearBg` — שורה 1427 ב־original/v15.3/content.js.
- `applyBg` — שורה 1432 ב־original/v15.3/content.js.
- `needBg` — שורה 1457 ב־original/v15.3/content.js.
- `removeLayer` — שורה 1467 ב־original/v15.3/content.js.
- `setLayer` — שורה 1468 ב־original/v15.3/content.js.
- `drawLayers` — שורה 1482 ב־original/v15.3/content.js.
- `drawLayer` — שורה 1483 ב־original/v15.3/content.js.
- `mailScan` — שורה 1505 ב־original/v15.3/content.js.
- `applyMail` — שורה 1524 ב־original/v15.3/content.js.
- `unMail` — שורה 1534 ב־original/v15.3/content.js.
- `star4` — שורה 1543 ב־original/v15.3/content.js.
- `fxSync` — שורה 1595 ב־original/v15.3/content.js.
- `fxStop` — שורה 1615 ב־original/v15.3/content.js.
- `fxRect` — שורה 1619 ב־original/v15.3/content.js.
- `fxLoop` — שורה 1627 ב־original/v15.3/content.js.
- `pickTheme` — שורה 1657 ב־original/v15.3/content.js.
- `toggleFav` — שורה 1663 ב־original/v15.3/content.js.
- `themeCard` — שורה 1666 ב־original/v15.3/content.js.
- `themeList` — שורה 1684 ב־original/v15.3/content.js.
- `renderThemeGrid` — שורה 1694 ב־original/v15.3/content.js.
- `builder` — שורה 1701 ב־original/v15.3/content.js.
- `tabThemes` — שורה 1709 ב־original/v15.3/content.js.
- `bgCard` — שורה 1725 ב־original/v15.3/content.js.
- `tabBg` — שורה 1730 ב־original/v15.3/content.js.
- `tabFx` — שורה 1770 ב־original/v15.3/content.js.
- `curAcctInfo` — שורה 1801 ב־original/v15.3/content.js.
- `toggleOwn` — שורה 1813 ב־original/v15.3/content.js.
- `acctSection` — שורה 1818 ב־original/v15.3/content.js.
- `editBar` — שורה 1830 ב־original/v15.3/content.js.
- `tabSet` — שורה 1837 ב־original/v15.3/content.js.
- `resetAll` — שורה 1870 ב־original/v15.3/content.js.
- `buildPanel` — שורה 1875 ב־original/v15.3/content.js.
- `applyPatch` — שורה 1914 ב־original/v15.3/content.js.
- `setUI` — שורה 1924 ב־original/v15.3/content.js.
- `update` — שורה 1925 ב־original/v15.3/content.js.
- `quiet` — שורה 1932 ב־original/v15.3/content.js.
- `surprise` — שורה 1934 ב־original/v15.3/content.js.
- `addImg` — שורה 1946 ב־original/v15.3/content.js.
- `forgetImg` — שורה 1958 ב־original/v15.3/content.js.
- `removeImg` — שורה 1965 ב־original/v15.3/content.js.
- `applyUrl` — שורה 1972 ב־original/v15.3/content.js.
- `onFile` — שורה 1977 ב־original/v15.3/content.js.
- `copyCode` — שורה 1992 ב־original/v15.3/content.js.
- `loadCode` — שורה 2000 ב־original/v15.3/content.js.
- `toast` — שורה 2011 ב־original/v15.3/content.js.
- `openPanel` — שורה 2017 ב־original/v15.3/content.js.
- `closePanel` — שורה 2034 ב־original/v15.3/content.js.
- `makeBtn` — שורה 2039 ב־original/v15.3/content.js.
- `injectButtons` — שורה 2066 ב־original/v15.3/content.js.
- `ensureFab` — שורה 2103 ב־original/v15.3/content.js.
- `run` — שורה 2116 ב־original/v15.3/content.js.
- `startObs` — שורה 2154 ב־original/v15.3/content.js.
- `stopObs` — שורה 2155 ב־original/v15.3/content.js.
- `boot` — שורה 2193 ב־original/v15.3/content.js.
