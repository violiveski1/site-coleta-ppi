// Animaciones fade-in com Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    // Elementos que receberão a animação
    const elementos = document.querySelectorAll('.secao-sobre, .secao-descarte, .secao-mapa, .secao-estatisticas, .secao-graficos, .participantes, .ods, .card-estatistica, .grafico');
    
    // Configuração do Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Opcional: parar de observar após animar
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Quando 10% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px' // Margem inferior
    });
    
    // Adicionar classe inicial e observar
    elementos.forEach(elemento => {
        elemento.classList.add('fade-in');
        observer.observe(elemento);
    });
});