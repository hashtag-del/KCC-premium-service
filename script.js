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
  const emailFallback = form.querySelector('.form-email-fallback');
  const serviceSelect = form.querySelector('[name="service"]');
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (serviceSelect && requestedService && [...serviceSelect.options].some((option) => option.value === requestedService)) {
    serviceSelect.value = requestedService;
  }

  const updateEmailFallback = () => {
    const formData = new FormData(form);
    if (emailFallback) {
      const body = [
        `Name: ${formData.get('name') || ''}`,
        `Gewünschte Leistung: ${serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : ''}`,
        `E-Mail: ${formData.get('email') || ''}`,
        `Telefon: ${formData.get('telefon') || ''}`,
        `Einsatzort / Fahrzeugstandort: ${formData.get('adresse') || ''}`,
        '',
        formData.get('message') || '',
      ].join('\n');
      const recipient = new URL(form.action).pathname.slice(1);
      emailFallback.href = `mailto:${recipient}?subject=${encodeURIComponent(formData.get('_subject') || 'Räumungsanfrage')}&body=${encodeURIComponent(body)}`;
    }
  };
  form.addEventListener('input', updateEmailFallback);
  form.addEventListener('change', updateEmailFallback);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    const status = form.querySelector('.form-status');
    const formData = new FormData(form);
    updateEmailFallback();

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
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(20000),
      });

      if (!response.ok) {
        throw new Error('Anfrage konnte nicht gesendet werden.');
      }

      const data = await response.json();
      const message = typeof data.message === 'string' ? data.message : '';
      if (data.success !== true && data.success !== 'true') {
        throw new Error(message || 'Der Formulardienst hat den Versand nicht bestätigt.');
      }
      if (/activat/i.test(message)) {
        throw new Error('Die Empfängeradresse muss bei FormSubmit noch aktiviert werden.');
      }
      if (status) {
        status.classList.add('success');
        status.textContent = 'Deine Anfrage wurde erfolgreich an den Formulardienst übermittelt.';
      }
      form.reset();
      if (emailFallback) {
        emailFallback.href = `mailto:${new URL(form.action).pathname.slice(1)}`;
      }
    } catch (error) {
      console.error('Formularversand fehlgeschlagen:', error);
      if (status) {
        status.classList.add('error');
        status.textContent = 'Deine Anfrage konnte nicht übermittelt werden. Der Formulardienst ist möglicherweise nicht erreichbar oder die Empfängeradresse noch nicht aktiviert. Deine Angaben bleiben erhalten. Bitte nutze den E-Mail-Link unter dem Formular oder rufe uns an.';
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
