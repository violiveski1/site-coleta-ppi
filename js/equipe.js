// EcoPoint - Equipe do Projeto

const EQUIPE = [
  {
    nome: 'Alvaro Nolibos',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Arthur Rigon',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Bernardo Pimentel',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Bruno Ortiz',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Claiton Correa',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Henrique da Vida',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Ícaro Iglesias',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Mateus Olea',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  },
  {
    nome: 'Vicente Oliveski',
    papel: 'Desenvolvedor',
    foto: null,
    linkedin: null,
    github: null
  }
];

const ORIENTADORES = [
  {
    nome: 'Prof. Dr. Nome do Orientador 1',
    departamento: 'Departamento de Computação',
    email: 'orientador1@iffar.edu.br'
  },
  {
    nome: 'Prof. Dr. Nome do Orientador 2',
    departamento: 'Departamento de Meio Ambiente',
    email: 'orientador2@iffar.edu.br'
  }
];

function renderEquipe() {
  const container = document.getElementById('equipe-grid');
  if (!container) return;
  
  container.innerHTML = EQUIPE.map((membro, index) => `
    <article class="card equipe-card animate-on-scroll" style="animation-delay:${index * 100}ms;text-align:center;">
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
  
  // Add orientadores section
  const orientadoresSection = document.createElement('div');
  orientadoresSection.className = 'orientadores-section';
  orientadoresSection.style.marginTop = 'var(--spacing-12)';
  orientadoresSection.innerHTML = `
    <h3 style="text-align:center;margin-bottom:var(--spacing-6);color:var(--color-primary);">Orientadores</h3>
    <div class="grid grid-2" style="gap:var(--spacing-6);">
      ${ORIENTADORES.map((orientador, index) => `
        <article class="card orientador-card animate-on-scroll" style="animation-delay:${(EQUIPE.length + index) * 100}ms;">
          <div class="card-body" style="padding:var(--spacing-6);">
            <div class="flex gap-4" style="gap:var(--spacing-4);">
              <div class="equipe-avatar" style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--color-secondary),var(--color-secondary-light));display:flex;align-items:center;justify-content:center;font-size:var(--fs-xl);font-weight:600;color:var(--color-white);text-transform:uppercase;flex-shrink:0;">
                ${getInitials(orientador.nome)}
              </div>
              <div>
                <h4 style="margin:0 0 var(--spacing-1);font-size:var(--fs-base);color:var(--color-gray-900);">${escapeHtml(orientador.nome)}</h4>
                <p class="text-muted" style="margin:0 0 var(--spacing-1);font-size:var(--fs-sm);">${escapeHtml(orientador.departamento)}</p>
                ${orientador.email ? `<a href="mailto:${orientador.email}" class="text-muted" style="font-size:var(--fs-sm);">${escapeHtml(orientador.email)}</a>` : ''}
              </div>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;
  
  container.parentNode.appendChild(orientadoresSection);
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