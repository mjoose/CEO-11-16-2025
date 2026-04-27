(() => {
  const hero = document.querySelector('[data-hero]');
  const header = document.querySelector('[data-header]');
  const rule = document.querySelector('[data-header-rule]');
  if (!hero || !header || !rule) return;

  const update = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const headerBottom = header.getBoundingClientRect().bottom;
    const show = heroBottom <= headerBottom;
    rule.classList.toggle('is-visible', show);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

