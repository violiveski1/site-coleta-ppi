// EcoPoint - Gráficos de Estatísticas

const CHART_COLORS = [
  '#1b5e20', // Verde escuro
  '#1565c0', // Azul
  '#e65100', // Laranja
  '#2e7d32', // Verde médio
  '#1976d2', // Azul médio
  '#f57f17', // Laranja médio
];

const CHART_COLORS_ALT = [
  '#1b5e20',
  '#1565c0',
  '#e65100',
  '#2e7d32',
  '#1976d2',
  '#f57f17',
];

let charts = {};
let surveyData = null;

async function loadSurveyData() {
  const url = "https://opensheet.elk.sh/1tAbdoMPOTdl8jQSV_LiYbKZmggIxAkTvfv7fpcIDOwQ/Respostas%20ao%20formul%C3%A1rio%201";
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    surveyData = data;
    return data;
  } catch (error) {
    console.error('Erro ao carregar dados da pesquisa:', error);
    return null;
  }
}

function processSurveyData(data) {
  if (!data || !data.length) return null;
  
  const stats = {
    total: data.length,
    pontosColeta: {},
    conhecimento: {},
    consequencias: {},
    guardam: {}
  };
  
  data.forEach(item => {
    const p1 = item["Você conhece os pontos de coleta de lixo eletrônico da sua cidade?"];
    const p2 = item["O quanto você sabe sobre Lixo Eletrônico?"];
    const p3 = item["Você sabe as consequências do descarte incorreto de lixo eletrônico?"];
    const p4 = item["Você guarda lixo eletrônico em casa?"];
    
    if (p1) stats.pontosColeta[p1] = (stats.pontosColeta[p1] || 0) + 1;
    if (p2) stats.conhecimento[p2] = (stats.conhecimento[p2] || 0) + 1;
    if (p3) stats.consequencias[p3] = (stats.consequencias[p3] || 0) + 1;
    if (p4) stats.guardam[p4] = (stats.guardam[p4] || 0) + 1;
  });
  
  return stats;
}

function createPieChart(canvasId, data, options = {}) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  
  const labels = Object.keys(data);
  const values = Object.values(data);
  const total = values.reduce((a, b) => a + b, 0);
  
  const colors = options.colors || CHART_COLORS;
  
  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 0,
        borderRadius: 4,
        spacing: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle',
            font: { family: 'Inter', size: 11 },
            color: '#424242',
            generateLabels: (chart) => {
              const original = Chart.defaults.plugins.legend.labels.generateLabels(chart);
              const dataset = chart.data.datasets[0];
              const data = dataset.data;
              const total = data.reduce((a, b) => a + b, 0);
              return original.map((item, i) => {
                const label = item.text || chart.data.labels[i] || '';
                const value = data[i] || 0;
                const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return {
                  ...item,
                  text: `${label} (${value} - ${pct}%)`
                };
              });
            }
          }
        },
        tooltip: {
          backgroundColor: '#1a1a1a',
          titleFont: { family: 'Inter', size: 13 },
          bodyFont: { family: 'Inter', size: 12 },
          padding: 12,
          callbacks: {
            label: (context) => {
              const value = context.raw;
              const pct = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} respostas (${pct}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 800,
        easing: 'easeOutQuart'
      }
    },
    plugins: [{
      id: 'centerText',
      afterDraw: (chart) => {
        if (chart.config.type !== 'doughnut') return;
        
        const ctx = chart.ctx;
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        
        ctx.save();
        ctx.font = 'bold 28px Inter';
        ctx.fillStyle = '#1a1a1a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(total, centerX, centerY - 8);
        
        ctx.font = '11px Inter';
        ctx.fillStyle = '#757575';
        ctx.fillText('respostas', centerX, centerY + 16);
        ctx.restore();
      }
    }, {
      id: 'segmentLabels',
      afterDraw: (chart) => {
        if (chart.config.type !== 'doughnut') return;
        
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const data = chart.data.datasets[0].data;
        const total = data.reduce((a, b) => a + b, 0);
        
        ctx.save();
        ctx.font = 'bold 12px Inter';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        meta.data.forEach((arc, index) => {
          const angle = (arc.startAngle + arc.endAngle) / 2;
          const innerRadius = chart.innerRadius;
          const outerRadius = arc.outerRadius;
          const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.55;
          
          const x = chart.centerX + Math.cos(angle) * labelRadius;
          const y = chart.centerY + Math.sin(angle) * labelRadius;
          
          const value = data[index];
          const pct = ((value / total) * 100);
          
          if (pct >= 5) {
            ctx.fillText(`${pct.toFixed(1)}%`, x, y);
          }
        });
        ctx.restore();
      }
    }]
  });
  
  return chart;
}

function updateChartDescriptions(stats) {
  if (!stats) return;
  
  const descMap = {
    'chart-pontos-desc': `Total de ${stats.total} participantes. Destaque: ${getTopAnswer(stats.pontosColeta)}.`,
    'chart-conhecimento-desc': `Nível de conhecimento auto-declarado. ${getTopAnswer(stats.conhecimento)}.`,
    'chart-consequencias-desc': `Consciência sobre impactos ambientais. ${getTopAnswer(stats.consequencias)}.`,
    'chart-guardam-desc': `Hábito de armazenar eletrônicos em casa. ${getTopAnswer(stats.guardam)}.`
  };
  
  Object.entries(descMap).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
}

