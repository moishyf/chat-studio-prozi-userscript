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

