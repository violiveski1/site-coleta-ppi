const URL =
  "https://opensheet.elk.sh/1tAbdoMPOTdl8jQSV_LiYbKZmggIxAkTvfv7fpcIDOwQ/Respostas%20ao%20formul%C3%A1rio%201";

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
        },
      ],
    },
  });
}

carregarGraficos();
