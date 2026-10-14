// EcoPoint - Categorias de Descarte

const CATEGORIAS_DESCARTE = [
  {
    id: 'celulares',
    nome: 'Celulares e Tablets',
    icone: './assets/celular-sem-fundo.png',
    descricao: 'Smartphones, tablets, carregadores e acessórios',
    preparo: 'Remova conta Google/iCloud, faça backup, retire chip e cartão SD'
  },
  {
    id: 'computadores',
    nome: 'Computadores e Notebooks',
    icone: './assets/teclado.jpg',
    descricao: 'CPUs, notebooks, monitores, teclados, mouses',
    preparo: 'Faça backup, formate o disco, remova senhas de BIOS'
  },
  {
    id: 'perifericos',
    nome: 'Periféricos e Acessórios',
    icone: './assets/fone de ouvido.jpg',
    descricao: 'Fones, cabos, carregadores, webcams, pen drives',
    preparo: 'Agrupe cabos, teste funcionamento, separe por tipo'
  },
  {
    id: 'baterias',
    nome: 'Baterias e Pilhas',
    icone: './assets/pilha.png',
    descricao: 'Pilhas comuns, baterias de celular, power banks',
    preparo: 'Isole terminais com fita adesiva, separe por tipo'
  },
  {
    id: 'monitores',
    nome: 'Monitores e TVs',
    icone: './assets/monitor-sem-fundo.png',
    descricao: 'Monitores LCD/LED, TVs de tubo, plasma, LED',
    preparo: 'Proteja a tela com papelão, não quebre o tubo (CRT)'
  },
  {
    id: 'controles',
    nome: 'Controles Remotos',
    icone: './assets/controle_r.jpg',
    descricao: 'Controles de TV, ar-condicionado, portões, brinquedos',
    preparo: 'Retire pilhas, teste botões, agrupe com o aparelho'
  },
  {
    id: 'impressoras',
    nome: 'Impressoras e Scanners',
    icone: './assets/carregador.jpg',
    descricao: 'Impressoras jato de tinta, laser, multifuncionais',
    preparo: 'Retire cartuchos/toners, remova papel, proteja cabeçote'
  },
  {
    id: 'audio',
    nome: 'Equipamentos de Áudio',
    icone: './assets/fone de ouvido.jpg',
    descricao: 'Caixas de som, amplificadores, microfones, toca-fitas',
    preparo: 'Desconecte cabos, proteja cones, separe cabos de força'
  }
];

const CATEGORIAS_NAO_ACEITAS = [
  'Lâmpadas fluorescentes/LED',
  'Medicamentos e seringas',
  'Pilhas de chumbo-ácido (automotivas)',
  'Equipamentos médicos/hospitalares',
  'Resíduos industriais e químicos',
  'Óleos e lubrificantes',
  'Pneus e borrachas',
  'Móveis e madeira'
];

function renderCategorias() {
  const container = document.getElementById('categorias-descarte');
  if (!container) return;
  
  container.innerHTML = CATEGORIAS_DESCARTE.map((cat, index) => `
    <article class="card categoria-card animate-on-scroll" style="animation-delay:${index * 100}ms;">
      <div class="card-body" style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:var(--spacing-6);">
        <div class="categoria-icon" style="width:72px;height:72px;border-radius:var(--radius-lg);overflow:hidden;margin-bottom:var(--spacing-4);background:var(--color-gray-100);display:flex;align-items:center;justify-content:center;">
          <img src="${cat.icone}" alt="" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
        </div>
        <h3 style="margin-bottom:var(--spacing-2);font-size:var(--fs-lg);">${cat.nome}</h3>
        <p class="text-muted" style="font-size:var(--fs-sm);margin-bottom:var(--spacing-4);">${cat.descricao}</p>
        <details class="categoria-preparo" style="width:100%;text-align:left;">
          <summary style="cursor:pointer;font-weight:500;color:var(--color-primary);font-size:var(--fs-sm);list-style:none;">
            Preparo para descarte
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="float:right;transition:transform var(--transition-fast);">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </summary>
          <p class="text-muted" style="font-size:var(--fs-sm);margin-top:var(--spacing-2);padding-top:var(--spacing-2);border-top:1px solid var(--color-gray-200);">${cat.preparo}</p>
        </details>
      </div>
    </article>
  `).join('');
  
  // Add animation for details
  container.querySelectorAll('details').forEach(detail => {
    const summary = detail.querySelector('summary');
    const icon = summary.querySelector('svg');
    detail.addEventListener('toggle', () => {
      icon.style.transform = detail.open ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });
}

function renderCategoriasNaoAceitas() {
  const container = document.getElementById('categorias-nao-aceitas');
  if (!container) return;
  
  container.innerHTML = `
    <h4 style="margin-bottom:var(--spacing-4);color:var(--color-error);">Itens NÃO aceitos nos pontos de coleta</h4>
    <ul class="grid grid-2" style="list-style:none;padding:0;gap:var(--spacing-3);">
      ${CATEGORIAS_NAO_ACEITAS.map(item => `
        <li class="flex gap-3" style="gap:var(--spacing-3);padding:var(--spacing-3);background:var(--color-white);border:1px solid var(--color-error-border);border-radius:var(--radius-md);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" stroke-width="2" aria-hidden="true" style="flex-shrink:0;margin-top:2px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          <span style="font-size:var(--fs-sm);">${item}</span>
        </li>
      `).join('')}
    </ul>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategorias();
  renderCategoriasNaoAceitas();
});

window.EcoPointCategorias = {
  CATEGORIAS_DESCARTE,
  CATEGORIAS_NAO_ACEITAS
};