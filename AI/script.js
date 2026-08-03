/**
 * portfolio/script.js
 * Full-featured portfolio JavaScript
 * Features: sticky nav · typewriter · scroll reveal · skill bars ·
 *           portfolio filter · testimonial carousel · form validation
 */

/* ════════════════════════════════════════════════════════
   1. DOM READY
   ════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initTypewriter();
  initScrollReveal();
  initSkillBars();
  initPortfolioFilter();
  initTestimonialCarousel();
  initContactForm();
  initNewsletterForm();
  initActiveNavLinks();
  setCurrentYear();
  initSmoothScroll();
});


/* ════════════════════════════════════════════════════════
   2. NAVBAR — sticky + background on scroll
   ════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
}


/* ════════════════════════════════════════════════════════
   3. HAMBURGER MENU (mobile)
   ════════════════════════════════════════════════════════ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}


/* ════════════════════════════════════════════════════════
   4. TYPEWRITER EFFECT
   ════════════════════════════════════════════════════════ */
function initTypewriter() {
  const el    = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Freelancer',
    'Problem Solver',
    'Creative Coder',
  ];

  let roleIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  const typingSpeed   = 80;
  const deletingSpeed = 40;
  const pauseEnd      = 2000;
  const pauseStart    = 400;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      // Remove characters
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add characters
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing — pause then start deleting
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      delay      = pauseStart;
    }

    setTimeout(type, delay);
  }

  type();
}


/* ════════════════════════════════════════════════════════
   5. SCROLL REVEAL ANIMATIONS
   Uses IntersectionObserver for performance
   ════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Respect animation-delay set via CSS var(--delay)
        const delay = getComputedStyle(entry.target).getPropertyValue('--delay') || '0s';
        entry.target.style.transitionDelay = delay;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
}


/* ════════════════════════════════════════════════════════
   6. ANIMATED SKILL BARS
   Fills progress bars when section enters viewport
   ════════════════════════════════════════════════════════ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        fills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          // Small delay so CSS transition is visible
          requestAnimationFrame(() => {
            fill.style.width = width + '%';
          });
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  // Observe the skills section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
}


/* ════════════════════════════════════════════════════════
   7. PORTFOLIO FILTER
   ════════════════════════════════════════════════════════ */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const show     = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          // Subtle re-entry animation
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeInSlide 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}


/* ════════════════════════════════════════════════════════
   8. TESTIMONIAL CAROUSEL
   ════════════════════════════════════════════════════════ */
function initTestimonialCarousel() {
  const slides    = document.querySelectorAll('.testimonial-slide');
  const dotsWrap  = document.getElementById('carouselDots');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');

  if (!slides.length) return;

  let current      = 0;
  let autoInterval;

  // Build dot buttons
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function getDots() { return dotsWrap.querySelectorAll('.dot'); }

  function goTo(index) {
    slides[current].classList.remove('active');
    getDots()[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    getDots()[current].classList.add('active');
  }

  // Controls
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Auto-play every 5 seconds
  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 5000);
  }
  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }

  startAuto();

  // Pause on hover
  const carousel = document.querySelector('.testimonial-carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoInterval));
  carousel.addEventListener('mouseleave', startAuto);

  // Touch/swipe support
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  });
}


/* ════════════════════════════════════════════════════════
   9. CONTACT FORM VALIDATION
   ════════════════════════════════════════════════════════ */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn  = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  // Real-time validation
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur',  () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) return;

    // Simulate form submission (replace with your backend / EmailJS call)
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      await fakeSubmit(); // Simulates network delay

      formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you within 24 hours.';
      formStatus.className   = 'form-status success';
      form.reset();

      // Remove success styling from fields
      form.querySelectorAll('input, textarea').forEach(f => {
        f.classList.remove('success', 'error');
      });

    } catch (err) {
      formStatus.textContent = '❌ Something went wrong. Please try again or email me directly.';
      formStatus.className   = 'form-status error';
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

      // Auto-hide status after 6 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }, 6000);
    }
  });
}

/** Validate a single form field. Returns true if valid. */
function validateField(field) {
  const errorEl = document.getElementById(field.id + 'Error');
  let message   = '';

  if (field.hasAttribute('required') && !field.value.trim()) {
    message = 'This field is required.';
  } else if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value.trim())) {
      message = 'Please enter a valid email address.';
    }
  } else if (field.tagName === 'TEXTAREA' && field.value.trim().length < 10) {
    if (field.hasAttribute('required')) {
      message = 'Message must be at least 10 characters.';
    }
  }

  if (message) {
    field.classList.add('error');
    field.classList.remove('success');
    if (errorEl) errorEl.textContent = message;
    return false;
  } else {
    field.classList.remove('error');
    field.classList.add('success');
    if (errorEl) errorEl.textContent = '';
    return true;
  }
}

/** Simulates a network request. Replace with real API call. */
function fakeSubmit() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 95% success rate for demo; remove this and use real submission
      Math.random() > 0.05 ? resolve() : reject(new Error('Network error'));
    }, 1500);
  });
}


/* ════════════════════════════════════════════════════════
   10. NEWSLETTER FORM
   ════════════════════════════════════════════════════════ */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('button');

    if (!input.value.trim()) return;

    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = '#22c55e';
    input.value = '';

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
    }, 3000);
  });
}


/* ════════════════════════════════════════════════════════
   11. ACTIVE NAV LINK ON SCROLL (Intersection Observer)
   ════════════════════════════════════════════════════════ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35,
  });

  sections.forEach(section => observer.observe(section));
}


/* ════════════════════════════════════════════════════════
   12. SMOOTH SCROLL (polyfill for older browsers)
   ════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


/* ════════════════════════════════════════════════════════
   13. FOOTER YEAR
   ════════════════════════════════════════════════════════ */
function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}
