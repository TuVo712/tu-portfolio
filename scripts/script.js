
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute(
      'aria-label',
      isOpen ? 'Open navigation menu' : 'Close navigation menu'
    );

    links.classList.toggle('open', !isOpen);
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

// Automatically update the copyright year.
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Project gallery:
// Toggle one original illustrated project card at a time.

const projectTiles = [
  ...document.querySelectorAll('.project-tile')
];

const projectPreview = document.getElementById('project-preview');

const previewItems = [
  ...document.querySelectorAll('.project-preview-item')
];

if (projectPreview) {
  projectTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const index = Number(tile.dataset.project);

      const wasOpen =
        tile.getAttribute('aria-expanded') === 'true';

      // Close all project tiles.
      projectTiles.forEach(button => {
        button.setAttribute('aria-expanded', 'false');
      });

      // Hide all project previews.
      previewItems.forEach(item => {
        item.hidden = true;
      });

      // Clicking the same tile closes its preview.
      projectPreview.hidden = wasOpen;

      // Otherwise, expand the selected project.
      if (!wasOpen && previewItems[index]) {
        tile.setAttribute('aria-expanded', 'true');
        previewItems[index].hidden = false;
      }
    });
  });
}

// Scroll to the actual document top,
// rather than the #home hero section.

const homepageTopLink = document.querySelector('.home-to-top');

if (homepageTopLink) {
  homepageTopLink.addEventListener('click', event => {
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
