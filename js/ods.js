// EcoPoint - ODS (Objetivos de Desenvolvimento Sustentável)

const ODS_DATA = [
  {
    id: 12,
    titulo: 'ODS 12 - Consumo e Produção Responsáveis',
    metas: 'Metas 12.4 e 12.8',
    icone: './assets/ods-12.svg',
    cor: '#bf8b2e',
    descricao: 'O EcoPoint auxilia na destinação correta de resíduos eletrônicos, evitando o descarte inadequado de materiais que podem contaminar o solo, a água e o meio ambiente. Além disso, o projeto busca informar e conscientizar a população sobre a importância da reciclagem através da plataforma web.',
    detalhes: [
      'Gestão ambientalmente adequada de produtos químicos e resíduos',
      'Informação e conscientização para estilos de vida sustentáveis',
      'Redução da geração de resíduos por meio de prevenção, redução, reciclagem e reuso'
    ]
  },
  {
    id: 11,
    titulo: 'ODS 11 - Cidades e Comunidades Sustentáveis',
    metas: 'Meta 11.6',
    icone: './assets/ods-11.svg',
    cor: '#e07b2e',
    descricao: 'Ao oferecer pontos de coleta acessíveis e monitoramento inteligente dos coletores, o EcoPoint contribui para reduzir o impacto ambiental negativo per capita nas cidades, melhorando a gestão de resíduos e a qualidade do ar e do solo em áreas urbanas.',
    detalhes: [
      'Reduzir impacto ambiental negativo per capita nas cidades',
      'Atenção especial à qualidade do ar e gestão de resíduos',
      'Acesso universal a espaços verdes e públicos seguros'
    ]
  },
  {
    id: 13,
    titulo: 'ODS 13 - Ação Contra a Mudança Global do Clima',
    metas: 'Meta 13.3',
    icone: './assets/ods-13.svg',
    cor: '#2e7d32',
    descricao: 'O descarte correto de eletrônicos evita a emissão de gases de efeito estufa provenientes da decomposição inadequada e da extração de novas matérias-primas. O projeto promove a educação climática conscientizando sobre a pegada de carbono dos resíduos eletrônicos.',
    detalhes: [
      'Melhorar educação e conscientização sobre mudança climática',
      'Redução de emissões através de reciclagem e economia circular',
      'Capacitação institucional para mitigação e adaptação'
    ]
  },
  {
    id: 9,
    titulo: 'ODS 9 - Indústria, Inovação e Infraestrutura',
    metas: 'Metas 9.4 e 9.5',
    icone: './assets/ods-9.svg',
    cor: '#1565c0',
    descricao: 'O EcoPoint integrará sistemas embarcados (Arduino) com plataforma web, criando infraestrutura tecnológica inovadora para gestão de resíduos. Promove a modernização industrial através da reciclagem e recuperação de materiais valiosos dos eletrônicos descartados.',
    detalhes: [
      'Modernizar infraestrutura e indústrias para sustentabilidade',
      'Aumentar pesquisa científica e capacidade tecnológica',
      'Promover industrialização inclusiva e sustentável'
    ]
  }
];

function renderODS() {
  const container = document.getElementById('ods-grid');
  if (!container) return;
  
  container.innerHTML = ODS_DATA.map((ods, index) => `
    <article class="card ods-card animate-on-scroll" style="animation-delay:${index * 100}ms;position:relative;overflow:hidden;">
      <div class="ods-header" style="padding:var(--spacing-5) var(--spacing-6) var(--spacing-4);background:linear-gradient(135deg,${ods.cor}22,${ods.cor}11);border-bottom:1px solid ${ods.cor}33;display:flex;align-items:center;gap:var(--spacing-4);">
        <div class="ods-icon-wrapper" style="width:64px;height:64px;border-radius:var(--radius-lg);background:${ods.cor}1a;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <img src="${ods.icone}" alt="" style="width:40px;height:40px;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
          <span style="display:none;font-size:var(--fs-2xl);font-weight:700;color:${ods.cor};">${ods.id}</span>
        </div>
        <div>
          <h3 class="ods-title" style="margin:0 0 var(--spacing-1);font-size:var(--fs-base);font-weight:600;color:var(--color-gray-900);">${escapeHtml(ods.titulo)}</h3>
          <span class="ods-metas badge" style="font-size:var(--fs-xs);background:${ods.cor}22;color:${ods.cor};border-color:${ods.cor}44;">${escapeHtml(ods.metas)}</span>
        </div>
      </div>
      <div class="card-body" style="padding:var(--spacing-5) var(--spacing-6);">
        <p class="ods-descricao text-muted" style="margin:0 0 var(--spacing-4);font-size:var(--fs-sm);line-height:1.6;">${escapeHtml(ods.descricao)}</p>
        <ul class="ods-detalhes" style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--spacing-2);">
          ${ods.detalhes.map(detalhe => `
            <li class="flex gap-3" style="gap:var(--spacing-3);font-size:var(--fs-sm);color:var(--color-gray-700);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${ods.cor}" stroke-width="2" aria-hidden="true" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ${escapeHtml(detalhe)}
            </li>
          `).join('')}
        </ul>
      </div>
    </article>
  `).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', renderODS);

window.EcoPointODS = { ODS_DATA };