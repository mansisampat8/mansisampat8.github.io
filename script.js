// Initialize AOS animations (if you use the AOS library)
if (typeof AOS !== 'undefined') {
  AOS.init({ once: true, duration: 1100, offset: 130 });
}

// MOBILE NAVIGATION TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  // Lock/unlock body scroll when menu is open/closed
  document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
});

// CLOSE MOBILE NAV ON NAV LINK CLICK
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
});

// SMOOTH SCROLL FOR INTERNAL LINKS & ACTIVE NAV HIGHLIGHT
document.querySelectorAll('nav ul.nav-links a, .btn-primary, .btn-secondary').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
      const target = document.querySelector(href);
      const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });

      // Update active class on nav links
      document.querySelectorAll('nav ul.nav-links a').forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// MICRO-INTERACTIONS FOR BUTTONS (mousedown and mouseup effects)
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('mousedown', () => btn.classList.add('active'));
  btn.addEventListener('mouseup', () => btn.classList.remove('active'));
  btn.addEventListener('mouseleave', () => btn.classList.remove('active'));
});

// OPTIONAL: Form submission handlers with alerts (adjust selectors if forms exist)
const scheduleForm = document.querySelector('.schedule-form');
if (scheduleForm) {
  scheduleForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for scheduling your appointment. We will contact you shortly.');
    e.target.reset();
  });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for contacting us. We will get back to you soon.');
    e.target.reset();
  });
}
