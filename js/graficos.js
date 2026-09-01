const URL =
  "https://opensheet.elk.sh/1tAbdoMPOTdl8jQSV_LiYbKZmggIxAkTvfv7fpcIDOwQ/Respostas%20ao%20formul%C3%A1rio%201";

// Plugin para mostrar porcentagem no centro do gráfico
const pluginPorcentagem = {
  id: 'porcentagemCentro',
  afterDraw: function(chart) {
    if (chart.config.type === 'pie') {
      const ctx = chart.ctx;
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      
      // Calcular total
      const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
      
      // Encontrar o maior valor
      const maxValue = Math.max(...chart.data.datasets[0].data);
      const maxIndex = chart.data.datasets[0].data.indexOf(maxValue);
      const porcentagem = ((maxValue / total) * 100).toFixed(1);
      
      // Desenhar texto
      ctx.save();
      ctx.font = 'bold 16px Inter';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(porcentagem + '%', centerX, centerY);
      ctx.restore();
    }
  }
};

// Registrar plugin
Chart.register(pluginPorcentagem);

async function carregarGraficos() {
  const response = await fetch(URL);
  const dados = await response.json();

  console.log(dados);

  const tipos = {};
  const conhecimento = {};
  const consequencias = {};
  const guardam = {};

  dados.forEach((item) => {
    const tipo =
      item[
        "Você conhece os pontos de coleta de lixo eletrônico da sua cidade?"
      ];

    if (tipo) {
      tipos[tipo] = (tipos[tipo] || 0) + 1;
    }

    const respostaConhecimento =
      item["O quanto você sabe sobre Lixo Eletrônico?"];

    if (respostaConhecimento) {
      conhecimento[respostaConhecimento] =
        (conhecimento[respostaConhecimento] || 0) + 1;
    }

    const respostaConsequencias =
      item[
        "Você sabe as consequências do descarte incorreto de lixo eletrônico?"
      ];

    if (respostaConsequencias) {
      consequencias[respostaConsequencias] =
        (consequencias[respostaConsequencias] || 0) + 1;
    }

    const respostaGuardam = item["Você guarda lixo eletrônico em casa?"];

    if (respostaGuardam) {
      guardam[respostaGuardam] = (guardam[respostaGuardam] || 0) + 1;
    }
  });

  criarGraficoPizza("graficoTipos", tipos);

  criarGraficoPizza("graficoConhecimento", conhecimento);

  criarGraficoPizza("graficoConsequencias", consequencias);

  criarGraficoPizza("graficoGuardam", guardam);
}

// =========================
// FUNÇÃO PIZZA
// =========================

function criarGraficoPizza(id, dados) {
  new Chart(document.getElementById(id), {
    type: "pie",

    data: {
      labels: Object.keys(dados),

      datasets: [
        {
          data: Object.values(dados),
          backgroundColor: [
            '#1a237e', // Azul escuro
            '#ff9800', // Laranja
            '#4caf50', // Verde
            '#9c27b0', // Roxo
            '#f44336', // Vermelho
            '#00bcd4', // Ciano
            '#795548'  // Marrom
          ]
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
              family: 'Inter'
            }
          }
        }
      }
    }
  });
}

carregarGraficos();
