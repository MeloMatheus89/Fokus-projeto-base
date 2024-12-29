const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
/* Variável da imagem: "app__image" */
const banner = document.querySelector(".app__image");
/* Variável do texto que irá mudar "app__title" */
const textoFoco = document.querySelector(".app__title");
/* Variável do botão Começar "app__card-primary-button"  */
const startPauseBt = document.querySelector("#start-pause");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const tempoNaTela = document.querySelector("#timer");

//Imagem do botão de pause
const playPauseImg = document.querySelector(".app__card-primary-butto-icon");

const displayTempo = document.querySelector("#timer");
const musica = new Audio("sons/luna-rise-part-one.mp3"); // Caminhdo do arquivo de áudio
musica.loop = true;
// Declarando os sons de pausa, início e finalização
const somPause = new Audio("sons/pause.mp3");
const somInicio = new Audio("sons/play.wav");
const somFinalizacao = new Audio("sons/beep.mp3");

let temporizadorEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  temporizadorEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  temporizadorEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  temporizadorEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      textoFoco.innerHTML = `      
      Otimize sua produtividade,
      <br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;
    case "descanso-curto":
      textoFoco.innerHTML = `
          Que tal dar uma respirada?
          <br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;
      break;
    case "descanso-longo":
      textoFoco.innerHTML = `               
               Hora de voltar à superfície
               <br />
               <strong class="app__title-strong">Faça uma pausa longa.</strong>               
               `;
      break;
    default:
      break;
  }
}

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    //to do tocar música de pause
    somPause.play();

    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
  //to do Tocar música de início
  somInicio.play();
  iniciarOuPausarBt.textContent = "Pausar";
  playPauseImg.setAttribute("src", "imagens/pause.png");
}

const contagemRegressiva = () => {
  if (temporizadorEmSegundos <= 0) {
    alert("Tempo finalizado!");
    //to do Tocar música de finalizado
    zerar();
    somFinalizacao.play();
    return;
  }
  temporizadorEmSegundos -= 1;
  mostrarTempo();
};

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  iniciarOuPausarBt.textContent = "Começar";
  playPauseImg.setAttribute("src", "imagens/play_arrow.png");
}

startPauseBt.addEventListener("click", iniciarOuPausar);

function mostrarTempo() {
  const tempo = new Date(temporizadorEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", { minute: "2-digit", second: "2-digit" });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
