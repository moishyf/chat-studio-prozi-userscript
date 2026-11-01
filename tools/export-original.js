/* Run manually ONLY in the original extension's content-script DevTools context.
 * Reads its storage and downloads a private backup; sends nothing to a server. */
(async()=>{
  if(!globalThis.chrome?.storage?.local)throw Error('Select the Chat Studio extension context first');
  const all=await chrome.storage.local.get(null),values={};
  for(const [key,value]of Object.entries(all))if(/^(cs6|cs6prof|cs6acct|cs7imgs|cs5|cs5img|cs6img|cs7i:[\w-]+)$/.test(key))values[key]=value;
  const url=URL.createObjectURL(new Blob([JSON.stringify({format:'chat-studio-prozi',schema:1,version:'15.3.0',values},null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='chat-studio-original-private-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
})();
