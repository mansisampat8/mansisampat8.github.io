// Init AOS with once:true and animation duration
AOS.init({ once: true, duration: 1100, offset: 130 });

// --- MOBILE NAV LOGIC ---
// Mobile nav toggle
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const navOpen = links.classList.toggle('open');
  document.body.style.overflow = navOpen ? 'hidden' : '';
  // Prevent nav from being cut off on mobile by scrolling page to top if menu is opened
  if (navOpen) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

// Close nav on link click (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    const links = document.getElementById('navLinks');
    links.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scroll!
  });
});

// Smooth scroll + active link highlight
document.querySelectorAll('.nav-links a, .cta-link, .cta-btn').forEach(link => {
  link.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if(hash && hash.startsWith("#") && document.querySelector(hash)) {
      e.preventDefault();
      const target = document.querySelector(hash);
      const yOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
      const y = target.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
      document.querySelectorAll('.nav-links a').forEach(l=>l.classList.remove('active'));
      const navLink = document.querySelector('.nav-links a[href="'+hash+'"]');
      if(navLink) navLink.classList.add('active');
    }
  });
});

// Make logo a home button (scroll to #home)
document.getElementById('navLogo').addEventListener('click', function(e){
  e.preventDefault();
  window.scrollTo({top: 0, behavior:'smooth'});
  document.querySelectorAll('.nav-links a').forEach(l=>l.classList.remove('active'));
  document.querySelector('.nav-links a[href="#home"]').classList.add('active');
});

// --- Staggered Cards on Scroll ---
// AOS doesn't natively support stagger, so do it manually
document.querySelectorAll('.lifecycle-cards').forEach(cardsContainer => {
  const cards = cardsContainer.querySelectorAll('.lifecycle-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = (0.08*i + 0.12) + 's';
  });
});

// --- HERO TYPEWRITER EFFECT ---
const typewriterText = "We Help Startups Scale Through Consumer Insights and Strategic Clarity.";
const textElem = document.getElementById('typewriterText');
const caretElem = document.querySelector('.type-caret');
const overlay = document.getElementById('videoOverlayText');
const video = document.getElementById('heroVideo');
let typingInterval = null;

function playTypewriterEffect() {
  overlay.classList.add('visible');
  textElem.textContent = "";
  caretElem.style.display = "inline-block";
  let i = 0;
  if (typingInterval) clearInterval(typingInterval);
  typingInterval = setInterval(() => {
    if (i <= typewriterText.length) {
      textElem.textContent = typewriterText.slice(0, i);
      i++;
    } else {
      clearInterval(typingInterval);
      caretElem.style.display = "none";
    }
  }, 100);
}; // ~10 chars/sec
}

function hideOverlay() {
  overlay.classList.remove('visible');
  textElem.textContent = "";
  caretElem.style.display = "none";
  if (typingInterval) clearInterval(typingInterval);
}

// Show typewriter when video plays
video.addEventListener('play', () => {
  playTypewriterEffect();
});
// Hide overlay when video ends or is paused
video.addEventListener('ended', hideOverlay);
video.addEventListener('pause', hideOverlay);

// On initial load, if autoplay works, show overlay
window.addEventListener('load', () => {
  if (!video.paused && !video.ended) {
    playTypewriterEffect();
  }
});

// Animate .lifecycle-card in when in viewport, staggered
function revealCardsOnScroll() {
  document.querySelectorAll('.lifecycle-card').forEach(function(card) {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      card.classList.add('aos-animate');
    }
  });
}
window.addEventListener('scroll', revealCardsOnScroll);
window.addEventListener('load', revealCardsOnScroll);

// Optional: micro-interaction for cta-btn
document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('mousedown',()=>btn.classList.add('active'));
  btn.addEventListener('mouseup',()=>btn.classList.remove('active'));
  btn.addEventListener('mouseleave',()=>btn.classList.remove('active'));
});
