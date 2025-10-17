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
  // 1. Find ALL toggle headers on the page
  const allToggles = document.querySelectorAll('.toggle-wrapper');

  // 2. Loop through each one we found
  allToggles.forEach(toggle => {
    // For each toggle header, add our click logic
    toggle.addEventListener('click', () => {
      
      // 3. Find the parent <section> of the header that was just clicked
      const parentSection = toggle.parentElement;
      
      // 4. Find the '.toggle-content' that is INSIDE that specific parent
      const content = parentSection.querySelector('.toggle-content');
      
      // 5. Add or remove the 'active' class on that specific parent
      parentSection.classList.toggle('active');

      // 6. Check if THAT section is now active and show/hide its content
      if (parentSection.classList.contains('active')) {
        content.style.height = content.scrollHeight + 'px';
        content.style.opacity = '1';
      } else {
        content.style.height = '0';
        content.style.opacity = '0';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Script for the "Find Your Stage" Button ---
  
  const findStageBtn = document.querySelector('#find-stage-btn');
  const stagesContent = document.querySelector('#stages-content');

  // Check if both the button and the content exist on the page
  if (findStageBtn && stagesContent) {
    findStageBtn.addEventListener('click', () => {
      // Toggle the 'active' class on the content to show/hide it
      stagesContent.classList.toggle('active');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Script for the "Outcomes" Toggle in "What We Do" Cards ---
  
  // 1. Find all the clickable outcome headers on the page
  const allOutcomeHeaders = document.querySelectorAll('.outcome-header');
  
  // 2. Loop through each one and add the click functionality
  allOutcomeHeaders.forEach(header => {
    header.addEventListener('click', () => {
      
      // 3. Find the main wrapper for the header that was just clicked
      const wrapper = header.parentElement;
      
      // 4. Find the content area within that specific wrapper
      const content = wrapper.querySelector('.outcome-content');
      
      // 5. Toggle the 'active' class on the wrapper to trigger the CSS
      wrapper.classList.toggle('active');
      
      // 6. Check if it's now active and adjust the height to animate it open/closed
      if (wrapper.classList.contains('active')) {
        content.style.height = content.scrollHeight + 'px';
        content.style.opacity = '1';
      } else {
        content.style.height = '0';
        content.style.opacity = '0';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Script for the FAQ Toggle Items ---
  
  // 1. Find all the clickable question headers
  const allFaqQuestions = document.querySelectorAll('.faq-question');
  
  // 2. Loop through each question and add the click functionality
  allFaqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      
      // 3. Find the main parent item of the question that was clicked
      const faqItem = question.parentElement;
      
      // 4. Find the answer content within that specific item
      const answer = faqItem.querySelector('.faq-answer');
      
      // 5. Toggle the 'active' class on the item to trigger the CSS
      faqItem.classList.toggle('active');
      
      // 6. Check if it's now active and adjust the height to animate it open/closed
      if (faqItem.classList.contains('active')) {
        answer.style.height = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
      } else {
        answer.style.height = '0';
        answer.style.opacity = '0';
      }
    });
  });
});

// Predefined passwords (MD5 hashes for D2C clients; e.g., 'd2cclient1')
const clientPasswords = {
    '1': '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', // 'd2cclient1'
    '2': 'e2fc714c4727ee9395f324cd2e7f331f', // 'd2cclient2' (example)
    '3': '827ccb0eea8a706c4c34a16891f84e7b', // 'd2cclient3'
    '4': '1a1dc91c907325c69271ddf0c944bc72', // 'd2cclient4'
    '5': 'c84258e9c39059a89ab130c4f11b1d3d', // 'd2cclient5'
    '6': '2f44adeba69e2b4c80d2a9c8f0f4b3d5', // 'd2cclient6'
    '7': 'd8578edf8458ce06fbc5bb76a58c5ca4', // 'd2cclient7'
    '8': '4cdcb8f13af94b20a0f81d65a37e79f1', // 'd2cclient8'
    '9': 'a665a45920422f9d417e4867efdc4fb8', // 'd2cclient9'
    '10': '482c811da5d5b4bc6d497ffa98491e38' // 'd2cclient10'
};

// Placeholder MD5 (use crypto-js in production)
function md5(str) {
    // Simplified; implement full MD5 or use library
    return btoa(str).slice(0, 64).replace(/[^a-f0-9]/g, '');
}

function login() {
    const clientId = document.getElementById('client-id').value;
    const password = document.getElementById('password').value;
    const hashedPw = md5(password);

    if (clientPasswords[clientId] && clientPasswords[clientId] === hashedPw) {
        localStorage.setItem('loggedClient', clientId);
        loadDashboard(clientId);
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('error').textContent = '';
    } else {
        document.getElementById('error').textContent = 'Invalid client ID or password.';
    }
}

function loadDashboard(clientId) {
    document.getElementById('client-title').textContent = `Client ${clientId} D2C Dashboard`;
    const data = JSON.parse(localStorage.getItem(`d2cclient${clientId}_data`) || '{"cac":0,"aov":0,"repeat":0,"margin":0}');
    document.getElementById('cac').value = data.cac;
    document.getElementById('cac-value').textContent = `₹${data.cac}`;
    document.getElementById('aov').value = data.aov;
    document.getElementById('aov-value').textContent = `₹${data.aov}`;
    document.getElementById('repeat').value = data.repeat;
    document.getElementById('repeat-value').textContent = `${data.repeat}%`;
    document.getElementById('margin').value = data.margin;
    document.getElementById('margin-value').textContent = `${data.margin}%`;
    calculateCLTV(clientId);
}

function updateKPI(key, value) {
    const clientId = localStorage.getItem('loggedClient');
    if (!clientId) return;
    const data = JSON.parse(localStorage.getItem(`d2cclient${clientId}_data`) || '{}');
    data[key] = parseFloat(value) || 0;
    localStorage.setItem(`d2cclient${clientId}_data`, JSON.stringify(data));
    document.getElementById(`${key}-value`).textContent = key === 'cac' || key === 'aov' ? `₹${data[key]}` : `${data[key]}%`;
    if (key === 'aov' || key === 'repeat') calculateCLTV(clientId);
}

function calculateCLTV(clientId) {
    const data = JSON.parse(localStorage.getItem(`d2cclient${clientId}_data`) || '{}');
    const cltv = (data.aov * (data.repeat / 100) * 3).toFixed(0); // Simple: AOV * Repeat Rate * 3 (avg purchases)
    document.getElementById('cltv-value').textContent = `₹${cltv}`;
}

function logout() {
    localStorage.removeItem('loggedClient');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('client-id').value = '';
    document.getElementById('password').value = '';
}

function exportData() {
    const clientId = localStorage.getItem('loggedClient');
    const data = JSON.parse(localStorage.getItem(`d2cclient${clientId}_data`) || '{}');
    const cltv = (data.aov * (data.repeat / 100) * 3).toFixed(0);
    const csv = `KPI,Value\nCAC,₹${data.cac}\nAOV,₹${data.aov}\nRepeat Rate,${data.repeat}%\nGross Margin,${data.margin}%\nCLTV,₹${cltv}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `d2cclient${clientId}_performance.csv`;
    a.click();
}


