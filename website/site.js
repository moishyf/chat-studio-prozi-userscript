const gallery=document.getElementById('gallery-image');
for(const button of document.querySelectorAll('[data-image]'))button.addEventListener('click',()=>{
 for(const b of document.querySelectorAll('[data-image]'))b.setAttribute('aria-pressed',String(b===button));
 gallery.src='images/'+button.dataset.image+'.jpg';gallery.alt=button.textContent+' — צילום בסביבת ההדגמה';
});
