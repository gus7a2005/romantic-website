// INTRO
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    intro.classList.add("hide");
    mainContent.classList.add("show");
    // iniciar digitação quando o usuário iniciar a experiência
    setTimeout(digitar, 300);
  });
}

// DIGITAÇÃO
const texto = "Oi meu amor 💖";
const typing = document.querySelector(".typing");
let i = 0;

function digitar() {
  if (!typing) return;
  if (i < texto.length) {
    typing.innerHTML += texto.charAt(i);
    i++;
    setTimeout(digitar, 80);
  }
}

// CONTADOR
const dataInicio = new Date("2026-01-10T00:00:00");

function atualizarContador() {
  const agora = new Date();
  const diff = agora - dataInicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("contador").innerHTML =
    `${dias} dias, ${horas}h ${minutos}m ${segundos}s 💕`;
}
// atualizar imediatamente e depois a cada segundo
atualizarContador();
setInterval(atualizarContador, 1000);

// SCROLL
const reveals = document.querySelectorAll(".reveal");
function checkReveals() {
  reveals.forEach((sec) => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 80) {
      sec.classList.add("active");
    }
  });
}
window.addEventListener("scroll", checkReveals);
// checar no load caso já esteja visível
window.addEventListener("load", checkReveals);

// CARROSSEL
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicatorsContainer = document.querySelector(".indicators");

let index = 0;
let intervalo;

if (slides.length && indicatorsContainer) {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    if (i === 0) dot.classList.add("active-indicator");

    dot.addEventListener("click", () => {
      index = i;
      atualizar();
      reset();
    });

    indicatorsContainer.appendChild(dot);
  });

  const dots = indicatorsContainer.querySelectorAll("div");

  function atualizar() {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active-indicator"));

    slides[index].classList.add("active");
    dots[index].classList.add("active-indicator");
  }

  function proxima() {
    index = (index + 1) % slides.length;
    atualizar();
  }

  function anterior() {
    index = (index - 1 + slides.length) % slides.length;
    atualizar();
  }

  if (next)
    next.addEventListener("click", () => {
      proxima();
      reset();
    });
  if (prev)
    prev.addEventListener("click", () => {
      anterior();
      reset();
    });

  function autoplay() {
    intervalo = setInterval(proxima, 4000);
  }

  function reset() {
    clearInterval(intervalo);
    autoplay();
  }

  // começar com o slide inicial
  atualizar();
  autoplay();
}
