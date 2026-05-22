let ultimoScroll = 0;
const header = document.querySelector(".cabecalho");

window.addEventListener("scroll", () => {
  let atual = window.scrollY;

  if (atual > ultimoScroll) {
    header.classList.add("escondido");
  } else {
    header.classList.remove("escondido");
  }

  ultimoScroll = atual;
});
