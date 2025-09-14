// Initialize AOS animations (if present)
if (typeof AOS !== 'undefined') {
  AOS.init({ once: true, duration: 1100, offset: 130 });
}

// MOBILE NAVIGATION TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');            // changed from ul.nav-links to nav
const navLinks = document.querySelector('.nav-links'); // still need the UL for links

if (menuToggle && nav && navLinks) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');                     // toggle class on nav instead of ul
    menuToggle.classList.toggle('active');            // animate the hamburger
    document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : '';
  });

  // CLOSE NAV WHEN A LINK IS CLICKED
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// SMOOTH SCROLL + ACTIVE LINK HIGHLIGHT
document.querySelectorAll('nav ul.nav-links a, .btn-primary, .btn-secondary').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
      const target = document.querySelector(href);
      const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });

      // Update active link state
      document.querySelectorAll('nav ul.nav-links a').forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// MICRO-INTERACTIONS FOR BUTTONS
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  ['mousedown', 'mouseup', 'mouseleave'].forEach(evt => {
    btn.addEventListener(evt, () => {
      if (evt === 'mousedown') btn.classList.add('active');
      else btn.classList.remove('active');
    });
  });
});

// OPTIONAL: Form submission handlers
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

// DROPDOWN TOGGLE FOR MOBILE
document.querySelectorAll('.nav-links li.dropdown > a.dropbtn').forEach(dropBtn => {
  dropBtn.addEventListener('click', e => {
    e.preventDefault();
    const dropdown = dropBtn.nextElementSibling;
    const isVisible = dropdown.style.display === 'block';

    // Close all dropdowns
    document.querySelectorAll('.dropdown-content').forEach(menu => {
      menu.style.display = 'none';
    });

    // Toggle this dropdown
    dropdown.style.display = isVisible ? 'none' : 'block';
  });
});
