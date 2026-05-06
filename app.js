// ─── SCROLL REVEAL ───
const revealMap = [
  ['.section-header',             'up',    false],
  ['.stats-grid .stat',           'up',    true ],
  ['.services-grid .service-card','up',    true ],
  ['.cta-copy',                   'left',  false],
  ['.cta-image',                  'right', false],
  ['.services-list .service-item','up',    true ],
  ['.services-cta',               'up',    false],
  ['.about-text',                 'left',  false],
  ['.about-image',                'right', false],
  ['.about-values .value-item',   'up',    true ],
  ['.contact-info',               'left',  false],
  ['.contact-form-wrap',          'right', false],
];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    setTimeout(() => {
      entry.target.removeAttribute('data-reveal');
      entry.target.style.transitionDelay = '';
    }, 1000);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealMap.forEach(([sel, dir, stagger]) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.setAttribute('data-reveal', dir);
    if (stagger && i > 0) el.style.transitionDelay = `${Math.min(i, 3) * 0.09}s`;
    revealObserver.observe(el);
  });
});

// Hamburger nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}
