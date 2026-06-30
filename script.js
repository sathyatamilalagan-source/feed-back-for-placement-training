/* ============================================================
   SCRIPT.JS — Mr. Senthilkumar Appreciation Page
   ============================================================ */

/* ── 1. TYPING EFFECT ───────────────────────────────
  const el = document.getElementById('typedName');
  const text = 'Mr. Senthilkumar!';
  let index = 0;
  let started = false;

  function type() {
    if (index <= text.length) {
      el.textContent = text.slice(0, index);
      index++;
      setTimeout(type, index === 1 ? 600 : 80); // slight delay before starting
    }
  }

  // Start after hero fade-in animation (~900ms)
  setTimeout(type, 950);
})();


/* ── 2. PARTICLE CANVAS (HERO CONSTELLATION) ─────────────── */
(function initParticles() {
  const canvas  = document.getElementById('particleCanvas');
  const ctx     = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Create particle pool
  function createParticles(n) {
    particles = [];
    for (let i = 0; i < n; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r:  Math.random() * 2.2 + 0.6,
        a:  Math.random() * 0.5 + 0.3,
      });
    }
  }

  createParticles(110);

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(147,197,253,${0.18 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(147,197,253,${p.a})`;
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();


/* ── 3. SCROLL-TRIGGERED SLIDE-UP ANIMATIONS ─────────────── */
(function initScrollObserver() {
  const targets = document.querySelectorAll('.slide-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for sibling elements in same grid
          const siblings = entry.target.parentElement.querySelectorAll('.slide-up');
          let delay = 0;
          siblings.forEach((sib, idx) => {
            if (sib === entry.target) delay = idx * 80;
          });
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 500));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(t => observer.observe(t));
})();


/* ── 4. CONFETTI ANIMATION ────────────────────────────────── */
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = [
    '#3b82f6', '#93c5fd', '#1a56db', '#fbbf24',
    '#34d399', '#f472b6', '#a78bfa', '#ffffff'
  ];
  const shapes = ['circle', 'square', 'rectangle'];

  // Spawn 140 pieces
  for (let i = 0; i < 140; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');

    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size  = Math.random() * 10 + 6;
    const left  = Math.random() * 100;
    const dur   = Math.random() * 2.5 + 2;
    const delay = Math.random() * 1.2;

    piece.style.cssText = `
      left: ${left}%;
      top: 0;
      width: ${shape === 'rectangle' ? size * 2 : size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '2px'};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(piece);
  }

  // Clean up after animation
  setTimeout(() => {
    container.innerHTML = '';
  }, 5000);

  // Pulse the heart icon
  const heart = document.getElementById('heartIcon');
  heart.style.animation = 'none';
  void heart.offsetWidth; // reflow
  heart.style.animation = 'pulse-heart 0.3s ease-in-out 6';
}


/* ── 5. SMOOTH ACTIVE NAV (OPTIONAL SCROLL SPY) ──────────── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');

  // Highlight section when it's in view (for future nav bars)
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Could update a nav if one is added later
          // document.querySelectorAll(`[href="#${entry.target.id}"]`)
          //   .forEach(a => a.classList.toggle('active', true));
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => spy.observe(s));
})();


/* ── 6. BUTTON RIPPLE EFFECT (DELEGATED) ─────────────────── */
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-primary');
  if (!btn) return;

  // CSS :active handles the ripple — this adds tactile class if needed
  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 600);
});


/* ── 7. STAR ANIMATIONS ON SCROLL INTO VIEW ──────────────── */
(function initStarAnimation() {
  const ratingCards = document.querySelectorAll('.rating-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Re-trigger star animations by resetting
          const stars = entry.target.querySelectorAll('.stars i');
          stars.forEach((star, i) => {
            star.style.animation = 'none';
            void star.offsetWidth;
            star.style.animation = `star-pop 0.4s cubic-bezier(0.4,0,0.2,1) ${(i + 1) * 0.1}s forwards`;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  ratingCards.forEach(card => observer.observe(card));
})();
