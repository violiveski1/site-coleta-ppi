// EcoPoint - Main Application Logic

// Header scroll behavior
let lastScrollY = 0;
const header = document.querySelector('.header');

function handleHeaderScroll() {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }
  
  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('nav-menu--open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

menuToggle?.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav-menu--open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.animate-on-scroll');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// Initialize tooltips and other UI components
function initUIComponents() {
  // Add loading states to buttons
  document.querySelectorAll('.btn[data-loading]').forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.disabled) {
        this.dataset.originalText = this.innerHTML;
        this.innerHTML = '<span class="spinner"></span> Carregando...';
        this.disabled = true;
      }
    });
  });
  
  // Reset buttons with data-reset
  window.resetButton = function(btnSelector) {
    const btn = document.querySelector(btnSelector);
    if (btn && btn.dataset.originalText) {
      btn.innerHTML = btn.dataset.originalText;
      btn.disabled = false;
      delete btn.dataset.originalText;
    }
  };
}

document.addEventListener('DOMContentLoaded', initUIComponents);

// Utility functions
window.EcoPoint = {
  showToast: function(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container') || (() => {
      const c = document.createElement('div');
      c.id = 'toast-container';
      c.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(c);
      return c;
    })();
    
    const toast = document.createElement('div');
    toast.style.cssText = `
      padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);
      background:${type === 'error' ? '#c62828' : type === 'success' ? '#2e7d32' : type === 'warning' ? '#f57f17' : '#1565c0'};
      color:white;font-weight:500;max-width:350px;animation:slideIn 0.3s ease;
    `;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  
  formatNumber: function(num) {
    return new Intl.NumberFormat('pt-BR').format(num);
  },
  
  debounce: function(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }
};

// Add keyframe animations for toasts
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100%); } }
  .spinner { display:inline-block;width:16px;height:16px;border:2px solid transparent;border-top-color:currentColor;border-radius:50%;animation:spin 0.8s linear infinite;margin-right:8px; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);