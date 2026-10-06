// ========================================
// CONFIGURAÇÃO DO MAPA
// ========================================

const mapa = L.map("map").setView([-28.6600, -56.0040], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(mapa);


// ========================================
// ECOPOINTS (pontos fixos)
// Para adicionar um novo ponto, basta copiar um bloco abaixo.
// ========================================

const ecopoints = [
    {
        nome: "EcoPoint 1",
        latitude: -28.6600,
        longitude: -56.0040,
        descricao: "Ponto de coleta de lixo eletrônico."
    },
    {
        nome: "EcoPoint 2",
        latitude: -28.6700,
        longitude: -56.0100,
        descricao: "Ponto de coleta de eletrônicos."
    },
    {
        nome: "EcoPoint 3",
        latitude: -28.6650,
        longitude: -56.0150,
        descricao: "Ponto de descarte responsável."
    }
];


// ========================================
// VARIÁVEIS
// ========================================

let localUsuario = null;
let marcadorUsuario = null;
let ecopointSelecionado = null;
let rotaAtual = null;


// ========================================
// PAINEL DE MENSAGENS (substitui os alert)
// ========================================

function mostrarInfo(html, tipo) {
    const painel = document.getElementById("infoRota");

    // Se o painel não existir no HTML, avisa por alert para não ficar mudo
    if (!painel) {
        alert(html.replace(/<[^>]+>/g, ""));
        return;
    }

    painel.className = "info-rota" + (tipo ? " info-rota--" + tipo : "");
    painel.innerHTML = html;
}

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}


// ========================================
// ADICIONAR ECOPOINTS AO MAPA
// ========================================

ecopoints.forEach((ecopoint, indice) => {

    L.marker([ecopoint.latitude, ecopoint.longitude])
        .addTo(mapa)
        .bindPopup(`
            <strong>${escaparHTML(ecopoint.nome)}</strong>
            <br>
            ${escaparHTML(ecopoint.descricao)}
            <br><br>
            <button type="button" class="btn-popup-rota"
                onclick="selecionarEcoPoint(${indice})">
                Traçar rota até aqui
            </button>
        `);
});


// ========================================
// SELECIONAR ECOPOINT
// ========================================

function selecionarEcoPoint(indice) {

    ecopointSelecionado = ecopoints[indice];
    mapa.closePopup();

    // Já sabemos onde o usuário está: traça direto
    if (localUsuario) {
        calcularRota();
        return;
    }

    // Ainda não: pede a localização e a rota sai em seguida
    mostrarInfo(
        `Destino: <strong>${escaparHTML(ecopointSelecionado.nome)}</strong>. ` +
        `Obtendo sua localização...`
    );
    minhaLocalizacao();
}


// ========================================
// PEGAR LOCALIZAÇÃO DO USUÁRIO
// ========================================

function minhaLocalizacao() {

    if (!navigator.geolocation) {
        mostrarInfo("Seu navegador não suporta geolocalização.", "erro");
        return;
    }

    mostrarInfo("Obtendo sua localização...");

    navigator.geolocation.getCurrentPosition(

        function (posicao) {

            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;

            localUsuario = { latitude, longitude };

            if (marcadorUsuario) {
                mapa.removeLayer(marcadorUsuario);
            }

            // Círculo azul para diferenciar dos EcoPoints
            marcadorUsuario = L.circleMarker([latitude, longitude], {
                radius: 9,
                color: "#ffffff",
                weight: 3,
                fillColor: "#1a73e8",
                fillOpacity: 1
            })
            .addTo(mapa)
            .bindPopup("<strong>📍 Você está aqui!</strong>");

            if (ecopointSelecionado) {
                calcularRota();
            } else {
                mapa.setView([latitude, longitude], 15);
                marcadorUsuario.openPopup();
                mostrarInfo(
                    "Localização encontrada. Clique em um EcoPoint e depois em " +
                    "<strong>Traçar rota até aqui</strong>.",
                    "ok"
                );
            }
        },

        function (erro) {

            console.error("Erro ao obter localização:", erro);

            let mensagem = "Não foi possível obter sua localização.";

            if (erro.code === 1) {
                mensagem += " Você negou a permissão. Libere o acesso à localização no navegador.";
            } else if (erro.code === 2) {
                mensagem += " Posição indisponível no momento.";
            } else if (erro.code === 3) {
                mensagem += " Tempo esgotado, tente novamente.";
            }

            mostrarInfo(mensagem, "erro");
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


// ========================================
// CALCULAR ROTA COM OSRM
// ========================================

function calcularRota() {

    if (!localUsuario) {
        mostrarInfo("Primeiro clique em <strong>Minha localização</strong>.", "erro");
        return;
    }

    if (!ecopointSelecionado) {
        mostrarInfo("Primeiro escolha um EcoPoint no mapa.", "erro");
        return;
    }

    const origem = `${localUsuario.longitude},${localUsuario.latitude}`;
    const destino = `${ecopointSelecionado.longitude},${ecopointSelecionado.latitude}`;

    const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${origem};${destino}` +
        `?overview=full&geometries=geojson`;

    mostrarInfo("Calculando rota...");

    fetch(url)

        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })

        .then(data => {

            if (!data.routes || data.routes.length === 0) {
                mostrarInfo("Não foi possível encontrar uma rota até esse ponto.", "erro");
                return;
            }

            const rota = data.routes[0];

            if (rotaAtual) {
                mapa.removeLayer(rotaAtual);
            }

            rotaAtual = L.geoJSON(rota.geometry, {
                style: { color: "#1a73e8", weight: 5, opacity: 0.85 }
            }).addTo(mapa);

            mapa.fitBounds(rotaAtual.getBounds(), { padding: [30, 30] });

            const distancia = (rota.distance / 1000).toFixed(2).replace(".", ",");
            const minutos = Math.round(rota.duration / 60);

            mostrarInfo(
                `<strong>Rota até ${escaparHTML(ecopointSelecionado.nome)}</strong><br>` +
                `Distância: ${distancia} km &nbsp;|&nbsp; ` +
                `Tempo estimado (de carro): ${minutos} min`,
                "ok"
            );
        })

        .catch(error => {
            console.error("Erro ao calcular rota:", error);
            mostrarInfo("Não foi possível calcular a rota. Tente novamente.", "erro");
        });
}


// ========================================
// LIMPAR ROTA
// ========================================

function limparRota() {

    if (rotaAtual) {
        mapa.removeLayer(rotaAtual);
        rotaAtual = null;
    }

    ecopointSelecionado = null;
    mostrarInfo("Rota removida.");
}


// ========================================
// BOTÕES
// ========================================

function ligarBotao(id, funcao) {
    const botao = document.getElementById(id);
    if (botao) {
        botao.addEventListener("click", funcao);
    } else {
        console.warn(`Botão #${id} não encontrado no HTML.`);
    }
}

ligarBotao("btnLocalizacao", minhaLocalizacao);
ligarBotao("btnRota", calcularRota);
ligarBotao("btnLimparRota", limparRota);
