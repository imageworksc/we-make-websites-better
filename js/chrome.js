/* Site navigation, taken from the Search Funnels page (js/main.js, part 2):
   sticky shadow, mobile drawer, tap-to-open submenus. */
(function () {
  'use strict';

  var root = document.documentElement;
  var nav = document.getElementById('sf-nav');
  if (!nav) return;

  var burger = nav.querySelector('.sf-burger');
  var scrim = document.querySelector('.sf-scrim');
  var mobile = window.matchMedia('(max-width: 1080px)');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    root.classList.toggle('is-locked', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });

  scrim.addEventListener('click', function () { setOpen(false); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  mobile.addEventListener('change', function (e) {
    if (!e.matches) setOpen(false);
  });

  nav.querySelectorAll('button.sf-menu__link').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.parentElement;
      var expanded = !item.classList.contains('is-expanded');
      item.classList.toggle('is-expanded', expanded);
      button.setAttribute('aria-expanded', String(expanded));
    });
  });

  /* in-page links close the drawer */
  nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  function onScroll() {
    nav.classList.toggle('is-stuck', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
