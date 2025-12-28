// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const currentYearSpan = document.getElementById('currentYear');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Projects filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Parallax effect for floating elements
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.floating-element');

  parallaxElements.forEach((element, index) => {
    const speed = 0.1 + (index * 0.05);
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Animate skill progress bars on scroll
const skillItems = document.querySelectorAll('.skill-progress');
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillProgress = entry.target;
      skillProgress.style.setProperty('--progress', skillProgress.style.getPropertyValue('--progress'));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

skillItems.forEach(item => {
  observer.observe(item);
});

// Set current year in footer
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log("Quynh's Creative Portfolio loaded successfully! ✨");

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') return;

      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animate elements on load
  const animatedElements = document.querySelectorAll('.glass-card, .project-card, .timeline-content');
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100 * index);
  });

  // Add floating animation to hero elements
  const floatingElements = document.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });

  // Add typewriter effect to hero subtitle (optional)
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';

    let charIndex = 0;
    function typeWriter() {
      if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 30);
      }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
  }
});

// Fun interactive cursor effect (optional)
document.addEventListener('mousemove', (e) => {
  const cursorTrail = document.createElement('div');
  cursorTrail.className = 'cursor-trail';
  cursorTrail.style.left = `${e.clientX}px`;
  cursorTrail.style.top = `${e.clientY}px`;

  // Random color from theme
  const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-success)', 'var(--color-warning)'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  cursorTrail.style.backgroundColor = randomColor;

  document.body.appendChild(cursorTrail);

  // Remove after animation
  setTimeout(() => {
    cursorTrail.remove();
  }, 1000);
});

// Add CSS for cursor trail
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  .cursor-trail {
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.7;
    animation: cursorFade 1s ease-out forwards;
  }

  @keyframes cursorFade {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(cursorStyle);
