// INTRO
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");

startBtn.addEventListener("click", () => {
  intro.classList.add("hide");
  mainContent.classList.add("show");
});

// DIGITAÇÃO
const texto = "Oi meu amor 💖";
const typing = document.querySelector(".typing");
let i = 0;

function digitar() {
  if (i < texto.length) {
    typing.innerHTML += texto.charAt(i);
    i++;
    setTimeout(digitar, 80);
  }
}
digitar();

// CONTADOR
const dataInicio = new Date("2026-01-10");

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
setInterval(atualizarContador, 1000);

// SCROLL
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 80) {
      sec.classList.add("active");
    }
  });
});

// CARROSSEL
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicatorsContainer = document.querySelector(".indicators");

let index = 0;
let intervalo;

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

const dots = document.querySelectorAll(".indicators div");

function atualizar() {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active-indicator"));

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

next.addEventListener("click", () => { proxima(); reset(); });
prev.addEventListener("click", () => { anterior(); reset(); });

function autoplay() {
  intervalo = setInterval(proxima, 4000);
}

function reset() {
  clearInterval(intervalo);
  autoplay();
}

autoplay();
