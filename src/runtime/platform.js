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
