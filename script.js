(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');

  // Keep the small-screen menu usable with a mouse, keyboard, and touch.
  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      navigation.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  // Reveal content gently as it enters the screen; respect reduced-motion settings.
  const revealTargets = document.querySelectorAll('.section-label, .about-grid, .section-heading, .skill-card, .project-card, .contact-grid');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    revealTargets.forEach((element) => element.classList.add('js-reveal'));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  }

  // A static GitHub Pages site cannot deliver forms, so prepare a message in the visitor's email app.
  const form = document.querySelector('#contact-form');
  const formNote = document.querySelector('#form-note');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = new FormData(form);
      const name = String(fields.get('name') || '').trim();
      const email = String(fields.get('email') || '').trim();
      const message = String(fields.get('message') || '').trim();
      const subject = `Portfolio enquiry from ${name}`;
      const body = `Hi Ipfi,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
      const mailto = `mailto:ipfiashley4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (formNote) formNote.textContent = 'Your email app should open with the message ready to send.';
      window.location.href = mailto;
    });
  }
})();
