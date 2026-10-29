const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((section) => observer.observe(section));

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    const status = form.querySelector('.form-status');

    if (button) {
      button.dataset.label = button.textContent;
      button.textContent = 'Wird gesendet...';
      button.disabled = true;
    }

    if (status) {
      status.textContent = '';
      status.classList.remove('error', 'success');
    }

    try {
      const action = form.getAttribute('action') || '';
      const target = action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const response = await fetch(target, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Anfrage konnte nicht gesendet werden.');
      }

      const data = await response.json();
      const message = data.message || '';
      const activationHint = 'Bitte pruefe dein Postfach und bestaetige einmal FormSubmit.';
      if (status) {
        status.classList.add('success');
        status.textContent = message ? `Erfolgreich gesendet. ${message}` : 'Erfolgreich gesendet.';
        if (message.toLowerCase().includes('activate')) {
          status.textContent = activationHint;
          status.classList.remove('success');
          status.classList.add('error');
        }
      }
      form.reset();
    } catch (error) {
      if (status) {
        status.classList.add('error');
        status.textContent = 'Senden fehlgeschlagen. Bitte Internetverbindung pruefen oder spaeter erneut versuchen.';
      }
    } finally {
      if (button) {
        button.textContent = button.dataset.label || 'Auswählen';
        button.disabled = false;
      }
    }
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active-page');
  }
});

if (currentPage === 'impressum.html' || currentPage === 'datenschutz.html') {
  const contactBtn = document.querySelector('.main-nav a.btn');
  if (contactBtn) {
    contactBtn.classList.add('active-page');
  }
}

if (
  currentPage === 'raeumung-kompakt.html' ||
  currentPage === 'raeumung-komplett.html' ||
  currentPage === 'raeumung-business.html' ||
  currentPage === 'anfrage-kompakt.html' ||
  currentPage === 'anfrage-komplett.html' ||
  currentPage === 'anfrage-business.html'
) {
  const pricingLink = document.querySelector('.main-nav a[href="preise.html"]');
  if (pricingLink) {
    pricingLink.classList.add('active-page');
  }
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((item) => {
    item.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
