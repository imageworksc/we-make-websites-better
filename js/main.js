/* ==========================================================================
   Search Funnels (Google + AI) · ImageWorks Creative
   1. Scroll reveal
   2. Navigation (sticky shadow, mobile drawer, submenus)
   3. Steps accordion (one open at a time)
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  /* 1. Scroll reveal
     ------------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll('.sf-reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* 2. Navigation
     ------------------------------------------------------------------------ */
  function initNav() {
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

    // Close the drawer if the viewport grows back to desktop
    mobile.addEventListener('change', function (e) {
      if (!e.matches) setOpen(false);
    });

    // Submenus expand on tap inside the drawer
    nav.querySelectorAll('button.sf-menu__link').forEach(function (button) {
      button.addEventListener('click', function () {
        var item = button.parentElement;
        var expanded = !item.classList.contains('is-expanded');
        item.classList.toggle('is-expanded', expanded);
        button.setAttribute('aria-expanded', String(expanded));
      });
    });

    // Shadow under the bar once the page scrolls
    function onScroll() {
      nav.classList.toggle('is-stuck', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 3. Steps accordion
     ------------------------------------------------------------------------ */
  function initSteps() {
    var steps = document.querySelectorAll('.sf-step');

    steps.forEach(function (step) {
      step.addEventListener('toggle', function () {
        if (!step.open) return;
        steps.forEach(function (other) {
          if (other !== step) other.open = false;
        });
      });
    });
  }

  initReveal();
  initNav();
  initSteps();
})();
