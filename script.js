// ========================================================
// SenCare — Site Interactions
// ========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Smooth scroll for nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // collapse mobile nav after click
          const navCollapse = document.getElementById('mainNav');
          if (navCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navCollapse).hide();
          }
        }
      }
    });
  });

  /* ---------- Highlight active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ---------- Animated stat counters ---------- */
  const statNumbers = document.querySelectorAll('.stat-num');
  let counted = false;

  const animateCounters = () => {
    statNumbers.forEach(el => {
      const target = parseInt(el.textContent, 10);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 60));

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(counter);
        } else {
          el.textContent = current;
        }
      }, 25);
    });
  };

  const statSection = document.querySelector('.stat-row');
  if (statSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          animateCounters();
          counted = true;
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statSection);
  }

});