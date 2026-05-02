document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initScrollReveal();
  initMagneticTilt();
  initNav();
  initMarquee();
});

function initParallax() {
  if (window.matchMedia('(hover: none)').matches) return;

  const hero = document.getElementById('hero');
  const photoWrap = hero.querySelector('.hero-photo-wrap');
  const glow = hero.querySelector('.hero-glow');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    photoWrap.style.transform = `translate(${dx * 20}px, ${dy * 15}px)`;
    glow.style.transform     = `translate(${-dx * 8}px, ${-dy * 8}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    photoWrap.style.transform = 'translate(0, 0)';
    glow.style.transform     = 'translate(0, 0)';
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));

  const statPills = document.querySelectorAll('.stat-pill');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const pills = entry.target.querySelectorAll('.stat-pill');
        pills.forEach((pill, i) => {
          setTimeout(() => pill.classList.add('revealed'), i * 120);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) statObserver.observe(aboutStats);
}

function initMagneticTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.cert-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - cy) / (rect.height / 2)) * 12;
      const rotateY = ((e.clientX - cx) / (rect.width / 2)) * 12;

      card.style.transition = 'transform 0.1s ease, box-shadow 0.25s ease';
      card.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = `transform var(--ease-tilt), box-shadow var(--ease-out)`;
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

function initNav() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const toggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((section) => sectionObserver.observe(section));

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinksContainer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinksContainer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function initMarquee() {
  // CSS-driven marquee — JS only needed if we want to pause on hover
  // Hover pause is handled via CSS (.marquee-wrapper:hover .marquee-track)
  // Nothing additional needed; this function is a hook for future JS logic.
}
