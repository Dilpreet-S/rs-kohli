import { siteConfig } from './config.js';
import { setupNavigation } from './navigation.js';
setupNavigation();
document.querySelectorAll('[data-year]').forEach(el => el.textContent = String(new Date().getFullYear()));
const formUrl = new URL(siteConfig.googleFormUrl);
const isGoogleForm = formUrl.protocol === 'https:' && (formUrl.hostname === 'forms.gle' || (formUrl.hostname === 'docs.google.com' && formUrl.pathname.startsWith('/forms/')));
if (isGoogleForm) document.querySelectorAll('a[href^="https://forms.gle/"]').forEach(el => { el.href = formUrl.href; });
if (/^\+[1-9]\d{6,14}$/.test(siteConfig.phone)) {
  document.querySelectorAll('[data-phone]').forEach(el => {
    el.href = `tel:${siteConfig.phone}`;
    el.textContent = siteConfig.phoneLabel || siteConfig.phone;
    el.hidden = false;
  });
}
