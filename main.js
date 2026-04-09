/* ═══════════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════════ */
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  // Default to dark
  let currentTheme = 'dark';
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcon(currentTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon(currentTheme);
    });
  }

  function updateToggleIcon(theme) {
    if (!toggle) return;
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    if (theme === 'dark') {
      toggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    } else {
      toggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }
})();

/* ═══════════════════════════════════════════════════
   STICKY HEADER BEHAVIOR
   ═══════════════════════════════════════════════════ */
(function () {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        header.classList.toggle('header--scrolled', scrollY > 20);
        // Hide on scroll down, show on scroll up — only after 100px
        if (scrollY > 100) {
          header.classList.toggle('header--hidden', scrollY > lastScroll + 10);
        } else {
          header.classList.remove('header--hidden');
        }
        lastScroll = Math.max(0, scrollY);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ═══════════════════════════════════════════════════
   MOBILE NAV
   ═══════════════════════════════════════════════════ */
(function () {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  let open = false;

  hamburger.addEventListener('click', () => {
    open = !open;
    hamburger.setAttribute('aria-expanded', open);
    mobileNav.classList.toggle('open', open);

    if (open) {
      hamburger.innerHTML = `
        <span style="transform: rotate(45deg) translate(5px, 5px)"></span>
        <span style="opacity: 0"></span>
        <span style="transform: rotate(-45deg) translate(5px, -5px)"></span>`;
    } else {
      hamburger.innerHTML = '<span></span><span></span><span></span>';
    }
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      hamburger.setAttribute('aria-expanded', false);
      mobileNav.classList.remove('open');
      hamburger.innerHTML = '<span></span><span></span><span></span>';
    });
  });
})();

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════ */
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ═══════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL + ACTIVE NAV HIGHLIGHT
   ═══════════════════════════════════════════════════ */
(function () {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 120) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      link.style.color = href === current ? 'var(--color-primary)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

/* ═══════════════════════════════════════════════════
   HERO STAGGER
   ═══════════════════════════════════════════════════ */
(function () {
  const elements = [
    '.hero-badge',
    '.hero-name',
    '.hero-tagline',
    '.hero-actions',
    '.hero-stats',
    '.scroll-hint'
  ];

  elements.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.7s ${0.1 + i * 0.12}s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s ${0.1 + i * 0.12}s cubic-bezier(0.16, 1, 0.3, 1)`;
      requestAnimationFrame(() => {
        el.style.opacity = '';
        el.style.transform = '';
      });
    }
  });
})();
