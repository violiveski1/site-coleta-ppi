const API_KEY = "91bbc895faf81283c89819a130da37ef";

const url = `https://gnews.io/api/v4/search?q=futebol&lang=pt&country=br&max=10&apikey=${API_KEY}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        console.log("Resposta da API:", data);

        const container = document.getElementById("noticias");

        if (!container) {
            console.error("Elemento #noticias não encontrado.");
            return;
        }

        // Verifica se a API encontrou notícias
        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = `
                <p>Nenhuma notícia encontrada.</p>
            `;
            return;
        }

        // Limpa o container
        container.innerHTML = "";

        // Cria os cards das notícias
        data.articles.forEach(noticia => {
            const card = document.createElement("article");

            card.innerHTML = `
                <img
                    src="${noticia.image || 'assets/imagem-padrao.jpg'}"
                    alt="${noticia.title || 'Notícia'}"
                >

                <h2>${noticia.title || "Sem título"}</h2>

                <p>
                    ${noticia.description || "Descrição não disponível."}
                </p>

                <small>
                    Fonte: ${noticia.source?.name || "Fonte desconhecida"}
                </small>

                <a
                    href="${noticia.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ler notícia →
                </a>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar notícias:", error);

        const container = document.getElementById("noticias");

        if (container) {
            container.innerHTML = `
                <p>Não foi possível carregar as notícias.</p>
            `;
        }
    });
