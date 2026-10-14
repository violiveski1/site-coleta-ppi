// EcoPoint - Notícias

const NEWS_SOURCES = [
  {
    title: 'Brasil produz 24 milhões de toneladas de lixo eletrônico por ano',
    description: 'Entenda por que isso é um problema ambiental e o que fazer com o seu lixo eletrônico. O Brasil é um dos maiores geradores de e-lixo do mundo e a reciclagem ainda é baixa.',
    url: 'https://g1.globo.com/meio-ambiente/noticia/2026/04/26/brasil-produz-24-milhoes-de-toneladas-de-lixo-eletronico-por-ano-entenda-por-que-isso-e-um-problema-ambiental-e-o-que-fazer-com-o-seu.ghtml',
    source: 'G1 - Meio Ambiente',
    author: 'Redação G1',
    date: '2026-04-26',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=220&fit=crop',
    category: 'Meio Ambiente'
  },
  {
    title: 'Descarte de eletrônicos: impactos no solo e na água',
    description: 'Reportagem especial sobre como o descarte inadequado de equipamentos eletrônicos contamina o solo e recursos hídricos com metais pesados como chumbo, mercúrio e cádmio.',
    url: 'https://portalamazonia.com/especial-publicitario/descarte-eletronicos-solo/',
    source: 'Portal Amazônia',
    author: 'Equipe Portal Amazônia',
    date: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=220&fit=crop',
    category: 'Sustentabilidade'
  },
  {
    title: 'E-waste disasters: lessons from global incidents',
    description: 'Análise de dois grandes desastres causados por descarte incorreto de resíduos eletrônicos e as lições para políticas públicas de gestão de e-lixo.',
    url: 'https://www.thedailystar.net/op-ed/politics/anatomy-two-e-waste-disasters-178141',
    source: 'The Daily Star',
    author: 'Op-Ed Contributor',
    date: '2025-11-20',
    image: 'https://images.unsplash.com/photo-1593482946807-5c8c5b0c1c5c?w=400&h=220&fit=crop',
    category: 'Política Ambiental'
  }
];

let displayedNews = 0;
const NEWS_PER_PAGE = 3;

function renderNews(newsArray = NEWS_SOURCES, append = false) {
  const container = document.getElementById('noticias-grid');
  const loadMoreBtn = document.getElementById('noticias-load-more');
  
  if (!container) return;
  
  if (!append) {
    container.innerHTML = '';
    displayedNews = 0;
  }
  
  const newsToShow = newsArray.slice(displayedNews, displayedNews + NEWS_PER_PAGE);
  
  newsToShow.forEach((news, index) => {
    const article = document.createElement('article');
    article.className = 'card news-card animate-on-scroll';
    article.style.animationDelay = `${index * 100}ms`;
    
    const formattedDate = formatDate(news.date);
    
    article.innerHTML = `
      <div class="news-image-wrapper" style="position:relative;overflow:hidden;border-radius:var(--radius-lg) var(--radius-lg) 0 0;border:3px solid var(--color-primary);border-bottom:none;">
        <img src="${news.image}" alt="" loading="lazy" style="width:100%;height:200px;object-fit:cover;transition:transform var(--transition-slow);" 
             onerror="this.src='https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=220&fit=crop'">
      </div>
      <div class="card-body" style="padding:var(--spacing-5);display:flex;flex-direction:column;height:100%;">
        <div class="flex gap-2 mb-2" style="gap:var(--spacing-2);flex-wrap:wrap;">
          <span class="badge badge-primary" style="font-size:var(--fs-xs);">${escapeHtml(news.category)}</span>
        </div>
        <h3 class="news-title" style="margin:0 0 var(--spacing-3);font-size:var(--fs-lg);line-height:1.4;color:var(--color-black);font-weight:600;">
          <a href="${news.url}" target="_blank" rel="noopener noreferrer" class="news-link" style="color:inherit;text-decoration:none;transition:color var(--transition-fast);">
            ${escapeHtml(news.title)}
          </a>
        </h3>
        <p class="news-description text-muted" style="margin:0 0 var(--spacing-4);font-size:var(--fs-sm);line-height:1.6;flex:1;">${escapeHtml(news.description)}</p>
        <div class="news-meta" style="display:flex;flex-wrap:wrap;gap:var(--spacing-3);align-items:center;font-size:var(--fs-xs);border-top:1px solid var(--color-gray-200);padding-top:var(--spacing-3);">
          <span class="news-author" style="color:#b8860b;font-weight:600;background:#fffde7;padding:2px 8px;border-radius:var(--radius-full);">${escapeHtml(news.author || 'Autor não informado')}</span>
          <span class="news-source text-muted">${escapeHtml(news.source)}</span>
          <time class="news-date text-muted" datetime="${news.date}">${formattedDate}</time>
        </div>
        <a href="${news.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm news-read-more" style="margin-top:var(--spacing-3);align-self:flex-start;">
          Ler notícia completa
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    `;
    
    // Add hover effect for image
    const img = article.querySelector('img');
    article.addEventListener('mouseenter', () => {
      if (img) img.style.transform = 'scale(1.05)';
    });
    article.addEventListener('mouseleave', () => {
      if (img) img.style.transform = 'scale(1)';
    });
    
    container.appendChild(article);
  });
  
  displayedNews += newsToShow.length;
  
  if (loadMoreBtn) {
    loadMoreBtn.style.display = displayedNews < newsArray.length ? 'inline-flex' : 'none';
  }
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function setupLoadMore() {
  const btn = document.getElementById('noticias-load-more');
  if (btn) {
    btn.addEventListener('click', () => renderNews(NEWS_SOURCES, true));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNews();
  setupLoadMore();
});

window.EcoPointNews = {
  NEWS_SOURCES,
  renderNews
};