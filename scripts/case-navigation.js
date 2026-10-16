
// Case study navigation:
// Highlight the section currently in view.

const sections = [
  ...document.querySelectorAll('.case-reading-content .case-section')
];

const tocLinks = [
  ...document.querySelectorAll('.case-toc a')
];

const topLink = document.querySelector('.case-to-top');
const jump = document.querySelector('#case-jump');

function updateNavigation() {
  const current = [...sections]
    .reverse()
    .find(section =>
      section.getBoundingClientRect().top <= 170
    ) || sections[0];

  tocLinks.forEach(link => {
    const active =
      link.getAttribute('href') ===
      `#${current?.querySelector('h2')?.id}`;

    link.classList.toggle('active', active);

    if (active) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (topLink) {
    topLink.classList.toggle('visible', window.scrollY > 450);
  }
}

window.addEventListener('scroll', updateNavigation, {
  passive: true
});

window.addEventListener('resize', updateNavigation);
window.addEventListener('load', updateNavigation);

updateNavigation();

// Jump to the selected case-study section.

if (jump) {
  jump.addEventListener('change', () => {
    if (!jump.value) return;

    document.getElementById(jump.value)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
    });
  });
}

// Return to the actual top of every case-study page.

if (topLink) {
  topLink.addEventListener('click', event => {
    event.preventDefault();

    history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search
    );

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth'
    });
  });
}
