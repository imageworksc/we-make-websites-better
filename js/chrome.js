/* ==========================================================================
   Site navigation, from the Search Funnels page
   Sticky shadow, mobile drawer, tap-to-open submenus.
   ========================================================================== */

(() => {
  'use strict';

  const root = document.documentElement;
  const nav = document.getElementById('sf-nav');
  if (!nav) return;

  const burger = nav.querySelector('.sf-burger');
  const scrim = document.querySelector('.sf-scrim');
  const mobile = window.matchMedia('(max-width: 1080px)');

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    root.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  burger.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  scrim.addEventListener('click', () => setOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  // Close the drawer if the window grows back to desktop.
  mobile.addEventListener('change', (event) => {
    if (!event.matches) setOpen(false);
  });

  // Submenus open on tap inside the drawer.
  nav.querySelectorAll('button.sf-menu__link').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const expanded = !item.classList.contains('is-expanded');
      item.classList.toggle('is-expanded', expanded);
      button.setAttribute('aria-expanded', String(expanded));
    });
  });

  // In-page links close the drawer.
  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Shadow under the bar once the page scrolls.
  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
