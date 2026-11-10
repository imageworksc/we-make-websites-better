/* We Make Websites Better: form validation + mobile sticky CTA.
   main.js (shared with Search Funnels) handles reveal, nav and steps. */
(function () {
  'use strict';

  var form = document.getElementById('sf-form-el');
  var success = document.getElementById('sf-success');
  var select = document.getElementById('f-interest');

  /* Links that preselect an interest */
  document.querySelectorAll('[data-interest]').forEach(function (a) {
    a.addEventListener('click', function () {
      select.value = a.getAttribute('data-interest');
      select.closest('.sf-field').classList.remove('is-error');
    });
  });

  function valid(el) {
    var v = (el.value || '').trim();
    if (el.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (el.type === 'tel') return v.replace(/\D/g, '').length >= 7;
    if (el.type === 'url') return v.length > 3;
    return v.length > 0;
  }

  if (form) {
    var req = form.querySelectorAll('[required]');
    req.forEach(function (el) {
      function fix() { if (valid(el)) el.closest('.sf-field').classList.remove('is-error'); }
      el.addEventListener('input', fix);
      el.addEventListener('change', fix);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      req.forEach(function (el) {
        var bad = !valid(el);
        el.closest('.sf-field').classList.toggle('is-error', bad);
        if (bad && !first) first = el;
      });
      if (first) { first.focus(); return; }
      /* Hook your form handler / CRM here */
      form.style.display = 'none';
      success.style.display = 'block';
    });
  }

  /* Phone sticky bar: hidden while the hero CTAs or the form are on screen */
  var bar = document.getElementById('sf-bar');
  var hero = document.getElementById('sf-hero-cta');
  var contact = document.getElementById('sf-form');
  if (bar && hero && contact && 'IntersectionObserver' in window) {
    var heroV = true, formV = false;
    var update = function () { bar.classList.toggle('is-on', !heroV && !formV); };
    new IntersectionObserver(function (e) { heroV = e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { formV = e[0].isIntersecting; update(); }, { threshold: 0.1 }).observe(contact);
  }
})();
