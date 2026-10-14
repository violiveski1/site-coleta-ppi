// EcoPoint - Estatísticas Adicionais e Utilitários

// This file handles additional statistics functionality
// Main charts are handled in graficos.js

function initEstatisticasExtras() {
  // Animate stat numbers when they come into view
  const statValues = document.querySelectorAll('.stats-value, .hero-stat-value');
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statValues.forEach(el => statObserver.observe(el));
}

function animateValue(element) {
  const target = element.textContent;
  const isPercentage = target.includes('%');
  const numericTarget = parseFloat(target.replace(/[^\d.]/g, ''));
  
  if (isNaN(numericTarget)) return;
  
  const duration = 1500;
  const startTime = performance.now();
  const startValue = 0;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = startValue + (numericTarget - startValue) * eased;
    
    if (isPercentage) {
      element.textContent = current.toFixed(1) + '%';
    } else if (numericTarget >= 1000) {
      element.textContent = EcoPoint.formatNumber(Math.round(current));
    } else {
      element.textContent = Math.round(current).toString();
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Export for use in other modules
window.EcoPointEstatisticas = {
  initEstatisticasExtras,
  animateValue
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', initEstatisticasExtras);