function getTopAnswer(obj) {
  if (!obj || !Object.keys(obj).length) return 'Sem dados';
  const entries = Object.entries(obj);
  const top = entries.reduce((a, b) => a[1] > b[1] ? a : b);
  const total = entries.reduce((a, b) => a + b[1], 0);
  const pct = ((top[1] / total) * 100).toFixed(1);
  return `Mais frequente: "${top[0]}" (${pct}%)`;
}

function renderCharts(stats) {
  if (!stats) {
    showNoDataState();
    return;
  }
  
  charts.pontosColeta = createPieChart('chart-pontos', stats.pontosColeta);
  charts.conhecimento = createPieChart('chart-conhecimento', stats.conhecimento);
  charts.consequencias = createPieChart('chart-consequencias', stats.consequencias);
  charts.guardam = createPieChart('chart-guardam', stats.guardam);
  
  updateChartDescriptions(stats);
  updateSummaryCards(stats);
  updateMetaInfo(stats);
}

function showNoDataState() {
  const canvasIds = ['chart-pontos', 'chart-conhecimento', 'chart-consequencias', 'chart-guardam'];
  canvasIds.forEach(id => {
    const canvas = document.getElementById(id);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.font = '14px Inter';
      ctx.fillStyle = '#9e9e9e';
      ctx.textAlign = 'center';
      ctx.fillText('Dados não disponíveis', canvas.width / 2, canvas.height / 2);
    }
  });
  
  const descIds = ['chart-pontos-desc', 'chart-conhecimento-desc', 'chart-consequencias-desc', 'chart-guardam-desc'];
  descIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = 'Aguardando dados da pesquisa...';
  });
}

function getPositivePercentage(obj, total) {
  if (!obj || !total) return { value: 0, pct: 0 };
  
  const positiveKeys = ['Sim', 'sim', 'SIM', 'Conheço', 'conheço', 'Bem', 'bem', 'Muito', 'muito', 'Conheço bem', 'conheço bem'];
  let positiveCount = 0;
  
  Object.entries(obj).forEach(([key, val]) => {
    if (positiveKeys.some(pk => key.toLowerCase().includes(pk.toLowerCase()))) {
      positiveCount += val;
    }
  });
  
  if (positiveCount === 0) {
    const entries = Object.entries(obj);
    if (entries.length > 0) {
      positiveCount = entries[0][1];
    }
  }
  
  return {
    value: positiveCount,
    pct: total > 0 ? ((positiveCount / total) * 100).toFixed(1) : 0
  };
}

function updateSummaryCards(stats) {
  const container = document.getElementById('stats-summary');
  if (!container) return;
  
  const total = stats.total;
  
  const pontosPos = getPositivePercentage(stats.pontosColeta, total);
  const conhecPos = getPositivePercentage(stats.conhecimento, total);
  const conseqPos = getPositivePercentage(stats.consequencias, total);
  const guardamPos = getPositivePercentage(stats.guardam, total);
  
  const cards = [
    { 
      label: 'Total de Respostas', 
      value: EcoPoint.formatNumber(total),
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
    },
    { 
      label: 'Conhecem Pontos de Coleta', 
      value: EcoPoint.formatNumber(pontosPos.value),
      sub: `${pontosPos.pct}%`,
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>'
    },
    { 
      label: 'Sabem Consequências', 
      value: EcoPoint.formatNumber(conseqPos.value),
      sub: `${conseqPos.pct}%`,
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    },
    { 
      label: 'Guardam Eletrônicos em Casa', 
      value: EcoPoint.formatNumber(guardamPos.value),
      sub: `${guardamPos.pct}%`,
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>'
    }
  ];
  
  container.innerHTML = cards.map(card => `
    <div class="card stats-card animate-on-scroll" style="text-align:center;padding:var(--spacing-6);">
      <div class="flex justify-center mb-3" style="color:var(--color-primary);">${card.icon}</div>
      <div class="stats-value" style="font-size:var(--fs-4xl);font-weight:700;color:var(--color-gray-900);line-height:1;">${card.value}</div>
      ${card.sub ? `<div class="stats-sub" style="font-size:var(--fs-lg);color:var(--color-primary);font-weight:600;margin-top:var(--spacing-1);">${card.sub}</div>` : ''}
      <div class="stats-label" style="font-size:var(--fs-sm);color:var(--color-gray-600);margin-top:var(--spacing-2);">${card.label}</div>
    </div>
  `).join('');
}

function updateMetaInfo(stats) {
  const totalEl = document.getElementById('stats-total-responses');
  const updateEl = document.getElementById('stats-last-update');
  
  if (totalEl) totalEl.textContent = `${EcoPoint.formatNumber(stats.total)} respostas`;
  if (updateEl) updateEl.textContent = `Atualizado: ${new Date().toLocaleDateString('pt-BR')}`;
}

async function initCharts() {
  const data = await loadSurveyData();
  const stats = processSurveyData(data);
  renderCharts(stats);
}

document.addEventListener('DOMContentLoaded', initCharts);

window.EcoPointCharts = {
  loadSurveyData,
  processSurveyData,
  renderCharts,
  charts: () => charts
};