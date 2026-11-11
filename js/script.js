/* ==========================================================================
   Entrance reveals, from the AI Website Design page (script.js, part 1)

   Degrades to plain content if this file never runs: the stylesheet hides a
   .reveal only while `data-anim` is set, and only this script sets it.
   Loaded with `defer`, so the document is parsed by the time this runs.
   ========================================================================== */

(() => {
  'use strict';

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const targets = Array.from(document.querySelectorAll('.reveal'));
  if (!targets.length) return;

  // The flag goes on either way: the stylesheet only hides a reveal while the
  // page is in a position to bring it back.
  root.setAttribute('data-anim', 'on');

  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  targets.forEach((el) => observer.observe(el));

  // The negative rootMargin means anything in the last slice of a fully
  // scrolled page would never trigger. At the bottom, reveal what is left.
  const revealRemainder = () => {
    const atBottom = window.innerHeight + window.scrollY >=
                     document.documentElement.scrollHeight - 2;
    if (!atBottom) return;

    targets.forEach((el) => {
      if (el.classList.contains('is-revealed')) return;
      el.classList.add('is-revealed');
      observer.unobserve(el);
    });
    window.removeEventListener('scroll', revealRemainder);
  };

  window.addEventListener('scroll', revealRemainder, { passive: true });
  window.addEventListener('load', revealRemainder);
  revealRemainder();
})();
