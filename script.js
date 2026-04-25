 // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    // dot follows instantly — no lag
    cursor.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
  });

  // ring follows with very light smoothing (factor 0.25 = fast but not instant)
  function animateRing() {
    rx += (mx - rx) * 0.25;
    ry += (my - ry) * 0.25;
    ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

  document.querySelectorAll('a, button, .project-card, .skill-card, .info-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Progress bar
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .timeline-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  // Stagger timeline
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  // Hamburger
  const ham = document.getElementById('hamburger');
  const mNav = document.getElementById('mobileNav');
  let open = false;
  ham.addEventListener('click', () => {
    open = !open;
    mNav.classList.toggle('open', open);
    const spans = ham.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  function closeMobile() {
    open = false;
    mNav.classList.remove('open');
    ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold2)' : '';
    });
  });

  // Smooth parallax on hero
  window.addEventListener('scroll', () => {
    const hero = document.getElementById('home');
    if (hero) {
      const scroll = window.scrollY;
      hero.querySelector('.hero-grid').style.transform = `translateY(${scroll * 0.3}px)`;
    }
  });

  // IronForge image slider
  let ironIdx = 0;
  const ironSlides = document.querySelectorAll('.iron-slide');
  const ironDots = document.querySelectorAll('.iron-dot');
  function ironGo(n) {
    ironSlides[ironIdx].style.opacity = '0';
    ironDots[ironIdx].style.opacity = '0.3';
    ironIdx = n;
    ironSlides[ironIdx].style.opacity = '1';
    ironDots[ironIdx].style.opacity = '1';
  }
  setInterval(() => ironGo((ironIdx + 1) % ironSlides.length), 3000);
