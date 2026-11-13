/* ==========================================================================
   We Make Websites Better · page script
   1. Form: preselected interest, validation, sent state
   2. Phone call bar: shown only between the hero and the form
   script.js (AI Website Design) runs the reveals; chrome.js runs the nav.
   ========================================================================== */

(() => {
  'use strict';

  /* 1. Form
     ------------------------------------------------------------------------ */
  const card = document.querySelector('.wm-form-card');
  const form = document.getElementById('form-el');
  const interest = document.getElementById('f-interest');

  // Links that carry an interest preselect it in the form.
  document.querySelectorAll('[data-interest]').forEach((link) => {
    link.addEventListener('click', () => {
      interest.value = link.dataset.interest;
      interest.closest('.wm-field').classList.remove('is-error');
    });
  });

  const isValid = (field) => {
    const value = (field.value || '').trim();
    if (field.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (field.type === 'tel') return value.replace(/\D/g, '').length >= 7;
    if (field.type === 'url') return value.length > 3;
    return value.length > 0;
  };

  if (card && form) {
    const required = form.querySelectorAll('[required]');

    // A field clears its error as soon as it becomes valid.
    required.forEach((field) => {
      const clear = () => {
        if (isValid(field)) field.closest('.wm-field').classList.remove('is-error');
      };
      field.addEventListener('input', clear);
      field.addEventListener('change', clear);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let firstInvalid = null;
      required.forEach((field) => {
        const invalid = !isValid(field);
        field.closest('.wm-field').classList.toggle('is-error', invalid);
        if (invalid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Hook the form handler / CRM here.
      card.classList.add('is-sent');
    });
  }

  /* 2. Phone call bar
     ------------------------------------------------------------------------ */
  const bar = document.getElementById('mbar');
  const heroButtons = document.getElementById('hero-cta');
  const contact = document.getElementById('start');

  if (bar && heroButtons && contact && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let formVisible = false;
    const update = () => bar.classList.toggle('is-on', !heroVisible && !formVisible);

    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      update();
    }).observe(heroButtons);

    new IntersectionObserver(([entry]) => {
      formVisible = entry.isIntersecting;
      update();
    }, { threshold: 0.1 }).observe(contact);
  }
})();
