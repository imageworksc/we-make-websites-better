# We Make Websites Better. A Lot Better.

Landing page for ImageWorks Creative.
Staging (GitHub Pages): https://imageworksc.github.io/we-make-websites-better/

Content styled on the AI Website Design page (`imageworksc/ai-web-design`);
header and footer from the Search Funnels page (`imageworksc/search-funnels`).

## Structure

```
index.html        Page markup (no inline styles or scripts)
css/styles.css    AI Website Design system, trimmed to the rules this page uses
css/chrome.css    Staging copy of the site header and footer (Search Funnels)
css/page.css      This page's sections, Drupal rules, breakpoints, large screens
js/script.js      Scroll reveals
js/chrome.js      Staging nav: drawer, submenus, sticky shadow
js/page.js        Form validation and sent state, phone call bar
assets/img/       Logos
```

JavaScript is ES2015+ (`const`/`let`, arrow functions). State changes are
classes (`is-error`, `is-sent`, `is-on`), never inline styles.

## Running inside Drupal

The live page is pasted into the `field--name-field-html-code` field of the
imageworkscreative.com theme (Bootstrap 3 plus the theme's own CSS), not served
on its own. These rules keep it rendering the same in both places:

- **Paste only `<main id="wm-main">`** plus the `styles.css`, `page.css`,
  `script.js` and `page.js` links. The icon sprite and the phone call bar live
  inside `<main>` so they travel with it. The utility bar, navbar and footer in
  `index.html` (and `chrome.css` / `chrome.js`) are staging copies of the
  site's own header and footer, which Drupal already renders.
- **Everything of ours is prefixed `wm-`**: classes, CSS custom properties and
  keyframes. The theme styles `.btn`, `.lead` and `.wrap`, and defines
  `--navy`, `--green` and `--blue` on the field itself, so unprefixed names
  would be overridden. Drupal's own `.field` class is why the form uses
  `.wm-field`.
- **Element rules are scoped with `:where(.wm-scope)`** (`styles.css`, Base).
  They reset the theme's `p`, `h1`–`h4`, `address` and list rules inside the
  page only and never reach the site's header and footer. `:where()` adds no
  specificity, so component classes still win without `!important`.
- **Sizes are in px.** The theme sets `html { font-size: 10px }`, so any `rem`
  would shrink. Media queries are in px too.
- **`#wm-main` clears floats** and carries `wm-scope html-wrapper`
  (`html-wrapper` is the theme's opt-out for its link and list rules). Never
  use `id="main"` or the class `section`: the theme caps them at 975–1000px.
- **Sticky column:** the theme puts `overflow-x: hidden` on the field, which
  disables `position: sticky` (Try Before You Buy). `page.css` switches it to
  `overflow-x: clip` only when the field contains `#wm-main`.
- **Button hovers** restate their colours, so Bootstrap's `a:hover` can't
  recolour them.
- No inline width patches in the field. If one seems needed, the fix belongs in
  these files.

`index.html` wraps `<main>` in a stand-in `field--name-field-html-code` div so
staging matches.

## Testing

Before handing off, test inside a copy of the live page with the theme CSS
loaded, at 390, 768, 1440, 1920 and 2560 wide, plus 3840 and 5120. Staging alone
won't show theme conflicts. Above 2200px the layout scales up with `zoom` so it
keeps its proportions on QHD, 4K and 5K displays.

Bump the `?v=` on every stylesheet and script link whenever CSS or JS changes.

## Pending

- [ ] Connect the form to the CRM (`js/page.js`, "Hook the form handler").
- [ ] "Book a Call." under the form points to `/start-a-project`; swap for the
      scheduling link if there is one.
