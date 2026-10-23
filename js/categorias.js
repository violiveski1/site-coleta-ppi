// EcoPoint - Categorias de Descarte

const CATEGORIAS_DESCARTE = [
  {
    id: 'celulares',
    nome: 'Celulares e Tablets',
    icone: './assets/celular.png',
    descricao: 'Smartphones, tablets, carregadores, cabos USB',
    preparo: 'Faça backup dos dados, remova contas Google e iCloud, retire chip e cartão SD, desbloqueie a tela'
  },
  {
    id: 'computadores',
    nome: 'Computadores e Notebooks',
    icone: './assets/notebook.png',
    descricao: 'CPUs, notebooks, netbooks',
    preparo: 'Faça backup dos dados, formate o disco ou destrua fisicamente, remova senhas de BIOS e HD'
  },
  {
    id: 'perifericos',
    nome: 'Periféricos e Acessórios',
    icone: './assets/fone_de_ouvido.png',
    descricao: 'Teclados, mouses, cabos de força, fones de ouvido, headsets, webcams, pen drives, HDs externos, hubs, adaptadores',
    preparo: 'Teste o funcionamento, agrupe cabos com elásticos, separe por tipo, limpe conectores'
  },
  {
    id: 'baterias',
    nome: 'Baterias e Pilhas',
    icone: './assets/pilha2.png',
    descricao: 'Pilhas alcalinas AA, AAA, C, D, 9V, baterias de íon-lítio de celular e notebook, power banks, baterias de UPS de pequeno porte',
    preparo: 'Isole terminais com fita adesiva, separe por química alcalina, lítio e níquel, não misture tipos diferentes'
  },
  {
    id: 'monitores',
    nome: 'Monitores e TVs',
    icone: './assets/monitor.png',
    descricao: 'Monitores LCD, LED, OLED, TVs LED, LCD, Plasma, monitores CRT de tubo, informe o tipo no ponto',
    preparo: 'Proteja a tela com papelão ou plástico bolha, não quebre tubo CRT por conter vácuo e chumbo, embale bem para transporte'
  },
  {
    id: 'controles',
    nome: 'Controles Remotos',
    icone: './assets/controle.png',
    descricao: 'Controles de TV, ar-condicionado, portão eletrônico, home theater, controles remotos de brinquedos eletrônicos, apresentadores wireless',
    preparo: 'Retire as pilhas para evitar vazamento, teste botões, limpe contatos se oxidados, agrupe com o aparelho se possível'
  },
  {
    id: 'impressoras',
    nome: 'Impressoras e Scanners',
    icone: './assets/impressora.jpg',
    descricao: 'Impressoras jato de tinta, laser, tanque de tinta, multifuncionais, scanners de mesa, plotters',
    preparo: 'Retire cartuchos e toners para reciclagem separada, remova papel, trave cabeçote em jato de tinta, proteja vidro do scanner'
  },
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