export function setupNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  if (!toggle || !nav) return;
  const media = window.matchMedia('(max-width: 900px)');
  const setOpen = (open, restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    document.querySelector('main')?.toggleAttribute('inert', open);
    document.querySelector('footer')?.toggleAttribute('inert', open);
    if (open) nav.querySelector('a')?.focus();
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') setOpen(false, true);
    if (event.key !== 'Tab') return;
    const focusable = [...document.querySelectorAll('.site-header a, .site-header button')]
      .filter((el) => el.getClientRects().length > 0);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  media.addEventListener('change', () => setOpen(false));
}
