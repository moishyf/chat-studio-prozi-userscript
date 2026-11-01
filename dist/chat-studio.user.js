// ==UserScript==
// @name         Chat Studio · Prozi
// @namespace    https://github.com/moishyf/chat-studio-prozi-userscript
// @version      15.3.1-beta.2
// @description  כל עיצובי Chat Studio V15.3 — גרסת הסקריפט והתוספות: פרוזי
// @author       Original: לשכת הרב; Userscript conversion: Prozi
// @copyright    כל הזכויות שמורות בס"ד: לשכת הרב
// @match        https://chat.google.com/*
// @match        https://mail.google.com/*
// @match        https://ogs.google.com/*
// @run-at       document-start
// @sandbox      DOM
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      accounts.google.com
// @homepageURL  https://moishyf.github.io/chat-studio-prozi-userscript/
// @updateURL    https://raw.githubusercontent.com/moishyf/chat-studio-prozi-userscript/main/dist/chat-studio.meta.js
// @downloadURL  https://raw.githubusercontent.com/moishyf/chat-studio-prozi-userscript/main/dist/chat-studio.user.js
// ==/UserScript==

(()=>{'use strict';
if(window.__chatStudioProzi)return;window.__chatStudioProzi=true;
const CS_VERSION="15.3.1-beta.2",CS_HOME="https://moishyf.github.io/chat-studio-prozi-userscript/",CS_ASSETS={"check.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 24 24"},[["path",{"fill":"none","stroke":"white","stroke-width":"3.2","stroke-linecap":"round","d":"M5 12l5 5 9-10"},[]]]],"doodle-amber.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#f59e0b","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-aqua.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#06b6d4","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-arctic.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#7dd3fc","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-berry.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#7b2cbf","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-blossom.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#ffafcc","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-blush.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#f472b6","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-charcoal.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#4b5563","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-cherry.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#be123c","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-citrus.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#facc15","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-copper.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#c2703d","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-coral.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#fb7185","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-cyber.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#00f0ff","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-denim.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#3b5998","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-desert.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#e09f3e","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-ember.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#ef4444","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-emerald.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#10b981","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-flamingo.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#ff6f91","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-forest.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#16a34a","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-galaxy.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#7c3aed","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-glacier.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#a8dadc","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-gold.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#d4af37","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-grape.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#9333ea","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-honey.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#f4a261","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-ice.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#67e8f9","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-indigo.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#6366f1","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-jungle.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#15803d","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-lavender.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#a78bfa","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-lime.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#a3e635","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-midnight.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#3b5bdb","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-mint.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#34d399","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-mocha.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#8b5e3c","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-ocean.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#0ea5e9","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-olive.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#84a33a","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-peach.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#fdba74","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-pearl.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#e2e8f0","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-plum.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#a21caf","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-quartz.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#f9a8d4","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-rainforest.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#2d6a4f","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-ruby.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#e11d48","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-sand.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#d6b98c","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-sapphire.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#3b82f6","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-sky.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#60a5fa","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-slate.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#64748b","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-steel.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#94a3b8","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-sunset.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#f97316","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-teal.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#14b8a6","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-tropical.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#06d6a0","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-volcano.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"100","height":"100"},[["g",{"fill":"none","stroke":"#dc2626","stroke-opacity":"0.32","stroke-width":"1.3","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"d":"M10 10l6 6m0-6l-6 6"},[]],["path",{"d":"M35 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0"},[]],["path",{"d":"M70 8l4 8h-8z"},[]],["path",{"d":"M18 45h10v10H18z"},[]],["path",{"d":"M52 42c4-6 10 6 14 0"},[]],["path",{"d":"M85 40l3 3 5-6"},[]],["path",{"d":"M8 78q6-8 12 0t12 0"},[]],["path",{"d":"M48 75l5 3-5 3z"},[]],["path",{"d":"M78 72a6 6 0 1 0 12 0a6 6 0 1 0-12 0M84 66v-3"},[]],["path",{"d":"M30 28l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"},[]],["path",{"d":"M62 90h8M66 86v8"},[]]]]]],"doodle-wa.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"420","height":"420","viewBox":"0 0 420 420"},[["g",{"fill":"none","stroke":"#b3a58e","stroke-opacity":"0.45","stroke-width":"1.35","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"transform":"translate(28.9 16.5) rotate(3) scale(1.08) translate(-12 -12)","d":"M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5"},[]],["path",{"transform":"translate(28.9 436.5) rotate(3) scale(1.08) translate(-12 -12)","d":"M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5"},[]],["path",{"transform":"translate(64.1 26.6) rotate(-6) scale(1.14) translate(-12 -12)","d":"M6 12h12l-2 8H8zM5 12a4 4 0 0 1 3-6 4 4 0 0 1 8 0 4 4 0 0 1 3 6M10 12l.5 8M14 12l-.5 8"},[]],["path",{"transform":"translate(111.7 14.7) rotate(-4) scale(1.12) translate(-12 -12)","d":"M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"},[]],["path",{"transform":"translate(111.7 434.7) rotate(-4) scale(1.12) translate(-12 -12)","d":"M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"},[]],["path",{"transform":"translate(167.3 34.2) rotate(5) scale(1.36) translate(-12 -12)","d":"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"},[]],["path",{"transform":"translate(213.8 26.2) rotate(16) scale(1.18) translate(-12 -12)","d":"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7"},[]],["path",{"transform":"translate(249.3 27.3) rotate(-13) scale(1.29) translate(-12 -12)","d":"M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"},[]],["path",{"transform":"translate(297.7 25.5) rotate(15) scale(1.37) translate(-12 -12)","d":"M12 3c3 2 5 6 5 10l-2 3H9l-2-3c0-4 2-8 5-10zM12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM9 16l-2 4 3-1M15 16l2 4-3-1"},[]],["path",{"transform":"translate(342.6 28.5) rotate(-4) scale(1.34) translate(-12 -12)","d":"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"},[]],["path",{"transform":"translate(402.5 23.9) rotate(16) scale(1.40) translate(-12 -12)","d":"M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z"},[]],["path",{"transform":"translate(-17.5 23.9) rotate(16) scale(1.40) translate(-12 -12)","d":"M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z"},[]],["path",{"transform":"translate(24.1 74.3) rotate(-15) scale(1.35) translate(-12 -12)","d":"M7 10a5 5 0 0 1 10 0zM7 10l5 11 5-11"},[]],["path",{"transform":"translate(63.4 82.0) rotate(26) scale(1.27) translate(-12 -12)","d":"M2 12h4l3-7 6 14 3-7h4"},[]],["path",{"transform":"translate(114.0 63.8) rotate(-26) scale(1.34) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2"},[]],["path",{"transform":"translate(165.7 75.0) rotate(-14) scale(1.32) translate(-12 -12)","d":"M3 12a9 9 0 0 1 18 0zM12 12v6a2 2 0 0 1-4 0"},[]],["path",{"transform":"translate(207.5 62.0) rotate(27) scale(1.12) translate(-12 -12)","d":"M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"},[]],["path",{"transform":"translate(251.1 84.8) rotate(-28) scale(1.41) translate(-12 -12)","d":"M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2"},[]],["path",{"transform":"translate(295.8 73.6) rotate(-19) scale(1.19) translate(-12 -12)","d":"M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"},[]],["path",{"transform":"translate(357.7 75.9) rotate(-18) scale(1.17) translate(-12 -12)","d":"M6 9h12a4 4 0 0 1 3.8 5.2l-.8 2.5a2 2 0 0 1-3.4.7L15 15H9l-2.6 2.4a2 2 0 0 1-3.4-.7l-.8-2.5A4 4 0 0 1 6 9zM8 11v3M6.5 12.5h3M16 12h.01M18 13h.01"},[]],["path",{"transform":"translate(400.6 63.2) rotate(-13) scale(1.23) translate(-12 -12)","d":"M12 21c0-5 1-9 0-12M12 9c-3-3-7-2-8 0M12 9c3-3 7-2 8 0M12 9c-1-3-4-5-6-5M12 9c1-3 4-5 6-5"},[]],["path",{"transform":"translate(-19.4 63.2) rotate(-13) scale(1.23) translate(-12 -12)","d":"M12 21c0-5 1-9 0-12M12 9c-3-3-7-2-8 0M12 9c3-3 7-2 8 0M12 9c-1-3-4-5-6-5M12 9c1-3 4-5 6-5"},[]],["path",{"transform":"translate(23.9 115.9) rotate(-26) scale(1.14) translate(-12 -12)","d":"M12 7v14M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 13a7 7 0 0 0 14 0M8 10h8"},[]],["path",{"transform":"translate(64.9 120.9) rotate(24) scale(1.26) translate(-12 -12)","d":"M4 5h16v11H10l-5 4v-4H4z"},[]],["path",{"transform":"translate(114.6 117.4) rotate(-3) scale(1.17) translate(-12 -12)","d":"M3 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM14 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM10 13h4M3 13l1-5M21 13l-1-5"},[]],["path",{"transform":"translate(168.5 128.1) rotate(0) scale(1.25) translate(-12 -12)","d":"M12 21c0-5 1-9 0-12M12 9c-3-3-7-2-8 0M12 9c3-3 7-2 8 0M12 9c-1-3-4-5-6-5M12 9c1-3 4-5 6-5"},[]],["path",{"transform":"translate(210.8 119.5) rotate(17) scale(1.09) translate(-12 -12)","d":"M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-4 0M12 7c2-4 6-3 4 0"},[]],["path",{"transform":"translate(258.2 120.3) rotate(-5) scale(1.23) translate(-12 -12)","d":"M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M9 21h6"},[]],["path",{"transform":"translate(310.4 108.9) rotate(-7) scale(1.36) translate(-12 -12)","d":"M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"},[]],["path",{"transform":"translate(348.6 130.0) rotate(-14) scale(1.08) translate(-12 -12)","d":"M12 15c-4 0-6-3.5-6-6.5a6 6 0 0 1 12 0c0 3-2 6.5-6 6.5zM12 15l-1 2h2zM12 17c0 2-2 2-1 5"},[]],["path",{"transform":"translate(399.5 116.1) rotate(-11) scale(1.23) translate(-12 -12)","d":"M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"},[]],["path",{"transform":"translate(29.8 167.4) rotate(-21) scale(1.20) translate(-12 -12)","d":"M3 6h18v12H3zM3 6l9 7 9-7"},[]],["path",{"transform":"translate(70.8 176.2) rotate(-16) scale(1.33) translate(-12 -12)","d":"M13 3L5 13h6l-1 8 8-10h-6z"},[]],["path",{"transform":"translate(111.7 157.4) rotate(21) scale(1.13) translate(-12 -12)","d":"M3 11l18-7-6 17-3-7zM12 14l9-10"},[]],["path",{"transform":"translate(165.4 169.1) rotate(-12) scale(1.32) translate(-12 -12)","d":"M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z"},[]],["path",{"transform":"translate(211.9 163.3) rotate(8) scale(1.13) translate(-12 -12)","d":"M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"},[]],["path",{"transform":"translate(261.3 173.5) rotate(20) scale(1.35) translate(-12 -12)","d":"M12 7v14M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 13a7 7 0 0 0 14 0M8 10h8"},[]],["path",{"transform":"translate(307.2 165.2) rotate(-24) scale(1.37) translate(-12 -12)","d":"M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"},[]],["path",{"transform":"translate(348.7 175.5) rotate(18) scale(1.32) translate(-12 -12)","d":"M6 3h12l-1 6a5 5 0 0 1-10 0zM12 14v5M8 21h8"},[]],["path",{"transform":"translate(391.5 154.5) rotate(-22) scale(1.29) translate(-12 -12)","d":"M12 15c-4 0-6-3.5-6-6.5a6 6 0 0 1 12 0c0 3-2 6.5-6 6.5zM12 15l-1 2h2zM12 17c0 2-2 2-1 5"},[]],["path",{"transform":"translate(17.0 208.9) rotate(-13) scale(1.14) translate(-12 -12)","d":"M4 19l4-9 4 5 3-4 5 8z"},[]],["path",{"transform":"translate(437.0 208.9) rotate(-13) scale(1.14) translate(-12 -12)","d":"M4 19l4-9 4 5 3-4 5 8z"},[]],["path",{"transform":"translate(72.1 219.5) rotate(-8) scale(1.09) translate(-12 -12)","d":"M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"},[]],["path",{"transform":"translate(115.4 214.4) rotate(24) scale(1.22) translate(-12 -12)","d":"M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"},[]],["path",{"transform":"translate(155.5 216.1) rotate(22) scale(1.30) translate(-12 -12)","d":"M3 12a9 9 0 0 1 18 0zM12 12v6a2 2 0 0 1-4 0"},[]],["path",{"transform":"translate(214.9 212.7) rotate(-24) scale(1.30) translate(-12 -12)","d":"M8 15a4 4 0 1 1 3.5-6H20v3h-2v2h-2v-2h-4.5A4 4 0 0 1 8 15z"},[]],["path",{"transform":"translate(255.9 218.8) rotate(15) scale(1.41) translate(-12 -12)","d":"M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z"},[]],["path",{"transform":"translate(302.3 214.2) rotate(-26) scale(1.10) translate(-12 -12)","d":"M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2"},[]],["path",{"transform":"translate(352.0 213.8) rotate(-27) scale(1.34) translate(-12 -12)","d":"M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5"},[]],["path",{"transform":"translate(391.8 207.6) rotate(-17) scale(1.08) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4 4 0 0 0 7 0M9 9.5v.5M15 9.5v.5"},[]],["path",{"transform":"translate(29.5 252.1) rotate(-12) scale(1.30) translate(-12 -12)","d":"M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"},[]],["path",{"transform":"translate(73.8 265.4) rotate(7) scale(1.25) translate(-12 -12)","d":"M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z"},[]],["path",{"transform":"translate(119.2 251.2) rotate(20) scale(1.13) translate(-12 -12)","d":"M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"},[]],["path",{"transform":"translate(164.3 261.8) rotate(-11) scale(1.16) translate(-12 -12)","d":"M4 5c5-2 11-2 16 0L12 21zM9 9h.01M14 11h.01M11 14h.01"},[]],["path",{"transform":"translate(214.5 250.8) rotate(0) scale(1.40) translate(-12 -12)","d":"M3 15l2-5h14l2 5v3H3zM6 18v2M18 18v2M5 15h14"},[]],["path",{"transform":"translate(251.3 259.4) rotate(15) scale(1.25) translate(-12 -12)","d":"M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3"},[]],["path",{"transform":"translate(310.3 251.9) rotate(7) scale(1.18) translate(-12 -12)","d":"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"},[]],["path",{"transform":"translate(346.4 264.6) rotate(-1) scale(1.40) translate(-12 -12)","d":"M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"},[]],["path",{"transform":"translate(391.8 259.1) rotate(-20) scale(1.11) translate(-12 -12)","d":"M5 19C5 10 11 5 20 4c-1 9-6 15-15 15zM5 19l8-8"},[]],["path",{"transform":"translate(17.7 301.7) rotate(10) scale(1.11) translate(-12 -12)","d":"M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3"},[]],["path",{"transform":"translate(437.7 301.7) rotate(10) scale(1.11) translate(-12 -12)","d":"M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3"},[]],["path",{"transform":"translate(70.4 315.6) rotate(23) scale(1.41) translate(-12 -12)","d":"M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 10c-2-4 2-6 2-2M14 12c4-2 6 2 2 2M12 14c2 4-2 6-2 2M10 12c-4 2-6-2-2-2"},[]],["path",{"transform":"translate(122.4 304.4) rotate(13) scale(1.30) translate(-12 -12)","d":"M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"},[]],["path",{"transform":"translate(162.9 317.0) rotate(6) scale(1.38) translate(-12 -12)","d":"M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-4 0M12 7c2-4 6-3 4 0"},[]],["path",{"transform":"translate(214.7 307.9) rotate(-14) scale(1.35) translate(-12 -12)","d":"M5 9l1-5 4 3h4l4-3 1 5v4a7 7 0 0 1-14 0zM9 12v.5M15 12v.5M11 15l1 1 1-1"},[]],["path",{"transform":"translate(261.5 313.7) rotate(-10) scale(1.35) translate(-12 -12)","d":"M8 15a4 4 0 1 1 3.5-6H20v3h-2v2h-2v-2h-4.5A4 4 0 0 1 8 15z"},[]],["path",{"transform":"translate(296.1 306.4) rotate(2) scale(1.09) translate(-12 -12)","d":"M4 5h16v11H10l-5 4v-4H4z"},[]],["path",{"transform":"translate(346.9 306.0) rotate(5) scale(1.09) translate(-12 -12)","d":"M3 12c3-5 10-6 15 0-5 6-12 5-15 0zM18 12l3-3v6zM8 11h.01"},[]],["path",{"transform":"translate(404.2 302.4) rotate(12) scale(1.11) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4 4 0 0 0 7 0M9 9.5v.5M15 9.5v.5"},[]],["path",{"transform":"translate(-15.8 302.4) rotate(12) scale(1.11) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4 4 0 0 0 7 0M9 9.5v.5M15 9.5v.5"},[]],["path",{"transform":"translate(24.0 345.4) rotate(-27) scale(1.24) translate(-12 -12)","d":"M6 12h12l-2 8H8zM5 12a4 4 0 0 1 3-6 4 4 0 0 1 8 0 4 4 0 0 1 3 6M10 12l.5 8M14 12l-.5 8"},[]],["path",{"transform":"translate(75.0 360.5) rotate(-3) scale(1.21) translate(-12 -12)","d":"M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5"},[]],["path",{"transform":"translate(121.3 340.9) rotate(2) scale(1.25) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2"},[]],["path",{"transform":"translate(160.5 357.4) rotate(-22) scale(1.28) translate(-12 -12)","d":"M5 19C5 10 11 5 20 4c-1 9-6 15-15 15zM5 19l8-8"},[]],["path",{"transform":"translate(216.9 347.4) rotate(-17) scale(1.42) translate(-12 -12)","d":"M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"},[]],["path",{"transform":"translate(256.4 359.5) rotate(7) scale(1.32) translate(-12 -12)","d":"M3 6h18v12H3zM3 6l9 7 9-7"},[]],["path",{"transform":"translate(303.2 352.0) rotate(-7) scale(1.33) translate(-12 -12)","d":"M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"},[]],["path",{"transform":"translate(347.4 354.2) rotate(19) scale(1.19) translate(-12 -12)","d":"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7"},[]],["path",{"transform":"translate(399.5 350.2) rotate(16) scale(1.12) translate(-12 -12)","d":"M4 5c5-2 11-2 16 0L12 21zM9 9h.01M14 11h.01M11 14h.01"},[]],["path",{"transform":"translate(27.6 398.6) rotate(-5) scale(1.16) translate(-12 -12)","d":"M3 11l18-7-6 17-3-7zM12 14l9-10"},[]],["path",{"transform":"translate(70.2 398.2) rotate(22) scale(1.12) translate(-12 -12)","d":"M7 10a5 5 0 0 1 10 0zM7 10l5 11 5-11"},[]],["path",{"transform":"translate(116.0 389.4) rotate(-10) scale(1.17) translate(-12 -12)","d":"M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 10c-2-4 2-6 2-2M14 12c4-2 6 2 2 2M12 14c2 4-2 6-2 2M10 12c-4 2-6-2-2-2"},[]],["path",{"transform":"translate(156.0 403.6) rotate(23) scale(1.29) translate(-12 -12)","d":"M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"},[]],["path",{"transform":"translate(156.0 -16.4) rotate(23) scale(1.29) translate(-12 -12)","d":"M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"},[]],["path",{"transform":"translate(215.2 399.2) rotate(22) scale(1.30) translate(-12 -12)","d":"M4 7h16M4 7l2 13h12l2-13M9 7V4h6v3"},[]],["path",{"transform":"translate(257.4 403.8) rotate(-4) scale(1.10) translate(-12 -12)","d":"M3 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM14 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM10 13h4M3 13l1-5M21 13l-1-5"},[]],["path",{"transform":"translate(257.4 -16.2) rotate(-4) scale(1.10) translate(-12 -12)","d":"M3 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM14 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM10 13h4M3 13l1-5M21 13l-1-5"},[]],["path",{"transform":"translate(296.9 398.6) rotate(-2) scale(1.22) translate(-12 -12)","d":"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"},[]],["path",{"transform":"translate(356.4 407.9) rotate(0) scale(1.24) translate(-12 -12)","d":"M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M10 5l2 2 2-2M10 19l2-2 2 2"},[]],["path",{"transform":"translate(356.4 -12.1) rotate(0) scale(1.24) translate(-12 -12)","d":"M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M10 5l2 2 2-2M10 19l2-2 2 2"},[]],["path",{"transform":"translate(394.2 393.7) rotate(-1) scale(1.20) translate(-12 -12)","d":"M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM3 15c2 2 9 1 14-2s7-6 5-7-6 0-8 1"},[]],["path",{"d":"M242.5 394.6q2-3 4 0t4 0"},[]],["path",{"d":"M161.4 67.5q2-3 4 0t4 0"},[]],["path",{"d":"M347.1 123.8h6M350.1 120.8v6"},[]],["path",{"d":"M356.5 61.7q2-3 4 0t4 0"},[]],["path",{"d":"M369.8 242.1h6M372.8 239.1v6"},[]],["path",{"d":"M175.7 171.0q2-3 4 0t4 0"},[]],["path",{"d":"M10.5 342.8q2-3 4 0t4 0"},[]],["path",{"d":"M365.4 348.4h6M368.4 345.4v6"},[]],["path",{"d":"M64.0 94.1h6M67.0 91.1v6"},[]],["path",{"d":"M26.2 72.8h6M29.2 69.8v6"},[]],["circle",{"cx":"140.6","cy":"177.6","r":"2.4"},[]],["circle",{"cx":"126.2","cy":"390.7","r":"1.6"},[]],["path",{"d":"M52.8 345.4h6M55.8 342.4v6"},[]],["path",{"d":"M57.2 296.1q2-3 4 0t4 0"},[]],["path",{"d":"M344.8 211.7h6M347.8 208.7v6"},[]],["path",{"d":"M61.1 315.1q2-3 4 0t4 0"},[]],["path",{"d":"M206.2 305.3h6M209.2 302.3v6"},[]],["circle",{"cx":"37.6","cy":"270.9","r":"2.4"},[]],["circle",{"cx":"269.5","cy":"191.1","r":"1.8"},[]],["path",{"d":"M69.9 252.9q2-3 4 0t4 0"},[]],["path",{"d":"M209.7 274.9q2-3 4 0t4 0"},[]],["circle",{"cx":"217.9","cy":"324.6","r":"2.0"},[]],["path",{"d":"M29.0 264.2h6M32.0 261.2v6"},[]],["circle",{"cx":"98.5","cy":"319.3","r":"2.0"},[]],["path",{"d":"M291.0 385.1h6M294.0 382.1v6"},[]],["path",{"d":"M206.5 140.8h6M209.5 137.8v6"},[]],["path",{"d":"M43.1 375.2h6M46.1 372.2v6"},[]],["circle",{"cx":"346.6","cy":"140.2","r":"1.0"},[]],["circle",{"cx":"239.0","cy":"181.4","r":"2.4"},[]],["circle",{"cx":"145.8","cy":"249.0","r":"1.6"},[]],["path",{"d":"M130.8 76.2h6M133.8 73.2v6"},[]],["path",{"d":"M374.3 262.1q2-3 4 0t4 0"},[]],["path",{"d":"M85.0 44.7h6M88.0 41.7v6"},[]],["circle",{"cx":"379.0","cy":"125.8","r":"1.7"},[]],["path",{"d":"M125.6 82.0q2-3 4 0t4 0"},[]],["circle",{"cx":"260.6","cy":"69.4","r":"2.4"},[]],["path",{"d":"M348.5 194.5q2-3 4 0t4 0"},[]],["path",{"d":"M390.0 216.9h6M393.0 213.9v6"},[]],["circle",{"cx":"250.1","cy":"106.3","r":"2.3"},[]],["path",{"d":"M252.1 411.3h6M255.1 408.3v6"},[]],["path",{"d":"M66.2 288.0h6M69.2 285.0v6"},[]],["path",{"d":"M175.0 300.2h6M178.0 297.2v6"},[]],["path",{"d":"M372.6 206.1h6M375.6 203.1v6"},[]],["circle",{"cx":"14.5","cy":"174.7","r":"1.6"},[]],["path",{"d":"M175.2 322.8q2-3 4 0t4 0"},[]],["path",{"d":"M216.0 319.3q2-3 4 0t4 0"},[]]]]]],"doodle-wad.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"420","height":"420","viewBox":"0 0 420 420"},[["g",{"fill":"none","stroke":"#d4dde2","stroke-opacity":"0.085","stroke-width":"1.35","stroke-linecap":"round","stroke-linejoin":"round"},[["path",{"transform":"translate(28.9 16.5) rotate(3) scale(1.08) translate(-12 -12)","d":"M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5"},[]],["path",{"transform":"translate(28.9 436.5) rotate(3) scale(1.08) translate(-12 -12)","d":"M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5"},[]],["path",{"transform":"translate(64.1 26.6) rotate(-6) scale(1.14) translate(-12 -12)","d":"M6 12h12l-2 8H8zM5 12a4 4 0 0 1 3-6 4 4 0 0 1 8 0 4 4 0 0 1 3 6M10 12l.5 8M14 12l-.5 8"},[]],["path",{"transform":"translate(111.7 14.7) rotate(-4) scale(1.12) translate(-12 -12)","d":"M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"},[]],["path",{"transform":"translate(111.7 434.7) rotate(-4) scale(1.12) translate(-12 -12)","d":"M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"},[]],["path",{"transform":"translate(167.3 34.2) rotate(5) scale(1.36) translate(-12 -12)","d":"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"},[]],["path",{"transform":"translate(213.8 26.2) rotate(16) scale(1.18) translate(-12 -12)","d":"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7"},[]],["path",{"transform":"translate(249.3 27.3) rotate(-13) scale(1.29) translate(-12 -12)","d":"M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"},[]],["path",{"transform":"translate(297.7 25.5) rotate(15) scale(1.37) translate(-12 -12)","d":"M12 3c3 2 5 6 5 10l-2 3H9l-2-3c0-4 2-8 5-10zM12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM9 16l-2 4 3-1M15 16l2 4-3-1"},[]],["path",{"transform":"translate(342.6 28.5) rotate(-4) scale(1.34) translate(-12 -12)","d":"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"},[]],["path",{"transform":"translate(402.5 23.9) rotate(16) scale(1.40) translate(-12 -12)","d":"M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z"},[]],["path",{"transform":"translate(-17.5 23.9) rotate(16) scale(1.40) translate(-12 -12)","d":"M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z"},[]],["path",{"transform":"translate(24.1 74.3) rotate(-15) scale(1.35) translate(-12 -12)","d":"M7 10a5 5 0 0 1 10 0zM7 10l5 11 5-11"},[]],["path",{"transform":"translate(63.4 82.0) rotate(26) scale(1.27) translate(-12 -12)","d":"M2 12h4l3-7 6 14 3-7h4"},[]],["path",{"transform":"translate(114.0 63.8) rotate(-26) scale(1.34) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2"},[]],["path",{"transform":"translate(165.7 75.0) rotate(-14) scale(1.32) translate(-12 -12)","d":"M3 12a9 9 0 0 1 18 0zM12 12v6a2 2 0 0 1-4 0"},[]],["path",{"transform":"translate(207.5 62.0) rotate(27) scale(1.12) translate(-12 -12)","d":"M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"},[]],["path",{"transform":"translate(251.1 84.8) rotate(-28) scale(1.41) translate(-12 -12)","d":"M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2"},[]],["path",{"transform":"translate(295.8 73.6) rotate(-19) scale(1.19) translate(-12 -12)","d":"M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"},[]],["path",{"transform":"translate(357.7 75.9) rotate(-18) scale(1.17) translate(-12 -12)","d":"M6 9h12a4 4 0 0 1 3.8 5.2l-.8 2.5a2 2 0 0 1-3.4.7L15 15H9l-2.6 2.4a2 2 0 0 1-3.4-.7l-.8-2.5A4 4 0 0 1 6 9zM8 11v3M6.5 12.5h3M16 12h.01M18 13h.01"},[]],["path",{"transform":"translate(400.6 63.2) rotate(-13) scale(1.23) translate(-12 -12)","d":"M12 21c0-5 1-9 0-12M12 9c-3-3-7-2-8 0M12 9c3-3 7-2 8 0M12 9c-1-3-4-5-6-5M12 9c1-3 4-5 6-5"},[]],["path",{"transform":"translate(-19.4 63.2) rotate(-13) scale(1.23) translate(-12 -12)","d":"M12 21c0-5 1-9 0-12M12 9c-3-3-7-2-8 0M12 9c3-3 7-2 8 0M12 9c-1-3-4-5-6-5M12 9c1-3 4-5 6-5"},[]],["path",{"transform":"translate(23.9 115.9) rotate(-26) scale(1.14) translate(-12 -12)","d":"M12 7v14M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 13a7 7 0 0 0 14 0M8 10h8"},[]],["path",{"transform":"translate(64.9 120.9) rotate(24) scale(1.26) translate(-12 -12)","d":"M4 5h16v11H10l-5 4v-4H4z"},[]],["path",{"transform":"translate(114.6 117.4) rotate(-3) scale(1.17) translate(-12 -12)","d":"M3 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM14 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM10 13h4M3 13l1-5M21 13l-1-5"},[]],["path",{"transform":"translate(168.5 128.1) rotate(0) scale(1.25) translate(-12 -12)","d":"M12 21c0-5 1-9 0-12M12 9c-3-3-7-2-8 0M12 9c3-3 7-2 8 0M12 9c-1-3-4-5-6-5M12 9c1-3 4-5 6-5"},[]],["path",{"transform":"translate(210.8 119.5) rotate(17) scale(1.09) translate(-12 -12)","d":"M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-4 0M12 7c2-4 6-3 4 0"},[]],["path",{"transform":"translate(258.2 120.3) rotate(-5) scale(1.23) translate(-12 -12)","d":"M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M9 21h6"},[]],["path",{"transform":"translate(310.4 108.9) rotate(-7) scale(1.36) translate(-12 -12)","d":"M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"},[]],["path",{"transform":"translate(348.6 130.0) rotate(-14) scale(1.08) translate(-12 -12)","d":"M12 15c-4 0-6-3.5-6-6.5a6 6 0 0 1 12 0c0 3-2 6.5-6 6.5zM12 15l-1 2h2zM12 17c0 2-2 2-1 5"},[]],["path",{"transform":"translate(399.5 116.1) rotate(-11) scale(1.23) translate(-12 -12)","d":"M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"},[]],["path",{"transform":"translate(29.8 167.4) rotate(-21) scale(1.20) translate(-12 -12)","d":"M3 6h18v12H3zM3 6l9 7 9-7"},[]],["path",{"transform":"translate(70.8 176.2) rotate(-16) scale(1.33) translate(-12 -12)","d":"M13 3L5 13h6l-1 8 8-10h-6z"},[]],["path",{"transform":"translate(111.7 157.4) rotate(21) scale(1.13) translate(-12 -12)","d":"M3 11l18-7-6 17-3-7zM12 14l9-10"},[]],["path",{"transform":"translate(165.4 169.1) rotate(-12) scale(1.32) translate(-12 -12)","d":"M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z"},[]],["path",{"transform":"translate(211.9 163.3) rotate(8) scale(1.13) translate(-12 -12)","d":"M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"},[]],["path",{"transform":"translate(261.3 173.5) rotate(20) scale(1.35) translate(-12 -12)","d":"M12 7v14M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 13a7 7 0 0 0 14 0M8 10h8"},[]],["path",{"transform":"translate(307.2 165.2) rotate(-24) scale(1.37) translate(-12 -12)","d":"M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"},[]],["path",{"transform":"translate(348.7 175.5) rotate(18) scale(1.32) translate(-12 -12)","d":"M6 3h12l-1 6a5 5 0 0 1-10 0zM12 14v5M8 21h8"},[]],["path",{"transform":"translate(391.5 154.5) rotate(-22) scale(1.29) translate(-12 -12)","d":"M12 15c-4 0-6-3.5-6-6.5a6 6 0 0 1 12 0c0 3-2 6.5-6 6.5zM12 15l-1 2h2zM12 17c0 2-2 2-1 5"},[]],["path",{"transform":"translate(17.0 208.9) rotate(-13) scale(1.14) translate(-12 -12)","d":"M4 19l4-9 4 5 3-4 5 8z"},[]],["path",{"transform":"translate(437.0 208.9) rotate(-13) scale(1.14) translate(-12 -12)","d":"M4 19l4-9 4 5 3-4 5 8z"},[]],["path",{"transform":"translate(72.1 219.5) rotate(-8) scale(1.09) translate(-12 -12)","d":"M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"},[]],["path",{"transform":"translate(115.4 214.4) rotate(24) scale(1.22) translate(-12 -12)","d":"M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"},[]],["path",{"transform":"translate(155.5 216.1) rotate(22) scale(1.30) translate(-12 -12)","d":"M3 12a9 9 0 0 1 18 0zM12 12v6a2 2 0 0 1-4 0"},[]],["path",{"transform":"translate(214.9 212.7) rotate(-24) scale(1.30) translate(-12 -12)","d":"M8 15a4 4 0 1 1 3.5-6H20v3h-2v2h-2v-2h-4.5A4 4 0 0 1 8 15z"},[]],["path",{"transform":"translate(255.9 218.8) rotate(15) scale(1.41) translate(-12 -12)","d":"M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z"},[]],["path",{"transform":"translate(302.3 214.2) rotate(-26) scale(1.10) translate(-12 -12)","d":"M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2"},[]],["path",{"transform":"translate(352.0 213.8) rotate(-27) scale(1.34) translate(-12 -12)","d":"M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5"},[]],["path",{"transform":"translate(391.8 207.6) rotate(-17) scale(1.08) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4 4 0 0 0 7 0M9 9.5v.5M15 9.5v.5"},[]],["path",{"transform":"translate(29.5 252.1) rotate(-12) scale(1.30) translate(-12 -12)","d":"M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"},[]],["path",{"transform":"translate(73.8 265.4) rotate(7) scale(1.25) translate(-12 -12)","d":"M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z"},[]],["path",{"transform":"translate(119.2 251.2) rotate(20) scale(1.13) translate(-12 -12)","d":"M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"},[]],["path",{"transform":"translate(164.3 261.8) rotate(-11) scale(1.16) translate(-12 -12)","d":"M4 5c5-2 11-2 16 0L12 21zM9 9h.01M14 11h.01M11 14h.01"},[]],["path",{"transform":"translate(214.5 250.8) rotate(0) scale(1.40) translate(-12 -12)","d":"M3 15l2-5h14l2 5v3H3zM6 18v2M18 18v2M5 15h14"},[]],["path",{"transform":"translate(251.3 259.4) rotate(15) scale(1.25) translate(-12 -12)","d":"M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3"},[]],["path",{"transform":"translate(310.3 251.9) rotate(7) scale(1.18) translate(-12 -12)","d":"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"},[]],["path",{"transform":"translate(346.4 264.6) rotate(-1) scale(1.40) translate(-12 -12)","d":"M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"},[]],["path",{"transform":"translate(391.8 259.1) rotate(-20) scale(1.11) translate(-12 -12)","d":"M5 19C5 10 11 5 20 4c-1 9-6 15-15 15zM5 19l8-8"},[]],["path",{"transform":"translate(17.7 301.7) rotate(10) scale(1.11) translate(-12 -12)","d":"M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3"},[]],["path",{"transform":"translate(437.7 301.7) rotate(10) scale(1.11) translate(-12 -12)","d":"M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3"},[]],["path",{"transform":"translate(70.4 315.6) rotate(23) scale(1.41) translate(-12 -12)","d":"M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 10c-2-4 2-6 2-2M14 12c4-2 6 2 2 2M12 14c2 4-2 6-2 2M10 12c-4 2-6-2-2-2"},[]],["path",{"transform":"translate(122.4 304.4) rotate(13) scale(1.30) translate(-12 -12)","d":"M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"},[]],["path",{"transform":"translate(162.9 317.0) rotate(6) scale(1.38) translate(-12 -12)","d":"M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-4 0M12 7c2-4 6-3 4 0"},[]],["path",{"transform":"translate(214.7 307.9) rotate(-14) scale(1.35) translate(-12 -12)","d":"M5 9l1-5 4 3h4l4-3 1 5v4a7 7 0 0 1-14 0zM9 12v.5M15 12v.5M11 15l1 1 1-1"},[]],["path",{"transform":"translate(261.5 313.7) rotate(-10) scale(1.35) translate(-12 -12)","d":"M8 15a4 4 0 1 1 3.5-6H20v3h-2v2h-2v-2h-4.5A4 4 0 0 1 8 15z"},[]],["path",{"transform":"translate(296.1 306.4) rotate(2) scale(1.09) translate(-12 -12)","d":"M4 5h16v11H10l-5 4v-4H4z"},[]],["path",{"transform":"translate(346.9 306.0) rotate(5) scale(1.09) translate(-12 -12)","d":"M3 12c3-5 10-6 15 0-5 6-12 5-15 0zM18 12l3-3v6zM8 11h.01"},[]],["path",{"transform":"translate(404.2 302.4) rotate(12) scale(1.11) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4 4 0 0 0 7 0M9 9.5v.5M15 9.5v.5"},[]],["path",{"transform":"translate(-15.8 302.4) rotate(12) scale(1.11) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4 4 0 0 0 7 0M9 9.5v.5M15 9.5v.5"},[]],["path",{"transform":"translate(24.0 345.4) rotate(-27) scale(1.24) translate(-12 -12)","d":"M6 12h12l-2 8H8zM5 12a4 4 0 0 1 3-6 4 4 0 0 1 8 0 4 4 0 0 1 3 6M10 12l.5 8M14 12l-.5 8"},[]],["path",{"transform":"translate(75.0 360.5) rotate(-3) scale(1.21) translate(-12 -12)","d":"M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5"},[]],["path",{"transform":"translate(121.3 340.9) rotate(2) scale(1.25) translate(-12 -12)","d":"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2"},[]],["path",{"transform":"translate(160.5 357.4) rotate(-22) scale(1.28) translate(-12 -12)","d":"M5 19C5 10 11 5 20 4c-1 9-6 15-15 15zM5 19l8-8"},[]],["path",{"transform":"translate(216.9 347.4) rotate(-17) scale(1.42) translate(-12 -12)","d":"M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"},[]],["path",{"transform":"translate(256.4 359.5) rotate(7) scale(1.32) translate(-12 -12)","d":"M3 6h18v12H3zM3 6l9 7 9-7"},[]],["path",{"transform":"translate(303.2 352.0) rotate(-7) scale(1.33) translate(-12 -12)","d":"M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"},[]],["path",{"transform":"translate(347.4 354.2) rotate(19) scale(1.19) translate(-12 -12)","d":"M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7"},[]],["path",{"transform":"translate(399.5 350.2) rotate(16) scale(1.12) translate(-12 -12)","d":"M4 5c5-2 11-2 16 0L12 21zM9 9h.01M14 11h.01M11 14h.01"},[]],["path",{"transform":"translate(27.6 398.6) rotate(-5) scale(1.16) translate(-12 -12)","d":"M3 11l18-7-6 17-3-7zM12 14l9-10"},[]],["path",{"transform":"translate(70.2 398.2) rotate(22) scale(1.12) translate(-12 -12)","d":"M7 10a5 5 0 0 1 10 0zM7 10l5 11 5-11"},[]],["path",{"transform":"translate(116.0 389.4) rotate(-10) scale(1.17) translate(-12 -12)","d":"M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 10c-2-4 2-6 2-2M14 12c4-2 6 2 2 2M12 14c2 4-2 6-2 2M10 12c-4 2-6-2-2-2"},[]],["path",{"transform":"translate(156.0 403.6) rotate(23) scale(1.29) translate(-12 -12)","d":"M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"},[]],["path",{"transform":"translate(156.0 -16.4) rotate(23) scale(1.29) translate(-12 -12)","d":"M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 6L12 16.6 6.7 19.4l1.1-6L3.4 9.3l6-.8z"},[]],["path",{"transform":"translate(215.2 399.2) rotate(22) scale(1.30) translate(-12 -12)","d":"M4 7h16M4 7l2 13h12l2-13M9 7V4h6v3"},[]],["path",{"transform":"translate(257.4 403.8) rotate(-4) scale(1.10) translate(-12 -12)","d":"M3 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM14 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM10 13h4M3 13l1-5M21 13l-1-5"},[]],["path",{"transform":"translate(257.4 -16.2) rotate(-4) scale(1.10) translate(-12 -12)","d":"M3 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM14 13a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0zM10 13h4M3 13l1-5M21 13l-1-5"},[]],["path",{"transform":"translate(296.9 398.6) rotate(-2) scale(1.22) translate(-12 -12)","d":"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"},[]],["path",{"transform":"translate(356.4 407.9) rotate(0) scale(1.24) translate(-12 -12)","d":"M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M10 5l2 2 2-2M10 19l2-2 2 2"},[]],["path",{"transform":"translate(356.4 -12.1) rotate(0) scale(1.24) translate(-12 -12)","d":"M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M10 5l2 2 2-2M10 19l2-2 2 2"},[]],["path",{"transform":"translate(394.2 393.7) rotate(-1) scale(1.20) translate(-12 -12)","d":"M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM3 15c2 2 9 1 14-2s7-6 5-7-6 0-8 1"},[]],["path",{"d":"M242.5 394.6q2-3 4 0t4 0"},[]],["path",{"d":"M161.4 67.5q2-3 4 0t4 0"},[]],["path",{"d":"M347.1 123.8h6M350.1 120.8v6"},[]],["path",{"d":"M356.5 61.7q2-3 4 0t4 0"},[]],["path",{"d":"M369.8 242.1h6M372.8 239.1v6"},[]],["path",{"d":"M175.7 171.0q2-3 4 0t4 0"},[]],["path",{"d":"M10.5 342.8q2-3 4 0t4 0"},[]],["path",{"d":"M365.4 348.4h6M368.4 345.4v6"},[]],["path",{"d":"M64.0 94.1h6M67.0 91.1v6"},[]],["path",{"d":"M26.2 72.8h6M29.2 69.8v6"},[]],["circle",{"cx":"140.6","cy":"177.6","r":"2.4"},[]],["circle",{"cx":"126.2","cy":"390.7","r":"1.6"},[]],["path",{"d":"M52.8 345.4h6M55.8 342.4v6"},[]],["path",{"d":"M57.2 296.1q2-3 4 0t4 0"},[]],["path",{"d":"M344.8 211.7h6M347.8 208.7v6"},[]],["path",{"d":"M61.1 315.1q2-3 4 0t4 0"},[]],["path",{"d":"M206.2 305.3h6M209.2 302.3v6"},[]],["circle",{"cx":"37.6","cy":"270.9","r":"2.4"},[]],["circle",{"cx":"269.5","cy":"191.1","r":"1.8"},[]],["path",{"d":"M69.9 252.9q2-3 4 0t4 0"},[]],["path",{"d":"M209.7 274.9q2-3 4 0t4 0"},[]],["circle",{"cx":"217.9","cy":"324.6","r":"2.0"},[]],["path",{"d":"M29.0 264.2h6M32.0 261.2v6"},[]],["circle",{"cx":"98.5","cy":"319.3","r":"2.0"},[]],["path",{"d":"M291.0 385.1h6M294.0 382.1v6"},[]],["path",{"d":"M206.5 140.8h6M209.5 137.8v6"},[]],["path",{"d":"M43.1 375.2h6M46.1 372.2v6"},[]],["circle",{"cx":"346.6","cy":"140.2","r":"1.0"},[]],["circle",{"cx":"239.0","cy":"181.4","r":"2.4"},[]],["circle",{"cx":"145.8","cy":"249.0","r":"1.6"},[]],["path",{"d":"M130.8 76.2h6M133.8 73.2v6"},[]],["path",{"d":"M374.3 262.1q2-3 4 0t4 0"},[]],["path",{"d":"M85.0 44.7h6M88.0 41.7v6"},[]],["circle",{"cx":"379.0","cy":"125.8","r":"1.7"},[]],["path",{"d":"M125.6 82.0q2-3 4 0t4 0"},[]],["circle",{"cx":"260.6","cy":"69.4","r":"2.4"},[]],["path",{"d":"M348.5 194.5q2-3 4 0t4 0"},[]],["path",{"d":"M390.0 216.9h6M393.0 213.9v6"},[]],["circle",{"cx":"250.1","cy":"106.3","r":"2.3"},[]],["path",{"d":"M252.1 411.3h6M255.1 408.3v6"},[]],["path",{"d":"M66.2 288.0h6M69.2 285.0v6"},[]],["path",{"d":"M175.0 300.2h6M178.0 297.2v6"},[]],["path",{"d":"M372.6 206.1h6M375.6 203.1v6"},[]],["circle",{"cx":"14.5","cy":"174.7","r":"1.6"},[]],["path",{"d":"M175.2 322.8q2-3 4 0t4 0"},[]],["path",{"d":"M216.0 319.3q2-3 4 0t4 0"},[]]]]]],"waves-amber.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#f59e0b","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-aqua.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#06b6d4","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-arctic.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#7dd3fc","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-berry.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#7b2cbf","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-blossom.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#ffafcc","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-blush.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#f472b6","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-charcoal.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#4b5563","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-cherry.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#be123c","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-citrus.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#facc15","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-copper.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#c2703d","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-coral.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#fb7185","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-cyber.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#00f0ff","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-denim.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#3b5998","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-desert.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#e09f3e","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-ember.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#ef4444","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-emerald.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#10b981","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-flamingo.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#ff6f91","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-forest.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#16a34a","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-galaxy.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#7c3aed","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-glacier.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#a8dadc","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-gold.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#d4af37","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-grape.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#9333ea","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-honey.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#f4a261","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-ice.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#67e8f9","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-indigo.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#6366f1","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-jungle.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#15803d","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-lavender.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#a78bfa","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-lime.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#a3e635","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-midnight.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#3b5bdb","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-mint.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#34d399","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-mocha.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#8b5e3c","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-ocean.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#0ea5e9","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-olive.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#84a33a","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-peach.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#fdba74","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-pearl.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#e2e8f0","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-plum.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#a21caf","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-quartz.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#f9a8d4","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-rainforest.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#2d6a4f","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-ruby.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#e11d48","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-sand.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#d6b98c","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-sapphire.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#3b82f6","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-sky.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#60a5fa","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-slate.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#64748b","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-steel.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#94a3b8","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-sunset.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#f97316","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-teal.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#14b8a6","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-tropical.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#06d6a0","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]],"waves-volcano.svg":["svg",{"xmlns":"http://www.w3.org/2000/svg","width":"120","height":"40"},[["path",{"d":"M0 20 Q15 5 30 20 T60 20 T90 20 T120 20","fill":"none","stroke":"#dc2626","stroke-opacity":"0.3","stroke-width":"1.6"},[]]]]};
/* Field-level records avoid replacing another tab's unrelated account or setting.
 * GM values are shared across the three matched origins. No Google page storage.
 * Concurrent changes to the SAME field use last-write-wins; not a distributed lock.
 */
function createStorage(api, onError = () => {}) {
  const prefix = 'csprozi:1:', pulse = 'csprozi:changed';
  const listeners = new Set(), baseline = new Map();
  const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const recordKey = (key, parts) => prefix + JSON.stringify([key,...parts]);
  const allowed = key => /^(cs6|cs6prof|cs6acct|cs6acctdiag|cs7imgs|cs5|cs5img|cs6img|cs7i:[\w-]+)$/.test(key);
  function flatten(value, parts = [], out = new Map()) {
    if (value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length) {
      for (const [key,v] of Object.entries(value)) {
        if (['__proto__','constructor','prototype','_w'].includes(key)) continue;
        flatten(v,[...parts,key],out);
      }
    } else out.set(JSON.stringify(parts),value);
    return out;
  }
  function read(key) {
    let result;
    for (const name of api.list()) {
      if (!name.startsWith(prefix)) continue;
      const [k,...parts] = JSON.parse(name.slice(prefix.length));
      if (k !== key || parts.some(p=>['__proto__','constructor','prototype'].includes(p))) continue;
      const record = api.get(name);
      if (!record || record.deleted) continue;
      if (!parts.length) { result = clone(record.value); continue; }
      if (!result || typeof result !== 'object') result = {};
      let cur = result;
      for (const part of parts.slice(0,-1)) cur = cur[part] ||= {};
      cur[parts.at(-1)] = clone(record.value);
    }
    return result;
  }
  const keys = () => [...new Set(api.list().filter(k=>k.startsWith(prefix)).map(k=>JSON.parse(k.slice(prefix.length))[0]))];
  function notify(changes) { if(Object.keys(changes).length) for(const fn of listeners) fn(clone(changes),'local'); }
  function refresh() {
    const changes={};
    for(const k of new Set([...keys(),...baseline.keys()])) {
      const value=read(k),old=baseline.get(k);
      if(!equal(old,value)) {baseline.set(k,clone(value));changes[k]={oldValue:old,newValue:value};}
    }
    notify(changes);
  }
  const listenerId = api.listen(pulse, (_k,_old,_new,remote)=>{if(remote)refresh();});
  function get(request,cb) {
    const selected=request==null?keys():typeof request==='string'?[request]:Array.isArray(request)?request:Object.keys(request);
    const result={};
    for(const k of selected) { const value=read(k); baseline.set(k,clone(value)); if(value!==undefined) result[k]=value; else if(request && !Array.isArray(request) && typeof request==='object') result[k]=request[k]; }
    if(cb)cb(clone(result));
    return Promise.resolve(clone(result));
  }
  function set(values,cb) {
    try {
      const changes={};
      for(const [key,raw] of Object.entries(values)) {
        if(!allowed(key))throw Error('Unsupported storage key');
        const old=baseline.has(key)?baseline.get(key):read(key);
        const before=flatten(old),after=flatten(raw);
        for(const parts of new Set([...before.keys(),...after.keys()])) {
          if(equal(before.get(parts),after.get(parts)))continue;
          api.set(recordKey(key,JSON.parse(parts)),after.has(parts)?{value:after.get(parts)}:{deleted:true});
        }
        const value=read(key); baseline.set(key,clone(value));
        // Preserve the upstream writer token only in the local event.
        changes[key]={oldValue:old,newValue:raw && raw._w?{...value,_w:raw._w}:value};
      }
      api.set(pulse,{at:Date.now(),nonce:Math.random()});
      notify(changes); if(cb)cb(); return Promise.resolve();
    } catch(error) { onError(error); throw error; }
  }
  function remove(request,cb) {
    const selected=typeof request==='string'?[request]:request;
    const changes={};
    for(const key of selected) {
      const old=read(key);
      for(const name of api.list()) if(name.startsWith(prefix)&&JSON.parse(name.slice(prefix.length))[0]===key)api.set(name,{deleted:true});
      baseline.set(key,undefined);changes[key]={oldValue:old,newValue:undefined};
    }
    api.set(pulse,{at:Date.now(),nonce:Math.random()});notify(changes);if(cb)cb();return Promise.resolve();
  }
  return {get,set,remove,refresh,keys,dispose:()=>api.unlisten(listenerId),onChanged:{addListener:fn=>listeners.add(fn),removeListener:fn=>listeners.delete(fn)}};
}

/* SVG assets are compiled into node recipes: no HTML sinks, image URL, CSP escape,
 * raster approximation, or network request. The original paths are unchanged. */
const assetNS = 'http://www.w3.org/2000/svg';
let patternSequence = 0;
function assetNode(recipe) {
  const [tag,attrs,children] = recipe;
  const node = document.createElementNS(assetNS,tag);
  for(const [name,value] of Object.entries(attrs)) node.setAttribute(name,value);
  for(const child of children)node.append(assetNode(child));
  return node;
}
function patternNode(name, width, height) {
  const recipe=CS_ASSETS[name]; if(!recipe)throw Error('Missing embedded asset: '+name);
  const source=assetNode(recipe),a=recipe[1];
  const view=a.viewBox || `0 0 ${a.width} ${a.height}`;
  const dims=view.split(/\s+/).map(Number);
  height ||= width*dims[3]/dims[2];
  const root=document.createElementNS(assetNS,'svg');
  root.setAttribute('aria-hidden','true');root.setAttribute('class','cs-asset');
  const defs=document.createElementNS(assetNS,'defs'),pattern=document.createElementNS(assetNS,'pattern');
  const id='cs-pattern-'+(++patternSequence);
  for(const [k,v] of Object.entries({id,patternUnits:'userSpaceOnUse',width,height}))pattern.setAttribute(k,v);
  source.setAttribute('viewBox',view);source.setAttribute('width',width);source.setAttribute('height',height);
  pattern.append(source);defs.append(pattern);
  const rect=document.createElementNS(assetNS,'rect');rect.setAttribute('width','100%');rect.setAttribute('height','100%');rect.setAttribute('fill',`url(#${id})`);
  root.append(defs,rect);return root;
}
const assetLayers=new Map();
function embeddedBackground(target,d,area) {
  const prev=assetLayers.get(target);
  const signature=d?.asset?JSON.stringify(d.asset):'';
  if(prev?.signature===signature && prev.node.isConnected)return;
  if(prev){prev.observer.disconnect();prev.node.remove();assetLayers.delete(target);}
  if(!signature)return;
  const node=patternNode(...d.asset);
  const isCard=target.classList.contains('cs-card');
  const positioned=getComputedStyle(target).position!=='static';
  const box=area||target;
  if(isCard){node.classList.add('cs-asset-card');target.prepend(node);}
  else if(target===document.body){node.classList.add('cs-asset-fixed');target.prepend(node);}
  else if(positioned){node.classList.add('cs-asset-absolute');target.classList.add('cs-il-host');target.prepend(node);}
  else {node.classList.add('cs-asset-sticky');box.classList.add('cs-il-host');box.prepend(node);}
  const resize=()=>{if(node.classList.contains('cs-asset-sticky')){node.style.height=box.clientHeight+'px';node.style.marginBottom=-box.clientHeight+'px';}};
  resize();const observer=new ResizeObserver(resize);observer.observe(box);
  assetLayers.set(target,{node,signature,observer});
}
function clearEmbedded(target) {
  const old=assetLayers.get(target);if(old){old.observer.disconnect();old.node.remove();assetLayers.delete(target);}
}

function googleRequest(url) { return new Promise((resolve,reject)=>GM_xmlhttpRequest({url,method:'GET',timeout:12000,onload:r=>resolve({ok:r.status>=200&&r.status<300,status:r.status,text:async()=>r.responseText}),onerror:()=>reject(Error('network unavailable')),ontimeout:()=>reject(Error('request timeout'))})); }
/* Chat Studio — background helper.
   Reads the list of Google accounts signed in to this browser (the same list Chrome itself and Google's account menu use),
   so that every account can get its own design. The list is kept only in this browser's extension storage. */
const AKEY = 'cs6acct';
let last = { at: 0, res: null };

/* ["gaia.l.a.r", [["gaia.l.a", ?, name, email, photo, ?, ?, ?, ?, valid, gaiaId, ?, ?, ?, signedOut, verified], ...]] */
function parseList(text) {
  const start = text.indexOf('[');
  if (start < 0) return [];
  const data = JSON.parse(text.slice(start));
  const rows = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
  const out = [];
  let idx = 0;
  for (const r of rows) {
    if (!Array.isArray(r) || typeof r[3] !== 'string' || !r[3].includes('@')) continue;
    const signedOut = r[14] === 1;
    out.push({ email: r[3].toLowerCase(), name: typeof r[2] === 'string' ? r[2] : '', photo: typeof r[4] === 'string' ? r[4] : '', gaia: typeof r[10] === 'string' ? r[10] : '', idx: signedOut ? null : idx, out: signedOut });
    if (!signedOut) idx++;
  }
  return out;
}
/* Google's account chooser page lists the same accounts; used when the list above is not available */
function parseChooser(html) {
  const out = [], seen = new Set();
  const re = /data-authuser="(-?\d+)"[\s\S]{0,4000}?([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
  let m;
  while ((m = re.exec(html))) { const e = m[2].toLowerCase(); if (seen.has(e)) continue; seen.add(e); out.push({ email: e, name: '', photo: '', gaia: '', idx: +m[1] >= 0 ? +m[1] : null, out: +m[1] < 0 }); }
  return out;
}
const SOURCES = [
  ['list', 'https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumAccountReconcilor&json=standard'],
  ['list', 'https://accounts.google.com/ListAccounts?gpsia=1&source=ogb&json=standard&listPages=0&mo=1&mn=1'],
  ['list', 'https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumBrowser&json=standard'],
  ['chooser', 'https://accounts.google.com/AccountChooser?hl=en']
];
async function readAccounts() {
  const errors = [];
  for (const [kind, url] of SOURCES) {
    try {
      const res = await googleRequest(url);
      if (!res.ok) { errors.push(kind + ' ' + res.status); continue; }
      const text = await res.text();
      const list = kind === 'list' ? parseList(text) : parseChooser(text);
      if (list.length) return { ok: true, list, how: kind };
      errors.push(kind + ' empty');
    } catch (e) { errors.push(kind + ' ' + (e && e.message || e)); }
  }
  return { ok: false, list: [], error: errors.join(' · ') };
}

async function listAccounts(force) {
  if (!force && last.res && last.res.ok && Date.now() - last.at < 60000) return last.res;
  const res = await readAccounts();
  last = { at: Date.now(), res };
  await csPlatform.storage.local.set({ cs6acctdiag: { at: Date.now(), ok: res.ok, how: res.how || '', error: res.error || '', n: res.list.length } });
  if (!res.ok) return res;
  // merge into the stored account list (never overwrite what the pages learned, e.g. who "me" is in Chat)
  const d = await csPlatform.storage.local.get([AKEY]);
  const A = (d[AKEY] && d[AKEY].a) || {};
  let changed = false;
  for (const a of res.list) {
    const cur = A[a.email] || {};
    const next = { ...cur, email: a.email, name: a.name || cur.name || '', photo: a.photo || cur.photo || '', gaia: a.gaia || cur.gaia || '', idx: a.idx, out: a.out || undefined, seen: cur.seen || 1 };
    if (a.idx != null) for (const k in A) if (k !== a.email && A[k].idx === a.idx) { if (!A[k].email) { if (A[k].me && !next.me) next.me = A[k].me; delete A[k]; } else A[k] = { ...A[k], idx: null }; changed = true; }
    if (JSON.stringify(next) !== JSON.stringify(cur)) { A[a.email] = next; changed = true; }
  }
  if (changed) await csPlatform.storage.local.set({ [AKEY]: { _w: 'bg', a: A } });
  return res;
}


const storageErrors=[];
function storageError() {
  storageErrors.push({at:Date.now(),code:'storage-write-failed'});
  if(storageErrors.length>10)storageErrors.shift();
  if(!document.body)return;
  let notice=document.getElementById('cs-storage-error');
  if(!notice){notice=document.createElement('div');notice.id='cs-storage-error';notice.className='cs-toast';notice.setAttribute('role','alert');document.body.append(notice);}
  notice.textContent='Chat Studio: השמירה נכשלה. פנו מקום באחסון ונסו שוב. / Save failed; free storage and retry.';
}
const gmStorage=createStorage({get:GM_getValue,set:GM_setValue,list:GM_listValues,listen:GM_addValueChangeListener,unlisten:GM_removeValueChangeListener},storageError);
const csPlatform={storage:{local:gmStorage,onChanged:gmStorage.onChanged},runtime:{lastError:null,sendMessage(msg,cb){
  if(msg?.type!=='cs-accounts'){cb({ok:false,list:[],error:'Unsupported request'});return;}
  listAccounts(Boolean(msg.force)).then(cb,()=>cb({ok:false,list:[],error:'Account lookup unavailable'}));
}}};
addEventListener('pageshow',()=>gmStorage.refresh());
addEventListener('pagehide',()=>{for(const target of assetLayers.keys())clearEmbedded(target);});

const BACKUP_FORMAT='chat-studio-prozi';
function validateBackup(input) {
  if(!input || input.format!==BACKUP_FORMAT || input.schema!==1 || !input.values || typeof input.values!=='object' || Array.isArray(input.values))throw Error('Unsupported backup');
  const values=JSON.parse(JSON.stringify(input.values));
  const inspect=v=>{if(v && typeof v==='object')for(const [k,x] of Object.entries(v)){if(['__proto__','constructor','prototype'].includes(k))throw Error('Unsafe key');inspect(x);}};
  inspect(values);
  for(const [key,value]of Object.entries(values)){
    if(!/^(cs6|cs6prof|cs6acct|cs7imgs|cs5|cs5img|cs6img|cs7i:[\w-]+)$/.test(key))throw Error('Unknown key');
    if(key.startsWith('cs7i:') && (typeof value!=='string'|| !/^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(value)||value.length>24e6))throw Error('Invalid image');
  }
  const look=o=>{
    if(!o || typeof o!=='object'||Array.isArray(o))throw Error('Invalid settings');
    for(const [k,v]of Object.entries(o)){
      if(k==='_w')continue;
      if(k==='custom'){if(!v||!['a','b','c'].every(c=>/^#[\da-f]{6}$/i.test(v[c])))throw Error('Invalid colors');}
      else if(k==='favs'){if(!Array.isArray(v)||v.length>2000||v.some(x=>typeof x!=='string'||!/^[-\w:]+$/.test(x)))throw Error('Invalid favorites');}
      else if(typeof v==='string' && (!/^[-\w:@.]+$/.test(v)||v.length>200))throw Error('Invalid setting');
      else if(typeof v!=='string' && typeof v!=='boolean' && (typeof v!=='number'||!Number.isFinite(v)||Math.abs(v)>10000))throw Error('Invalid setting type');
    }
  };
  if(values.cs6)look(values.cs6);if(values.cs5)look(values.cs5);
  if(values.cs6prof){if(!values.cs6prof.p||typeof values.cs6prof.p!=='object')throw Error('Invalid profiles');for(const [key,p]of Object.entries(values.cs6prof.p)){if(!/^[\w.+-]+@[\w.-]+$/.test(key)&&!/^u\d+$/.test(key))throw Error('Invalid account');look(p);}}
  if(values.cs7imgs){const x=values.cs7imgs.x;if(!Array.isArray(x)||x.length>12)throw Error('Invalid image index');const seen=new Set();for(const e of x){if(!e||!/^[-\w]+$/.test(e.id)||seen.has(e.id)||!['d','u'].includes(e.t))throw Error('Invalid image entry');seen.add(e.id);if(e.t==='d'&&!values['cs7i:'+e.id])throw Error('Missing image');if(e.t==='u'&&!/^https?:\/\/\S+$/.test(e.u))throw Error('Invalid URL');if(e.th&&!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(e.th))throw Error('Invalid thumbnail');}}
  return values;
}
async function exportBackup(){const values=await gmStorage.get(null);delete values.cs6acctdiag;return {format:BACKUP_FORMAT,schema:1,version:CS_VERSION,values};}
function downloadJSON(value,name){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}
function backupControls(el,lang){
  const he=lang==='he';
  const status=el('div',{class:'cs-note',role:'status'});
  const file=el('input',{type:'file',accept:'.json,application/json',class:'cs-hide',onchange:async e=>{
    try{const f=e.target.files?.[0];if(!f)return;if(f.size>220e6)throw Error('Backup too large');const values=validateBackup(JSON.parse(await f.text()));
      // Preserve a private rollback snapshot before replacing settings.
      GM_setValue('csprozi:last-backup',await exportBackup());
      await gmStorage.set(values);status.textContent=he?'הגיבוי יובא. רעננו את הדפים הפתוחים.':'Imported. Reload open tabs.';
    }catch{status.textContent=he?'הייבוא נכשל. בדקו שהקובץ הוא גיבוי תקין.':'Import failed. Check the backup file.';}
  }});
  return [el('div',{class:'cs-sec'},he?'גיבוי מלא ושחזור':'Full backup and restore'),
    el('div',{class:'cs-note'},he?'כולל תמונות ופרופילים עם כתובות החשבונות. שמרו את הקובץ באופן פרטי.':'Includes images and account addresses. Keep the file private.'),
    el('div',{class:'cs-row'},el('button',{class:'cs-pb',type:'button',onclick:async()=>downloadJSON(await exportBackup(),'chat-studio-backup.json')},he?'ייצוא גיבוי':'Export backup'),
      el('button',{class:'cs-pb cs-ghost',type:'button',onclick:()=>file.click()},he?'ייבוא גיבוי':'Import backup'),file),
    el('button',{class:'cs-pb cs-ghost',type:'button',onclick:async()=>{try{const b=GM_getValue('csprozi:last-backup');await gmStorage.set(validateBackup(b));status.textContent=he?'שוחזר הגיבוי שלפני הייבוא.':'Pre-import backup restored.';}catch{status.textContent=he?'אין גיבוי שחזור תקין.':'No valid recovery backup.';}}},he?'שחזור לפני הייבוא האחרון':'Restore before last import'),status,
    el('a',{class:'cs-credit',href:CS_HOME,target:'_blank',rel:'noopener noreferrer'},he?'מדריך שימוש ועדכונים':'Guide and updates')];
}

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

if(location.hostname==='ogs.google.com'){/* Chat Studio — notes which Google accounts are signed in, from Google's own account menu (the profile picture in the corner),
   so that each account can get its own design. The list stays in this browser's extension storage and is never sent anywhere. */
(() => {
  if (window.__csAccts) return;
  window.__csAccts = true;
  const RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
  const FID = 'ogs' + Math.random().toString(36).slice(2);
  let last = '';
  const idxIn = s => { const m = String(s || '').match(/authuser=(\d+)/) || String(s || '').match(/\/u\/(\d+)(?=\/|$|\?|#)/); return m ? +m[1] : null; };
  function scan() {
    if (!document.body) return;
    const found = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode());) {
      const t = n.nodeValue;
      if (!t || t.indexOf('@') < 0) continue;
      for (const m of t.matchAll(RE)) {
        const email = m[0].toLowerCase();
        if (found.has(email)) continue;
        const holder = n.parentElement;
        let idx = null;
        for (let x = holder, i = 0; x && i < 7 && idx == null; x = x.parentElement, i++) {
          const au = x.getAttribute('data-authuser');
          if (au && /^\d+$/.test(au)) idx = +au;
          else idx = idxIn(x.getAttribute('href')) ?? (x.closest('a[href]') ? idxIn(x.closest('a[href]').getAttribute('href')) : null);
        }
        let name = '';
        const box = holder && holder.parentElement;
        if (box) for (const c of box.children) { const s = (c.textContent || '').trim(); if (c !== holder && s && !s.includes('@') && s.length < 60) { name = s; break; } }
        found.set(email, { email, idx, name });
      }
    }
    if (!found.size) return;
    const sig = JSON.stringify([...found.values()]);
    if (sig === last) return;
    last = sig;
    try {
      csPlatform.storage.local.get(['cs6acct'], d => {
        const A = (d && d.cs6acct && d.cs6acct.a) || {};
        let changed = false;
        for (const f of found.values()) {
          const cur = A[f.email] || {};
          const next = { ...cur, email: f.email };
          if (f.name && !cur.name) next.name = f.name;
          if (cur.idx == null && f.idx != null) next.idx = f.idx;
          if (!cur.seen) next.seen = 1; // known, not opened yet
          if (JSON.stringify(next) !== JSON.stringify(cur)) { A[f.email] = next; changed = true; }
        }
        if (changed) csPlatform.storage.local.set({ cs6acct: { _w: FID, a: A } });
      });
    } catch {}
  }
  let t = 0;
  const later = () => { clearTimeout(t); t = setTimeout(scan, 400); };
  scan();
  const mo = new MutationObserver(later);
  if (document.body) mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => mo.disconnect(), 60000);
})();

return;}
GM_addStyle("/* ================= Chat Studio v15 — static styles ================= */\n\n/* ---------- Toolbar button ---------- */\n.cs-root { display: inline-flex !important; align-items: center; position: relative; flex: none; }\n.cs-btn {\n  all: unset; box-sizing: border-box; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; position: relative;\n  display: inline-flex !important; align-items: center; justify-content: center; margin: 0 2px;\n  transition: background .25s, transform .3s cubic-bezier(.2,.9,.3,1.5);\n}\n.cs-btn svg { width: 22px; height: 22px; pointer-events: none; transition: transform .45s cubic-bezier(.2,.9,.3,1.6); }\n.cs-btn::after { content: \"\"; position: absolute; inset: 3px; border-radius: 50%; border: 2px solid transparent;\n  background: linear-gradient(135deg,#7c5cff,#00c9c8,#ff6b9d) border-box; -webkit-mask: linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0);\n  -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transform: scale(.7); transition: .35s; }\n.cs-btn:hover { background: rgba(124,92,255,.1); }\n.cs-btn:hover svg { transform: rotate(-20deg) scale(1.15); }\n.cs-btn:hover::after, .cs-btn.cs-active::after { opacity: 1; transform: scale(1); animation: cs-spin 3s linear infinite; }\n.cs-btn.cs-fab { position: fixed; bottom: 96px; left: 22px; z-index: 2147483000; width: 50px; height: 50px;\n  background: linear-gradient(135deg,#7c5cff,#00c9c8); box-shadow: 0 10px 28px rgba(124,92,255,.5); animation: cs-float 3s ease-in-out infinite; }\n.cs-btn.cs-fab svg { filter: brightness(0) invert(1); }\n@keyframes cs-float { 50% { transform: translateY(-4px) } }\n@keyframes cs-spin { to { transform: rotate(360deg) } }\n\n/* ---------- Panel ---------- */\n#cs-panel {\n  position: fixed; width: min(384px, calc(100vw - 16px)); max-height: min(640px, calc(100vh - 16px)); z-index: 2147483001;\n  display: flex; flex-direction: column; isolation: isolate; overflow: hidden;\n  border-radius: 24px; padding: 14px 14px 10px; font: 13px/1.4 \"Google Sans\", Roboto, Arial, sans-serif; text-align: start;\n  background: rgba(255,255,255,.84); backdrop-filter: blur(26px) saturate(1.8); -webkit-backdrop-filter: blur(26px) saturate(1.8);\n  border: 1px solid rgba(255,255,255,.75); color: #1d1b2e;\n  box-shadow: 0 30px 80px rgba(30,20,80,.3), 0 0 0 1px rgba(124,92,255,.12);\n  opacity: 0; transform: translateY(16px) scale(.94); pointer-events: none; visibility: hidden;\n  transition: opacity .32s cubic-bezier(.2,.9,.3,1.2), transform .32s cubic-bezier(.2,.9,.3,1.25), visibility .32s;\n}\n#cs-panel.cs-open { opacity: 1; transform: none; pointer-events: auto; visibility: visible; }\n#cs-panel::before { content: \"\"; position: absolute; inset: 0 0 auto 0; height: 4px; z-index: 2;\n  background: linear-gradient(90deg,#7c5cff,#00c9c8,#ff6b9d,#ffd166,#7c5cff); background-size: 300% 100%; animation: cs-flow 6s linear infinite; }\n#cs-panel::after { content: \"\"; position: absolute; inset: -50%; z-index: -1; pointer-events: none;\n  background: radial-gradient(circle at 30% 30%, rgba(124,92,255,.16), transparent 30%), radial-gradient(circle at 70% 65%, rgba(0,201,200,.14), transparent 30%), radial-gradient(circle at 60% 25%, rgba(255,107,157,.1), transparent 25%);\n  animation: cs-spin 30s linear infinite; }\n#cs-panel.cs-dark { background: rgba(18,18,30,.9); color: #ecebff; border-color: rgba(255,255,255,.08); }\n#cs-panel * { box-sizing: border-box; font-family: inherit; }\n#cs-panel ::-webkit-scrollbar { width: 6px; height: 0 } #cs-panel ::-webkit-scrollbar-thumb { background: rgba(124,92,255,.4); border-radius: 6px }\n\n.cs-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }\n.cs-title { font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 8px; min-width: 0; }\n.cs-title b { white-space: nowrap; background: linear-gradient(90deg,#7c5cff,#00c9c8,#ff6b9d,#7c5cff); background-size: 300% auto;\n  -webkit-background-clip: text; background-clip: text; color: transparent; animation: cs-shine 6s linear infinite; }\n.cs-title svg { width: 26px; height: 26px; flex: none; }\n@keyframes cs-shine { to { background-position: 300% center } }\n.cs-hbtns { display: flex; gap: 6px; flex: none; }\n.cs-ib { all: unset; box-sizing: border-box; height: 32px; min-width: 32px; padding: 0 9px; border-radius: 11px; cursor: pointer;\n  background: rgba(127,127,170,.14); font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 5px; transition: .25s; }\n.cs-ib:hover { background: rgba(124,92,255,.22); transform: translateY(-1px); }\n.cs-ib svg { width: 17px; height: 17px; transition: transform .5s cubic-bezier(.2,.9,.3,1.6); }\n.cs-ib:hover svg { transform: rotate(180deg) scale(1.1); }\n.cs-ib.cs-grad { background: linear-gradient(135deg,#7c5cff,#00c9c8); color: #fff; box-shadow: 0 4px 14px rgba(124,92,255,.4); }\n\n.cs-tabs { display: flex; gap: 4px; padding: 4px; margin: 10px 0 8px; border-radius: 15px; background: rgba(127,127,170,.12); flex: none; }\n.cs-tab { all: unset; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 7px 2px 6px; border-radius: 11px;\n  cursor: pointer; font-size: 11px; font-weight: 800; opacity: .75; transition: .3s; }\n.cs-tab svg { width: 21px; height: 21px; transition: transform .4s cubic-bezier(.2,.9,.3,1.7); }\n.cs-tab:hover { opacity: 1; } .cs-tab:hover svg { transform: translateY(-2px) scale(1.12); }\n.cs-tab.cs-on { opacity: 1; background: #fff; color: #5b3df5; box-shadow: 0 4px 16px rgba(124,92,255,.25); }\n#cs-panel.cs-dark .cs-tab.cs-on { background: rgba(255,255,255,.1); color: #c4b5fd; }\n\n.cs-body { flex: 1; overflow-y: auto; overflow-x: hidden; margin: 0 -6px; padding: 2px 6px 8px; min-height: 120px; }\n.cs-sec { margin: 14px 2px 8px; font-size: 11.5px; font-weight: 800; letter-spacing: .4px; opacity: .72; display: flex; align-items: center; gap: 7px; }\n.cs-sec:first-child { margin-top: 4px; }\n.cs-sec svg { width: 17px; height: 17px; }\n.cs-banner { margin: 2px 0 8px; padding: 8px 10px; border-radius: 12px; font-size: 11.5px; font-weight: 700;\n  background: linear-gradient(135deg,rgba(124,92,255,.15),rgba(0,201,200,.12)); }\n\n.cs-search { position: relative; margin-bottom: 6px; }\n.cs-search svg { position: absolute; top: 50%; inset-inline-start: 11px; width: 16px; height: 16px; transform: translateY(-50%); pointer-events: none; }\n.cs-search .cs-input { width: 100%; padding-inline-start: 34px; }\n\n.cs-chips { display: flex; gap: 6px; overflow-x: auto; padding: 4px 2px 8px; scrollbar-width: none; scroll-behavior: smooth; }\n.cs-chip { all: unset; flex: none; white-space: nowrap; padding: 6px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 800; cursor: pointer;\n  background: rgba(127,127,170,.13); transition: .25s; display: inline-flex; align-items: center; gap: 5px; }\n.cs-chip svg { width: 14px; height: 14px; }\n.cs-chip:hover { background: rgba(124,92,255,.2); transform: translateY(-1px); }\n.cs-chip.cs-on { background: linear-gradient(135deg,#7c5cff,#00c9c8); color: #fff; box-shadow: 0 4px 14px rgba(124,92,255,.38); }\n\n.cs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }\n.cs-grid.cs-g4 { grid-template-columns: repeat(4,1fr); }\n.cs-grid.cs-g5 { grid-template-columns: repeat(5,1fr); gap: 6px; }\n.cs-fitcard { height: 64px !important; display: flex; align-items: center; justify-content: center; background: rgba(127,127,170,.1); }\n.cs-fitcard svg { width: 34px; height: 34px; margin-bottom: 14px; }\n.cs-grid > * { animation: cs-cardin .4s cubic-bezier(.2,.9,.3,1.3) both; }\n@keyframes cs-cardin { from { opacity: 0; transform: translateY(10px) scale(.92) } }\n.cs-card { position: relative; height: 76px; border-radius: 15px; cursor: pointer; overflow: hidden; border: 2px solid rgba(127,127,170,.12);\n  transition: transform .28s cubic-bezier(.2,.9,.3,1.5), box-shadow .28s, border-color .2s; }\n.cs-g4 .cs-card { height: 62px; }\n.cs-card:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 12px 24px rgba(0,0,0,.2); z-index: 1; }\n.cs-card.cs-sel { border-color: #7c5cff; box-shadow: 0 0 0 3px rgba(124,92,255,.3); }\n.cs-card.cs-sel::after { content: \"\"; position: absolute; top: 5px; inset-inline-end: 5px; width: 18px; height: 18px; border-radius: 50%; z-index: 3;\n  background: #7c5cff;\n  animation: cs-pop .4s cubic-bezier(.2,.9,.3,1.8); box-shadow: 0 2px 6px rgba(0,0,0,.3); }\n@keyframes cs-pop { from { transform: scale(0) rotate(-120deg) } }\n.cs-lbl { position: absolute; bottom: 5px; inset-inline-start: 5px; max-width: calc(100% - 10px); padding: 1px 7px; border-radius: 7px; z-index: 2;\n  font-size: 10.5px; font-weight: 800; line-height: 1.35; background: rgba(0,0,0,.5); color: #fff; backdrop-filter: blur(4px);\n  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.cs-lbl small { font-weight: 600; opacity: .8; font-size: 9.5px; margin-inline-start: 3px; }\n.cs-bub { position: absolute; height: 13px; z-index: 1; }\n.cs-bub.b1 { top: 9px; inset-inline-start: 8px; width: 58%; }\n.cs-bub.b2 { top: 28px; inset-inline-end: 8px; width: 46%; }\n.cs-fav { all: unset; position: absolute; top: 4px; inset-inline-start: 4px; width: 20px; height: 20px; border-radius: 50%; z-index: 3; cursor: pointer;\n  display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.35); opacity: 0; transform: scale(.6); transition: .25s cubic-bezier(.2,.9,.3,1.6); }\n.cs-fav svg { width: 13px; height: 13px; }\n.cs-card:hover .cs-fav, .cs-fav.cs-on { opacity: 1; transform: scale(1); }\n.cs-fav:hover { transform: scale(1.25) !important; }\n.cs-x { all: unset; position: absolute; top: 4px; inset-inline-start: 4px; width: 20px; height: 20px; border-radius: 50%; z-index: 3; cursor: pointer;\n  background: rgba(0,0,0,.55); color: #fff; font-size: 13px; font-weight: 800; line-height: 20px; text-align: center; }\n.cs-empty { grid-column: 1 / -1; padding: 22px 10px; text-align: center; font-size: 12px; opacity: .65; }\n\n/* demo bubble (entry animations / shapes / fonts) */\n.cs-demo { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg,#f1efff,#e3fbfb); }\n#cs-panel.cs-dark .cs-demo { background: linear-gradient(135deg,#232340,#14303a); }\n.cs-db { width: 62%; height: 20px; border-radius: 12px 12px 12px 4px; background: linear-gradient(135deg,#7c5cff,#00c9c8); box-shadow: 0 4px 10px rgba(124,92,255,.35); margin-bottom: 14px; }\n.cs-ecard:hover .cs-db, .cs-ecard.cs-sel .cs-db { animation: var(--a) 1.5s cubic-bezier(.2,.9,.3,1.2) infinite both; }\n.cs-fxcard { display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 30%, #2a2d52, #0e1020); }\n.cs-fxcard svg { width: 44px; height: 44px; margin-bottom: 14px; }\n.cs-fontcard { height: auto !important; padding: 10px 10px 26px; font-size: 15px; display: flex; align-items: center; justify-content: center; text-align: center;\n  background: rgba(127,127,170,.08); }\n\n.cs-seg { display: flex; background: rgba(127,127,170,.13); border-radius: 13px; padding: 3px; gap: 3px; }\n.cs-seg button { all: unset; flex: 1; text-align: center; padding: 8px 4px; border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 800; transition: .25s; }\n.cs-seg button:hover { background: rgba(124,92,255,.12); }\n.cs-seg button.cs-on { background: linear-gradient(135deg,#7c5cff,#00c9c8); color: #fff; box-shadow: 0 4px 14px rgba(124,92,255,.4); }\n\n.cs-row { display: flex; gap: 6px; margin-top: 8px; align-items: center; }\n.cs-input { min-width: 0; flex: 1; border: 1px solid rgba(127,127,170,.35); background: rgba(255,255,255,.65); color: inherit;\n  border-radius: 11px; padding: 9px 11px; font-size: 12px; outline: none; transition: .2s; }\n#cs-panel.cs-dark .cs-input { background: rgba(255,255,255,.07); }\n.cs-input:focus { border-color: #7c5cff; box-shadow: 0 0 0 3px rgba(124,92,255,.22); }\n.cs-pb { all: unset; box-sizing: border-box; border-radius: 11px; padding: 9px 13px; cursor: pointer; font-size: 12px; font-weight: 800; color: #fff;\n  background: linear-gradient(135deg,#7c5cff,#00c9c8); display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: .25s; white-space: nowrap; }\n.cs-pb.cs-full { flex: 1; }\n.cs-pb.cs-ghost { background: rgba(127,127,170,.15); color: inherit; }\n.cs-pb:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(124,92,255,.4); }\n.cs-pb svg { width: 15px; height: 15px; }\n\n.cs-sw { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 4px; font-size: 13px; cursor: pointer; border-radius: 10px; transition: background .2s; }\n.cs-sw:hover { background: rgba(124,92,255,.07); }\n.cs-sw small { display: block; font-size: 11px; opacity: .6; }\n.cs-tg { position: relative; width: 42px; height: 24px; border-radius: 24px; background: rgba(127,127,170,.38); transition: .3s; flex: none; }\n.cs-tg::after { content: \"\"; position: absolute; top: 3px; inset-inline-start: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff;\n  transition: .35s cubic-bezier(.2,.9,.3,1.6); box-shadow: 0 2px 5px rgba(0,0,0,.25); }\n.cs-tg.cs-on { background: linear-gradient(135deg,#7c5cff,#00c9c8); }\n.cs-tg.cs-on::after { inset-inline-start: 21px; }\n.cs-range { width: 100%; accent-color: #7c5cff; }\n.cs-note { font-size: 11px; opacity: .6; }\n.cs-hide { display: none !important; }\n.cs-dim { opacity: .55; }\n\n.cs-credit { display: flex; align-items: center; justify-content: center; gap: 7px; width: fit-content; margin: 16px auto 4px; padding: 7px 15px;\n  border-radius: 999px; font-size: 12px; font-weight: 800; text-decoration: none !important; position: relative; overflow: hidden; cursor: pointer;\n  background: linear-gradient(135deg, rgba(124,92,255,.13), rgba(0,201,200,.13)); border: 1px solid rgba(124,92,255,.3);\n  transition: transform .3s cubic-bezier(.2,.9,.3,1.5), box-shadow .3s; animation: cs-credit-in .7s cubic-bezier(.2,.9,.3,1.3) both; }\n.cs-credit b { background: linear-gradient(90deg,#7c5cff,#00c9c8,#ff6b9d,#7c5cff); background-size: 300% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: cs-shine 5s linear infinite; font-weight: 800; }\n.cs-credit svg { width: 15px; height: 15px; flex: none; }\n.cs-credit::after { content: \"\"; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%); background-size: 250% 100%; animation: cs-sheen 4s ease-in-out infinite; pointer-events: none; }\n.cs-credit:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 20px rgba(124,92,255,.32); }\n@keyframes cs-credit-in { from { opacity: 0; transform: translateY(8px) scale(.9) } }\n.cs-toast { position: fixed; bottom: 34px; left: 50%; transform: translateX(-50%); z-index: 2147483002; background: #1d1b2e; color: #fff;\n  padding: 10px 18px; border-radius: 14px; font: 700 13px Roboto, Arial; box-shadow: 0 10px 30px rgba(0,0,0,.3); animation: cs-e-rise .4s both; }\n\n.cs-fx { position: fixed; pointer-events: none; z-index: 5; }\n\n/* ================= Messages (theme rules are generated at runtime) ================= */\n.cs-msg { box-sizing: border-box; }\nhtml.cs-on .cs-msg { line-height: 1.5 !important; word-break: break-word; transition: transform .25s ease, box-shadow .3s ease; }\nhtml.cs-on .cs-msg a { text-decoration: underline !important; }\nhtml.cs-on .cs-msg.cs-solo { display: inline-block !important; max-width: min(100%, 700px) !important; width: fit-content !important; }\nhtml.cs-on .cs-msg.cs-solo { position: relative; }\n/* quoted replies / link cards inside the bubble: translucent version of the theme, readable text (also for content that loads later) */\n/* quote boxes / link cards keep Google's background; their text is matched to that background so it is always readable */\nhtml.cs-on .cs-msg .cs-box.cs-light { color: #1f1f1f !important; text-shadow: none !important; font-weight: 400; }\nhtml.cs-on .cs-msg .cs-box.cs-dark { color: #f1f3f4 !important; text-shadow: none !important; font-weight: 400; }\nhtml.cs-on .cs-msg .cs-box { border-radius: 12px; }\nhtml.cs-on .cs-msg .cs-txt { background: transparent !important; }\n/* Google's own floating UI inside a bubble is never restyled */\nhtml.cs-on .cs-keep { text-shadow: none !important; }\n/* a bubble that holds an open Google popup (tooltip, menu, dialog): no transform / filter / animation / opacity,\n   which would move the popup or make it see-through, and it sits above its neighbours */\nhtml.cs-on .cs-msg.cs-hold { transform: none !important; filter: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; animation: none !important; opacity: 1 !important; }\nhtml.cs-on .cs-msg.cs-pos.cs-hold { z-index: 60 !important; }\nhtml.cs-on .cs-ontop { z-index: 1000 !important; }\n@keyframes cs-sheen2 { 0% { background-position: 150% 0, 0 0 } 60%, 100% { background-position: -100% 0, 0 0 } }\n\n/* uploaded-image background layer (canvas, so it never depends on the page's image policy) */\n.cs-il-host { isolation: isolate; }\n.cs-imglayer { pointer-events: none; display: block; z-index: -1; }\n.cs-imglayer.cs-il-sticky { position: sticky; top: 0; }\n.cs-imglayer.cs-il-fixed { position: fixed; top: 0; left: 0; }\n.cs-thumb { position: absolute; inset: 0; width: 100%; height: 100%; }\n.cs-custom { padding: 10px; border-radius: 16px; background: rgba(127,127,170,.09); margin-bottom: 8px; }\n.cs-colors { display: flex; gap: 8px; align-items: center; justify-content: space-between; }\n.cs-colors label { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; cursor: pointer; }\n.cs-colors input[type=color] { all: unset; width: 100%; height: 34px; border-radius: 11px; cursor: pointer; box-shadow: inset 0 0 0 2px rgba(255,255,255,.6), 0 3px 10px rgba(0,0,0,.15); }\n.cs-colors input[type=color]::-webkit-color-swatch-wrapper { padding: 0; } .cs-colors input[type=color]::-webkit-color-swatch { border: none; border-radius: 11px; }\n\n@keyframes cs-flow { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }\n@keyframes cs-sheen { 0%{background-position:150% 0} 60%,100%{background-position:-100% 0} }\n@keyframes cs-flick { 0%,92%,100% { opacity: 1 } 93% { opacity: .7 } 95% { opacity: 1 } 96% { opacity: .85 } }\n@keyframes cs-pulse { 0% { box-shadow: 0 0 0 0 var(--cs-pc) } 100% { box-shadow: 0 0 0 12px transparent } }\n@keyframes cs-wiggle { 25% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) } 75% { transform: rotate(-1deg) } }\n\n/* entry animations */\n@keyframes cs-e-fade { from { opacity: 0 } }\n@keyframes cs-e-rise { from { opacity: 0; transform: translateY(14px) } }\n@keyframes cs-e-pop { 0% { opacity: 0; transform: scale(.6) } 70% { transform: scale(1.06) } 100% { opacity: 1; transform: none } }\n@keyframes cs-e-slide { from { opacity: 0; transform: translateX(-36px) } }\n@keyframes cs-e-zoom { from { opacity: 0; transform: scale(1.45) } }\n@keyframes cs-e-flip { from { opacity: 0; transform: perspective(500px) rotateX(-85deg) } }\n@keyframes cs-e-blur { from { opacity: 0; filter: blur(10px); transform: scale(.95) } }\n@keyframes cs-e-bounce { 0% { opacity: 0; transform: translateY(-30px) } 50% { opacity: 1; transform: translateY(6px) } 72% { transform: translateY(-3px) } 100% { transform: none } }\n@keyframes cs-e-swing { 0% { opacity: 0; transform: rotate(-14deg); transform-origin: top left } 60% { transform: rotate(4deg) } 100% { opacity: 1; transform: none } }\n@keyframes cs-e-drop { from { opacity: 0; transform: translateY(-44px) scale(.9) } }\n@keyframes cs-e-spin { from { opacity: 0; transform: rotate(-200deg) scale(.3) } }\n@keyframes cs-e-elastic { 0% { opacity: 0; transform: scaleX(.3) } 40% { opacity: 1; transform: scaleX(1.15) } 60% { transform: scaleX(.92) } 80% { transform: scaleX(1.04) } 100% { transform: none } }\n@keyframes cs-e-glitch { 0% { opacity: 0; transform: translate(-6px,0); filter: hue-rotate(90deg) } 20% { opacity: 1; transform: translate(5px,-2px) } 40% { transform: translate(-3px,2px); filter: hue-rotate(-90deg) } 60% { transform: translate(2px,0) } 100% { transform: none; filter: none } }\n@keyframes cs-e-unfold { from { opacity: 0; clip-path: inset(0 0 0 100%) } to { opacity: 1; clip-path: inset(0) } }\n@keyframes cs-e-float { from { opacity: 0; transform: translateY(22px) rotate(-3deg) } }\n@keyframes cs-e-roll { from { opacity: 0; transform: translateX(-60px) rotate(-120deg) } }\n@keyframes cs-e-stretch { 0% { opacity: 0; transform: scaleY(.1) } 60% { opacity: 1; transform: scaleY(1.12) } 100% { transform: none } }\n@keyframes cs-e-fold { from { opacity: 0; transform: perspective(600px) rotateY(90deg) } }\n@keyframes cs-e-rubber { 0% { opacity: 0; transform: scale(.5) } 30% { opacity: 1; transform: scale(1.25,.75) } 45% { transform: scale(.85,1.15) } 60% { transform: scale(1.08,.92) } 100% { transform: none } }\n@keyframes cs-e-skew { from { opacity: 0; transform: skewX(-25deg) translateX(-30px) } }\n@keyframes cs-hpulse { 50% { transform: scale(1.035) } }\n@keyframes cs-hfloat { 50% { transform: translateY(-4px) } }\n\n/* ---------- Chat background ---------- */\n.cs-chat-bg { transition: background-color .4s ease; }\n.cs-chat-pane.cs-bg-move { animation: cs-flow 24s steps(48) infinite; }\n/* moving backgrounds slide on their own GPU layer, so the messages above them are never repainted */\n.cs-bgl { position: absolute !important; inset: 0 !important; z-index: -1 !important; overflow: hidden; pointer-events: none; border-radius: inherit; contain: strict; }\n.cs-bgl-in { position: absolute; left: 0; top: 0; width: 300%; height: 300%; background-size: 100% 100%; will-change: transform; animation: cs-drift 36s ease-in-out infinite alternate; }\n@keyframes cs-drift { from { transform: translate3d(0,0,0) } to { transform: translate3d(-66.666%,-66.666%,0) } }\nhtml.cs-lite .cs-bgl-in { animation: none; }\nhtml.cs-bgmode .cs-chat-bg:not(.cs-chat-pane), html.cs-bgmode .cs-clear { background-color: transparent !important; background-image: none !important; box-shadow: none !important; border-color: transparent !important; }\nhtml.cs-bgmode .cs-clear::before, html.cs-bgmode .cs-clear::after { background-color: transparent !important; background-image: none !important; box-shadow: none !important; border-color: transparent !important; }\n/* top bar / composer bar: frosted glass over the chosen background */\nhtml.cs-bgmode .cs-bar { background: rgba(255,255,255,.44) !important; backdrop-filter: blur(14px) saturate(1.6); -webkit-backdrop-filter: blur(14px) saturate(1.6); box-shadow: 0 1px 0 rgba(0,0,0,.05) !important; }\nhtml.cs-lite.cs-bgmode .cs-bar { background: rgba(255,255,255,.72) !important; }\nhtml.cs-bgmode .cs-chat-pane .cs-bar { transition: background .3s; }\n/* over dark backgrounds the bars turn dark too, with light text (anything with its own colour keeps it) */\nhtml.cs-bgmode.cs-bgdark .cs-bar { background: rgba(16,18,28,.46) !important; box-shadow: 0 1px 0 rgba(255,255,255,.06) !important; }\nhtml.cs-bgmode.cs-bgdark .cs-bar.cs-bt, html.cs-bgmode.cs-bgdark .cs-bar .cs-bt, html.cs-bgmode.cs-bgdark .cs-cbar .cs-bt { color: #e9edef !important; }\nhtml.cs-bgmode.cs-bgdark .cs-bk-l { color: #1f1f1f !important; }\nhtml.cs-bgmode.cs-bgdark .cs-bk-d { color: #f1f3f4 !important; }\n.cs-imglayer.cs-il-abs { position: absolute; inset: 0; width: 100%; height: 100%; }\nhtml.cs-bgdark .cs-chat-bg { color: #e9edef; }\nhtml.cs-bgmode.cs-bgdark .cs-meta, html.cs-bgmode.cs-bgdark .cs-meta .cs-c { color: #eef0f4 !important; text-shadow: 0 1px 2px rgba(0,0,0,.55); }\n\n/* ---------- Gmail inbox mode ---------- */\nhtml.cs-mail, html.cs-mail body { background-attachment: fixed !important; }\nhtml.cs-mail { background: transparent !important; }\nhtml.cs-mail .cs-mclear { background-color: transparent !important; background-image: none !important; }\nhtml.cs-mail.cs-mdark .cs-mclear { background-color: rgba(255,255,255,.55) !important; }\nhtml.cs-mail .cs-mglass { background: rgba(255,255,255,.74) !important; backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4); border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,.12) !important; }\nhtml.cs-mail.cs-mdark .cs-mglass { background: rgba(255,255,255,.84) !important; }\nhtml.cs-mail :is(.aeF,.AO,.Tm,.bkK,.aeN,.no,.bGI,.ae4,.aDP,.Cp,.zt,.aKh,.G-atb,.nH.oy8Mbf,.aqJ,.Nr,.D.E,.aeH,.aKz,.wl4W9b,.yP,.nH.ar4) { background: transparent !important; }\nhtml.cs-mail tr.zA { background: rgba(255,255,255,.55) !important; transition: box-shadow .25s, background .25s; }\nhtml.cs-mail tr.zA:hover { box-shadow: inset 0 0 0 1px rgba(124,92,255,.35), 0 4px 14px rgba(0,0,0,.12) !important; }\nhtml.cs-mail tr.zA.zE { background: rgba(255,255,255,.85) !important; }\n\n\n/* ================= WhatsApp look ================= */\n/* bubbles: WhatsApp colours come from the theme; the first bubble of each run gets the little tail and a square corner */\nhtml.cs-wa.cs-on .cs-msg.cs-first[data-cs-edge=\"l\"] { border-top-left-radius: 0 !important; }\nhtml.cs-wa.cs-on .cs-msg.cs-first[data-cs-edge=\"r\"] { border-top-right-radius: 0 !important; }\nhtml.cs-wa.cs-on .cs-msg.cs-pos.cs-first[data-cs-edge]:not(.cs-hold)::after { content: \"\"; position: absolute; top: 0; width: 8px; height: 13px; background: var(--cs-wb, #fff); pointer-events: none; }\nhtml.cs-wa.cs-on .cs-msg.cs-first[data-cs-edge=\"l\"]::after { left: -8px; clip-path: polygon(0 0, 100% 0, 100% 100%); }\nhtml.cs-wa.cs-on .cs-msg.cs-first[data-cs-edge=\"r\"]::after { right: -8px; clip-path: polygon(0 0, 100% 0, 0 100%); }\n\n/* A dedicated footer keeps time/ticks separate from RTL text, links and emoji.\n   Normal flow lets the bubble grow and never overlaps a neighbouring popup. */\n.cs-wa-meta { float: none; clear: both; display: flex; justify-content: flex-end; align-items: center; gap: 3px; min-height: 15px; margin: 4px 0 0;\n  font: 400 11px/15px system-ui, \"Segoe UI\", Helvetica, Arial, sans-serif !important; letter-spacing: 0; white-space: nowrap; direction: ltr; text-shadow: none !important;\n  color: color-mix(in srgb, currentColor 58%, transparent); pointer-events: none; user-select: none; -webkit-user-select: none; }\n.cs-wa-time { font-variant-numeric: tabular-nums; }\n.cs-txt:dir(rtl) > .cs-wa-meta { justify-content: flex-start; }\n.cs-time-source { position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip-path: inset(50%) !important; white-space: nowrap !important; }\nhtml.cs-wa .cs-wa-meta { color: #667781; }\nhtml.cs-wa.cs-wadk .cs-wa-meta { color: rgba(233,237,239,.6); }\n.cs-tick { width: 16px; height: 11px; flex: none; transition: color .4s ease; }\n.cs-tick-sending { width: 14px; }\n.cs-tick-sent, .cs-tick-delivered, .cs-tick-sending { color: #8696a0; }\nhtml.cs-wa:not(.cs-wadk) .cs-msg .cs-tick:not(.cs-tick-read) { color: #667781; }\n.cs-tick-read { color: #53bdeb !important; }\n.cs-tick-pop { animation: cs-tickpop .5s cubic-bezier(.2,.9,.3,1.8); }\n@keyframes cs-tickpop { 0% { transform: scale(.6) } 60% { transform: scale(1.25) } 100% { transform: none } }\n\n/* quoted reply, WhatsApp style */\nhtml.cs-wa.cs-on .cs-msg .cs-box { background: rgba(11,20,26,.05) !important; border-inline-start: 4px solid #06cf9c !important; border-radius: 7.5px !important; color: #54656f !important; box-shadow: none !important; }\nhtml.cs-wa.cs-on .cs-msg.cs-me .cs-box { background: rgba(11,20,26,.06) !important; border-inline-start-color: #53bdeb !important; }\nhtml.cs-wa.cs-wadk.cs-on .cs-msg .cs-box { background: rgba(0,0,0,.22) !important; color: rgba(233,237,239,.78) !important; }\n\n/* sender names in colour, one colour per person; the rest of the line in WhatsApp grey */\nhtml.cs-wa .cs-meta [data-name], html.cs-wa .cs-meta [data-hovercard-id], html.cs-wa .cs-meta [data-member-id] { color: hsl(var(--cs-hue, 160) 62% 38%) !important; font-weight: 600; }\nhtml.cs-wa.cs-wadk .cs-meta [data-name], html.cs-wa.cs-wadk .cs-meta [data-hovercard-id], html.cs-wa.cs-wadk .cs-meta [data-member-id] { color: hsl(var(--cs-hue, 160) 70% 68%) !important; }\nhtml.cs-wa.cs-bgmode .cs-meta .cs-c:not([data-name]):not([data-hovercard-id]):not([data-member-id]) { color: #667781 !important; text-shadow: none !important; }\nhtml.cs-wa.cs-wadk.cs-bgmode .cs-meta .cs-c:not([data-name]):not([data-hovercard-id]):not([data-member-id]) { color: rgba(233,237,239,.6) !important; }\n\n/* like WhatsApp, your own messages don't repeat your name and the time above them (the time is inside the bubble) */\nhtml.cs-wa.cs-on .cs-meta.cs-meta-me :is([data-name],[data-hovercard-id],[data-member-id],[data-absolute-timestamp]) { display: none !important; }\n/* WhatsApp header and input bar */\nhtml.cs-wa.cs-bgmode .cs-bar { background: #f0f2f5 !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; box-shadow: 0 1px 0 rgba(11,20,26,.08) !important; }\nhtml.cs-wa.cs-bgmode .cs-clear.cs-cbar { background-color: #f0f2f5 !important; }\nhtml.cs-wa.cs-wadk.cs-bgmode .cs-bar, html.cs-wa.cs-wadk.cs-bgmode .cs-clear.cs-cbar { background: #202c33 !important; box-shadow: none !important; }\nhtml.cs-wa.cs-wadk.cs-bgmode .cs-bar.cs-bt, html.cs-wa.cs-wadk.cs-bgmode .cs-bar .cs-bt, html.cs-wa.cs-wadk.cs-bgmode .cs-cbar .cs-bt { color: #e9edef !important; }\nhtml.cs-wa.cs-bgmode .cs-pill { background: #ffffff !important; border-radius: 8px !important; box-shadow: none !important; border-color: transparent !important; }\nhtml.cs-wa.cs-wadk.cs-bgmode .cs-pill { background: #2a3942 !important; }\nhtml.cs-wa.cs-wadk.cs-bgmode .cs-pill, html.cs-wa.cs-wadk.cs-bgmode .cs-pill :is([contenteditable], [role=\"textbox\"], textarea, [role=\"button\"], button, span, div) { color: #d1d7db !important; }\n\n/* WhatsApp theme cards in the panel */\n.cs-wacard { padding: 7px 8px 24px; display: flex; flex-direction: column; gap: 4px; font-family: system-ui, \"Segoe UI\", Arial, sans-serif; }\n.cs-wab { max-width: 92%; overflow: hidden; padding: 2px 5px; border-radius: 6px; font-size: 9.5px; line-height: 13px; color: #111b21; background: #fff; box-shadow: 0 1px .5px rgba(11,20,26,.13);\n  position: relative; z-index: 1; display: flex; align-items: flex-end; gap: 5px; white-space: nowrap; }\n.cs-wab-them { align-self: flex-start; border-start-start-radius: 0; }\n.cs-wab-me { align-self: flex-end; background: #d9fdd3; border-start-end-radius: 0; }\n.cs-wab .cs-wa-meta { float: none; position: static; margin: 0; height: auto; font-size: 7.5px !important; line-height: 10px !important; color: #667781; flex: none; }\n.cs-wab .cs-tick { width: 11px; height: 8px; }\n.cs-wacard-dk .cs-wab { background: #202c33; color: #e9edef; }\n.cs-wacard-dk .cs-wab-me { background: #005c4b; }\n.cs-wacard-dk .cs-wab .cs-wa-meta { color: rgba(233,237,239,.6); }\n\n@media (prefers-reduced-motion: reduce) { .cs-msg, .cs-msg::before, .cs-chat-bg, #cs-panel::after { animation: none !important } }\nhtml.cs-lite .cs-bar, html.cs-lite .cs-mglass, html.cs-lite .cs-msg { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }\n/* the panel's decorative animations only run while it is open */\n#cs-panel:not(.cs-open)::before, #cs-panel:not(.cs-open)::after, #cs-panel:not(.cs-open) .cs-title b { animation: none; }\n\n/* panel refreshes after a change: no replay of the card animations */\n#cs-panel.cs-quiet .cs-grid > *, #cs-panel.cs-quiet .cs-credit { animation: none !important; }\n\n/* per-account designs */\n.cs-editbar { display: flex; align-items: center; gap: 8px; margin: 2px 0 10px; padding: 7px 9px; border-radius: 14px; font-size: 12px;\n  background: linear-gradient(135deg, rgba(124,92,255,.16), rgba(0,201,200,.14)); border: 1px solid rgba(124,92,255,.28); animation: cs-cardin .35s both; }\n.cs-eb-t { flex: 1; min-width: 0; display: flex; flex-direction: column; line-height: 1.35; }\n.cs-eb-t > * { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.cs-eb-t small { opacity: .65; font-size: 10.5px; direction: ltr; text-align: start; }\n.cs-editbar .cs-pb { padding: 6px 12px; }\n.cs-av { flex: none; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #fff;\n  background: linear-gradient(135deg, hsl(var(--cs-hue,255) 70% 58%), hsl(calc(var(--cs-hue,255) + 40) 70% 46%)); box-shadow: 0 3px 10px hsla(var(--cs-hue,255),70%,50%,.35); }\n.cs-av-all { background: linear-gradient(135deg,#7c5cff,#00c9c8); }\n.cs-av svg { width: 18px; height: 18px; filter: brightness(0) invert(1); }\n.cs-accts { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }\n.cs-acct { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 14px; cursor: pointer; background: rgba(127,127,170,.09); border: 2px solid transparent;\n  transition: background .2s, transform .25s cubic-bezier(.2,.9,.3,1.5), border-color .2s; animation: cs-cardin .35s both; }\n.cs-acct:hover { background: rgba(124,92,255,.13); transform: translateY(-1px); }\n.cs-acct.cs-on { border-color: #7c5cff; background: rgba(124,92,255,.12); }\n.cs-acct-t { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }\n.cs-acct-t b { font-size: 12.5px; display: flex; align-items: center; gap: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.cs-acct-t small { font-size: 11px; opacity: .65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.cs-badge { font-style: normal; font-size: 10px; font-weight: 800; padding: 1px 7px; border-radius: 999px; background: linear-gradient(135deg,#7c5cff,#00c9c8); color: #fff; }\n.cs-acct-x { height: 28px; min-width: 28px; padding: 0 6px; flex: none; }\n\n.cs-av { position: relative; overflow: hidden; }\n.cs-av img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }\n.cs-busy { animation: cs-flick 1.2s infinite; }\n.cs-warn { opacity: .85; color: #b45309; }\n#cs-panel.cs-dark .cs-warn { color: #fbbf24; }\n.cs-acct-cur { cursor: default; background: rgba(124,92,255,.08); margin-bottom: 4px; }\n.cs-acct-cur:hover { transform: none; }\n.cs-acct-cur .cs-av { width: 40px; height: 40px; font-size: 17px; }\n.cs-mail { unicode-bidi: plaintext; text-align: start; }\n#cs-panel[dir=rtl] .cs-mail { text-align: right; }\n.cs-eb-t b { font-size: 11.5px; }\n\n.cs-asset {pointer-events:none;display:block;overflow:hidden;width:100%;height:100%}\n.cs-asset-card {position:absolute;inset:0;z-index:0}\n.cs-asset-absolute {position:absolute;inset:0;z-index:-1}\n.cs-asset-fixed {position:fixed;inset:0;z-index:-1}\n.cs-asset-sticky {position:sticky;top:0;z-index:-1}\n.cs-card.cs-sel .cs-check {display:block}\n.cs-popup-raised {z-index:1000!important}\n.cs-popup-position {position:relative!important}\n.cs-popup-frozen {transform:none!important;filter:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;animation:none!important;opacity:1!important}\n.cs-check {display:none;position:absolute;top:8.5px;inset-inline-end:8.5px;width:11px;height:11px;z-index:4;pointer-events:none}\n#cs-panel :focus-visible{outline:2px solid #7c5cff;outline-offset:2px}\n@media(prefers-reduced-motion:reduce){#cs-panel *, .cs-btn, .cs-btn::after {animation:none!important;transition:none!important}}\n");
function start(){if(!document.documentElement){setTimeout(start,0);return;}
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


  /* ---------- accounts ---------- */
  const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/;
  let pageAcct = null; // { email, name } read from this page (top frames only)
  let parentAcct = null, parentAcctAt = 0, parentRequest = '', parentRequestedAt = 0;
  const accountIndexIn = url => {
    try {
      const u = new URL(url), m = u.pathname.match(/\/u\/(\d+)(?=\/|$)/);
      if (!m) return null;
      const auth = u.searchParams.get('authuser');
      return auth !== null && auth !== m[1] ? null : Number(m[1]);
    } catch { return null; }
  };
  function requestParentAccount() {
    if (IS_TOP || !IN_GMAIL || Date.now() - parentRequestedAt < 1500) return;
    parentRequestedAt = Date.now();
    parentRequest = crypto.randomUUID();
    window.parent.postMessage({type:'chat-studio:account-request',nonce:parentRequest},'https://mail.google.com');
  }
  function startAccountBridge() {
    // Live, per-tab handshake. Never infer a private profile from a global /u/N cache.
    addEventListener('message',event=>{
      const msg=event.data;
      if (!msg || typeof msg!=='object') return;
      if (IS_MAIL && msg.type==='chat-studio:account-request') {
        if (event.origin!=='https://chat.google.com' || typeof msg.nonce!=='string' || msg.nonce.length>80) return;
        const frame=[...document.querySelectorAll('iframe')].find(f=>f.contentWindow===event.source);
        if (!frame) return;
        let url;try{url=new URL(frame.src);}catch{return;}
        const idx=accountIndexIn(location.href);
        if (url.origin!==event.origin || idx===null || accountIndexIn(url.href)!==idx) return;
        event.source.postMessage({type:'chat-studio:account-response',nonce:msg.nonce,account:readPageAccount()},event.origin);
      } else if (!IS_TOP && IN_GMAIL && msg.type==='chat-studio:account-response') {
        if(event.source!==window.parent || event.origin!=='https://mail.google.com' || !parentRequest || msg.nonce!==parentRequest)return;
        parentRequest='';
        const a=msg.account;
        parentAcct=a && typeof a.email==='string' && a.email.match(EMAIL_RE)?.[0]===a.email ? {email:a.email.toLowerCase(),name:typeof a.name==='string'?a.name.slice(0,120):''} : null;
        parentAcctAt=Date.now();
        const before=curEmail();registerAccount();recompute();applyAll();
        if(before!==curEmail() && panel)refreshPanel();
      }
    });
  }
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
      const m = lab.match(EMAIL_RE);
      if (m) email = m[0].toLowerCase();
      const nm = lab.replace(/[\u200e\u200f]/g, '').match(/:\s*([^\n(]+?)\s*[\n(]/);
      if (nm) name = nm[1].trim();
    }
    const w = readFrameEmail();
    if (w && !email) email = w;
    if (!email && !IS_TOP && IN_GMAIL && parentAcct && Date.now()-parentAcctAt<10000) return parentAcct;
    return email ? { email, name } : null;
  }
  /* the e-mail of the account this page belongs to (frames learn it from the top page through storage) */
  function curEmail() { return pageAcct?.email || ''; }
  const acctKeyOf = a => a.email ? a.email.toLowerCase() : 'u' + a.idx;
  const myAcctKey = () => curEmail() || 'u' + ACCT_IDX;
  const myAcct = () => ACCTS[myAcctKey()] || ACCTS['u' + ACCT_IDX] || null;
  const onProf = k => !!(k && PROF[k] && !PROF[k].off);
  function meKey() { const email=curEmail(); return email && onProf(email) ? email : null; }
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
      try { csPlatform.runtime.sendMessage({ type: 'cs-accounts', force: !!force }, r => { const le = csPlatform.runtime.lastError; res(r || { ok: false, list: [], error: le ? le.message : 'no answer' }); }); }
      catch (e) { res({ ok: false, list: [], error: String(e && e.message || e) }); }
    });
  }
  /* remember this account: top pages read the e-mail from Google's account button; frames get it from them */
  let regTries = 0;
  function registerAccount() {
    requestParentAccount();
    const p = readPageAccount(); pageAcct = p;
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
  function recompute() { R = viewFor(meKey()); if (editKey && (!onProf(editKey) || editKey !== curEmail())) editKey = null; S = viewFor(editKey); }
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
    if(e.classList.contains('cs-card')) {const check=assetNode(CS_ASSETS['check.svg']);check.setAttribute('class','cs-check');check.setAttribute('aria-hidden','true');e.append(check);e.tabIndex=0;e.setAttribute('role','button');e.setAttribute('aria-label',e.title||'Select');e.addEventListener('keydown',event=>{if(event.target===e&&(event.key==='Enter'||event.key===' ')){event.preventDefault();e.click();}});}
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
      if (m.closest(EDITOR + ',#cs-panel,.cs-root,' + POP)) { m.setAttribute('data-cs-c', 'x'); continue; }
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
    document.querySelectorAll('.cs-time-source').forEach(e => e.classList.remove('cs-time-source'));
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
    // Hide only Google's dedicated timestamp nodes, preserving sender names,
    // accessible source text and the original DOM for cleanup.
    const box = b.closest(BOX);
    if (t && box) for (const source of box.querySelectorAll('[data-absolute-timestamp]')) {
      if (!b.contains(source) && source.closest(BOX) === box) source.classList.add('cs-time-source');
    }
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
    if (!showTicks) {
      document.querySelectorAll('.cs-wa-meta').forEach(e => e.remove());
      document.querySelectorAll('.cs-time-source').forEach(e => e.classList.remove('cs-time-source'));
    }
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
    clearEmbedded(pane);
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
      embeddedBackground(pane,d,list[0]);
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
    // A pixel width feeds back into a flex/grid host's intrinsic minimum width.
    // Keep layout relative to the host; bitmap resolution remains pixel based.
    Ly.cv.style.width = '100%'; Ly.cv.style.maxWidth = '100%'; Ly.cv.style.height = h + 'px';
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
    embeddedBackground(document.body,d);
    document.body.style.setProperty('background-attachment', 'fixed', 'important');
    if (d.layer) setLayer(document.body, document.body, d.layer); else removeLayer(document.body);
    H.classList.toggle('cs-mdark', !!d.dark);
    mailScan();
  }
  function unMail() {
    clearEmbedded(document.body);
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
  const sw = (lbl, desc, on, fn) => el('div', { class: 'cs-sw', role:'switch', tabindex:'0', 'aria-checked':String(on), onkeydown:e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn();}}, onclick: fn }, el('span', null, lbl, desc ? el('small', null, desc) : null), el('div', { class: 'cs-tg' + (on ? ' cs-on' : '') }));
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
    if(wa) embeddedBackground(c,{asset:[id==='k:wadark'?'doodle-wad.svg':'doodle-wa.svg',220]});
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
    const card = el('div', { class: 'cs-card' + (S.bg === id && S.scope === 'all' ? ' cs-sel' : ''), title: bgName(id), style: 'background:' + (d.css || d.img), onclick: () => update({ bg: id, scope: 'all' }) },
      el('span', { class: 'cs-lbl' }, bgName(id)));
    embeddedBackground(card,d);return card;
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
    if(!curEmail() || k !== curEmail()) return toast(L().acctNoEmail);
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
        icon('sparkle'), el('b', null, 'כל הזכויות שמורות בס"ד: לשכת הרב')),
      el('div',{class:'cs-credit'},icon('sparkle'),el('b',null,S.lang==='he'?'גרסת הסקריפט והתוספות: פרוזי':'Userscript conversion & additions: Prozi')),
      ...backupControls(el, S.lang),
      el('div',{class:'cs-note',dir:'ltr'},'Chat Studio '+CS_VERSION)
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
    for(const target of assetLayers.keys()) if(!target.isConnected) clearEmbedded(target);

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
    pageAcct = readPageAccount(); recompute();
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
  async function addImg(entry, data) {
    const put = {};
    if (data) put[IPFX + entry.id] = data;
    const next = [entry, ...IMGIX.filter(x => x.id !== entry.id && !(entry.u && x.u === entry.u))];
    const gone = next.slice(MAX_IMGS);
    put[XKEY] = { _w: FID, x: next.slice(0, MAX_IMGS) };
    try { await store.set(put); } catch { return; }
    IMGIX = next.slice(0, MAX_IMGS);
    for (const g of gone) forgetImg(g.id);
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
      await addImg({ id: newId(), t: 'd', th: makeThumb(c) }, c.toDataURL('image/jpeg', 0.9));
      bmp.close();
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
      validateBackup({format:BACKUP_FORMAT,schema:1,values:{cs6:patch}});
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
  const OWN_CLS = ['cs-asset', 'cs-root', 'cs-toast', 'cs-fx', 'cs-imglayer', 'cs-wa-meta', 'cs-bgl'];
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
    csPlatform.storage.onChanged.addListener((ch, areaName) => {
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
    startAccountBridge();
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
        if (IS_TOP || IS_CHAT) { const before = meKey(), had = pageAcct?.email; registerAccount(); if (meKey() !== before) { recompute(); applyAll(); } if (had !== pageAcct?.email && panel) refreshPanel(); }
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

}
start();
})();
