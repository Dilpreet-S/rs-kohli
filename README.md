# R.S. Kohli & Co. — Premium Website

A six-page static website for engineering and property services in the DMV. Semantic HTML5, Tailwind browser CDN, CSS, and modular ES6 JavaScript. No backend, customer accounts, custom forms, upload pipeline, or database.

## Pages

- Home: engineering authority, four services, government experience, regional coverage.
- Services: four detailed scopes, Prince William County inspection note, native accessible FAQs.
- About: professional profile, former county/VDOT roles, Virginia Tech education.
- Contact: Google Forms handoff and four-step process.
- Privacy and Terms: intake, professional-history and jurisdiction notices.

## Run

Serve `dist/` with any static HTTP server (ES modules require HTTP). Example: `python3 -m http.server 8000 --directory dist`. There is no Node installation or build requirement.

`python3 build.py` regenerates HTML from reusable Python functions. This is a development-only file generator, not a Python backend or runtime dependency. All deployed files are static. The generated HTML is committed so deployment needs no Python.

## Deploy to Cloudflare

Connect this repository to Workers Static Assets. Static asset directory: `dist`. `wrangler.jsonc` includes the asset configuration; no API Worker or environment secrets are needed. Existing production hosting was not changed.

Provider-neutral hosts can serve `dist/` directly. Cloudflare `_headers` supplies security policy. Other hosts must apply equivalent response headers themselves.

## Configuration

- Google Form: `dist/assets/config.js`; `build.py` emits the same default external URL as a no-JavaScript fallback. If changing the form, update both and regenerate HTML.
- All request CTAs use HTTPS, `target="_blank"`, and `rel="noopener noreferrer"`. Internal page navigation stays in the current tab.
- Phone: set verified `phone` (international format) and optional `phoneLabel` in config.js. Phone links remain hidden until a valid number is supplied. No placeholder number is published.
- Fonts load from Google Fonts; fallback fonts keep the site usable if unavailable.
- Tailwind Play CDN follows the requested CDN architecture. Tailwind officially positions Play CDN for development rather than production; before a public production launch, replace it with generated local Tailwind CSS if that constraint can be relaxed. Local CSS preserves the complete branded layout when the CDN is unavailable.
- No canonical domain or sitemap domain is invented. Once the final public domain is confirmed, add canonical URLs and a sitemap using that domain.

## Assets and content

Logo and portrait are reused from the original user repository. The logo is optimized to WebP. The portrait is the original 155×255 image and has not been artificially enlarged or replaced with a synthetic likeness. A higher-resolution approved headshot is recommended.

`structure.svg` is an original decorative structural illustration, not a depiction of an actual commissioned project. Service icons are local SVG markup.

The name, former roles, education, and 40+ years of U.S. government project experience are the profile supplied by the user. They have not been independently verified. Confirm exact degree title, role wording, current license jurisdictions, inspection authorization, and public contact information before publishing. Former roles are explicitly identified and do not imply government endorsement. The older 47+ years overall claim is not mixed into the 40+ government-project claim.

## Scope

No Google Form questions or settings have been modified. No submissions have been made. All intake stays in the existing Google Form. No lead data appears in this repository.

## Validation

Run `python3 scripts/check_site.py` for internal links/anchors, required page structure, secure request URLs, ES module references, assets, and absence of custom forms. Browser checks cover desktop rendering, mobile layout, navigation open/Escape, service FAQ expansion, and the contact workflow. See `VALIDATION.md` for the final results and limits.
