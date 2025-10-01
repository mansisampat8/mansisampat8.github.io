// Initialize AOS animations (if present)
if (typeof AOS !== 'undefined') {
  AOS.init({ once: true, duration: 1100, offset: 130 });
}

// MOBILE NAVIGATION TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && nav && navLinks) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    menuToggle.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : '';
  });

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

    document.querySelectorAll('.dropdown-content').forEach(menu => {
      menu.style.display = 'none';
    });

    dropdown.style.display = isVisible ? 'none' : 'block';
  });
});

// CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
document.addEventListener('click', (e) => {
  if (!nav) return;
  const menuOpen = nav.classList.contains('show');
  const clickInsideNav = nav.contains(e.target) || (menuToggle && menuToggle.contains(e.target));

  if (menuOpen && !clickInsideNav) {
    nav.classList.remove('show');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// === HERO CAROUSEL ROTATION ===
const heroCarousel = document.querySelector('.hero-carousel');
if (heroCarousel) {
  const cards = heroCarousel.querySelectorAll('.card');
  const prevBtn = heroCarousel.querySelector('.prev');
  const nextBtn = heroCarousel.querySelector('.next');
  let current = 0;
  let autoRotateTimer = null;

  function showCard(i) {
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === i);
    });
  }

  function nextCard() {
    current = (current + 1) % cards.length;
    showCard(current);
    restartAutoRotate();
  }

  function prevCard() {
    current = (current - 1 + cards.length) % cards.length;
    showCard(current);
    restartAutoRotate();
  }

  function restartAutoRotate() {
    clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(nextCard, 8000); // 8s
  }

  // Keyboard navigation (optional, accessibility)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
  });

  if (nextBtn) nextBtn.addEventListener('click', nextCard);
  if (prevBtn) prevBtn.addEventListener('click', prevCard);

  showCard(current);
  restartAutoRotate();
}

function createSparkles(x, y) {
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.setProperty("--dx", (Math.random() - 0.5) * 100 + "px");
    sparkle.style.setProperty("--dy", (Math.random() - 0.5) * 100 + "px");
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
  }
}

// run only on touch devices
document.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  createSparkles(touch.pageX, touch.pageY);
});

document.addEventListener('DOMContentLoaded', () => {
  const solutionsSection = document.querySelector('.solutions-section');
  const toggleWrapper = document.querySelector('.toggle-wrapper');
  const toggleContent = document.querySelector('.toggle-content');

  // Check if all elements exist before adding the event listener
  if (solutionsSection && toggleWrapper && toggleContent) {
    
    toggleWrapper.addEventListener('click', () => {
      // Add or remove the 'active' class on the main section
      solutionsSection.classList.toggle('active');

      if (solutionsSection.classList.contains('active')) {
        // If the section is now active, open the content
        toggleContent.style.height = toggleContent.scrollHeight + 'px';
        toggleContent.style.opacity = '1';
      } else {
        // If the section is not active, close the content
        toggleContent.style.height = '0';
        toggleContent.style.opacity = '0';
      }
    });
  }
});

