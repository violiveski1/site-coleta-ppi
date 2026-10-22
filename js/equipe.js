// EcoPoint - Equipe do Projeto

const EQUIPE = [
  {
    nome: 'Álvaro Nolibos',

    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Arthur Rigon',

    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Bernardo Pimentel',

    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Bruno Ortiz',
  
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Henrique da Vida',

    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Mateus Olea',

    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Vicente Oliveski',
    foto: null,
    linkedin: null,
    github: null
  }
];

const ORIENTADORES = [
  {
    nome: 'Claiton Correa',
    papel: 'Orientador',
    departamento: 'Departamento de Computação',
    email: 'claiton.correa@iffarroupilha.edu.br'
  },
  {
    nome: 'Ícaro Iglesias',
    papel: 'Co-Orientador',
    departamento: 'Departamento de Computação',
    email: 'icaro.iglesias@iffarroupilha.edu.br'
  }
];

let currentSlide = 0;
let slideWidth = 0;
let maxSlides = 0;

function renderEquipe() {
  const track = document.getElementById('equipe-carousel-track');
  const dotsContainer = document.getElementById('equipe-dots');
  const orientadoresContainer = document.getElementById('orientadores-section');
  
  if (!track) return;

  // Render team members
  track.innerHTML = EQUIPE.map((membro, index) => `
    <article class="equipe-slide card equipe-card" style="text-align:center;flex:0 0 ${100 / getSlidesPerView()}%;min-width:280px;padding:var(--spacing-6);">
      <div class="card-body" style="padding:var(--spacing-6);">
        <div class="equipe-avatar" style="width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-light));display:flex;align-items:center;justify-content:center;margin:0 auto var(--spacing-4);font-size:var(--fs-2xl);font-weight:600;color:var(--color-white);text-transform:uppercase;">
          ${getInitials(membro.nome)}
        </div>
        <h3 style="margin:0 0 var(--spacing-1);font-size:var(--fs-lg);color:var(--color-gray-900);">${escapeHtml(membro.nome)}</h3>
        <p class="text-muted" style="margin:0 0 var(--spacing-4);font-size:var(--fs-sm);">${escapeHtml(membro.papel)}</p>
        <div class="equipe-links flex justify-center gap-3" style="gap:var(--spacing-3);">
          ${membro.linkedin ? `<a href="${membro.linkedin}" target="_blank" rel="noopener" class="text-muted" aria-label="LinkedIn de ${escapeHtml(membro.nome)}" style="transition:color var(--transition-fast);"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>` : ''}
          ${membro.github ? `<a href="${membro.github}" target="_blank" rel="noopener" class="text-muted" aria-label="GitHub de ${escapeHtml(membro.nome)}" style="transition:color var(--transition-fast);"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Render dots
  maxSlides = EQUIPE.length - getSlidesPerView() + 1;
  if (maxSlides < 1) maxSlides = 1;
  
  dotsContainer.innerHTML = Array.from({ length: maxSlides }, (_, i) => `
    <button class="equipe-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Ir para slide ${i + 1}"></button>
  `).join('');

  // Render orientadores
  if (orientadoresContainer) {
    orientadoresContainer.innerHTML = `
      <h3 style="text-align:center;margin-bottom:var(--spacing-6);margin-top:var(--spacing-12);color:var(--color-primary);">Orientadores</h3>
      <div class="grid grid-2" style="gap:var(--spacing-6);max-width:720px;margin:0 auto;">
        ${ORIENTADORES.map((orientador, index) => `
          <article class="card orientador-card animate-on-scroll" style="animation-delay:${index * 100}ms;">
            <div class="card-body" style="padding:var(--spacing-6);">
              <div class="flex gap-4" style="gap:var(--spacing-4);">
                <div class="equipe-avatar" style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--color-secondary),var(--color-secondary-light));display:flex;align-items:center;justify-content:center;font-size:var(--fs-xl);font-weight:600;color:var(--color-white);text-transform:uppercase;flex-shrink:0;">
                  ${getInitials(orientador.nome)}
                </div>
                <div>
                  <h4 style="margin:0 0 var(--spacing-1);font-size:var(--fs-base);color:var(--color-gray-900);">${escapeHtml(orientador.nome)}</h4>
                  <p class="text-muted" style="margin:0 0 var(--spacing-1);font-size:var(--fs-sm);">${escapeHtml(orientador.papel)}</p>
                  <p class="text-muted" style="margin:0 0 var(--spacing-1);font-size:var(--fs-sm);">${escapeHtml(orientador.departamento)}</p>
                  ${orientador.email ? `<a href="mailto:${orientador.email}" class="text-muted" style="font-size:var(--fs-sm);">${escapeHtml(orientador.email)}</a>` : ''}
                </div>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  initCarousel();
}

function getSlidesPerView() {
  const width = window.innerWidth;
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

function initCarousel() {
  const track = document.getElementById('equipe-carousel-track');
  const prevBtn = document.getElementById('equipe-prev');
  const nextBtn = document.getElementById('equipe-next');
  const dotsContainer = document.getElementById('equipe-dots');
  
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  updateSlideWidth();
  
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  
  dotsContainer.querySelectorAll('.equipe-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
  }, { passive: true });

  // Keyboard navigation
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  });

  // Recalculate on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSlidesPerView = getSlidesPerView();
      const newMaxSlides = EQUIPE.length - newSlidesPerView + 1;
      if (newMaxSlides !== maxSlides) {
        maxSlides = Math.max(1, newMaxSlides);
        currentSlide = Math.min(currentSlide, maxSlides - 1);
        updateDots();
        updateSlideWidth();
        goToSlide(currentSlide);
      } else {
        updateSlideWidth();
        goToSlide(currentSlide);
      }
    }, 100);
  });
}

function updateSlideWidth() {
  const track = document.getElementById('equipe-carousel-track');
  const viewport = document.querySelector('.equipe-carousel-viewport');
  if (!track || !viewport) return;
  
  const slides = track.querySelectorAll('.equipe-slide');
  if (slides.length === 0) return;
  
  const viewportWidth = viewport.offsetWidth;
  const slidesPerView = getSlidesPerView();
  const gap = 24; // CSS gap value
  
  slideWidth = (viewportWidth - gap * (slidesPerView - 1)) / slidesPerView;
  
  slides.forEach(slide => {
    slide.style.flex = `0 0 ${slideWidth}px`;
  });
  
  goToSlide(currentSlide);
}

function goToSlide(index) {
  const track = document.getElementById('equipe-carousel-track');
  const prevBtn = document.getElementById('equipe-prev');
  const nextBtn = document.getElementById('equipe-next');
  
  if (!track) return;
  
  maxSlides = Math.max(1, EQUIPE.length - getSlidesPerView() + 1);
  currentSlide = Math.max(0, Math.min(index, maxSlides - 1));
  
  const translateX = -currentSlide * (slideWidth + 24); // slideWidth + gap
  track.style.transform = `translateX(${translateX}px)`;
  
  updateDots();
  
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide >= maxSlides - 1;
  
  prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
  nextBtn.style.opacity = currentSlide >= maxSlides - 1 ? '0.5' : '1';
}

function updateDots() {
  const dotsContainer = document.getElementById('equipe-dots');
  if (!dotsContainer) return;
  
  dotsContainer.querySelectorAll('.equipe-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function getInitials(nome) {
  return nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', renderEquipe);

window.EcoPointEquipe = { EQUIPE, ORIENTADORES };