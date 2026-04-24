const nomesOriginais = [
"Abner","Mariana Cristina","Maria José","Flaviane","Lucas Tiago","Sara","Caio Moreira","Margarete","Dannilo","José David",
"Raquel","Mateus","Rafael Boeira","Flávia","Rafaela","Jéssica Fernanda","Cleverson","Helia","Ozamar","Onri",
"Priscila","Israel","Evelyn","Gabriel","Patrícia","Max","Lucas Gonçalves","Luana Bueno","Reianchell","Merli",
"Alexandre","Luiz Carlos","Maricler","Guilherme","Rebeca","Caio Miguel","Paula Caroline","Nikolas","Fernanda Caroline","Jessica Martins",
"Theodoro","Rosa Aurora","Noemi","Kevin","Luana Borges","Leonardo","Alex","Amanda","Willian Rodrigues","Amabilie",
"Kesia","Lucas Sant'Anna","Isabella","Maria Helena","Beijamin","Rafael Borges","Caio Borges","Lívia","Alice","William Alencar",
"Elisabeth","Noah","Cecília","Helena"
];

let grupoAtual = "";
let perguntaAtual = 0;
let alternativaSelecionada = null;
let grupoRespondendo = null;

let estado = JSON.parse(localStorage.getItem("vicenteFesta")) || {
disponiveis:[...nomesOriginais],
grupos:{Elfos:[],Hobbits:[],"Anões":[],Magos:[]}
};

let pontosQuiz = JSON.parse(localStorage.getItem("pontosQuiz")) || {
Elfos:0,Hobbits:0,"Anões":0,Magos:0
};

let perguntas = [
{titulo:"🌿 O Tombo em Mordor",texto:"Com quantos meses Vicente machucou a boca?",alternativas:["4 meses","7 meses","10 meses"],correta:1},
{titulo:"🍌 Batalha da Papinha",texto:"Qual fruta Vicente mais gostava?",alternativas:["Banana","Maçã","Mamão"],correta:0},
{titulo:"👣 Primeiros Passos",texto:"Antes de andar Vicente:",alternativas:["Engatinhou","Pulou","Correu"],correta:0},
{titulo:"😴 Sono do Rei",texto:"Quem faz dormir mais rápido?",alternativas:["Mamãe","Papai","Carro"],correta:2},
{titulo:"📸 Primeira Jornada",texto:"Primeiro passeio especial foi:",alternativas:["Parque","Praia","Igreja"],correta:0},
{titulo:"🍼 Reino do Leite",texto:"Objeto favorito era:",alternativas:["Mamadeira","Controle","Panela"],correta:1},
{titulo:"😂 Risada Hobbit",texto:"Quem mais faz rir?",alternativas:["Mamãe","Papai","Ambos"],correta:2},
{titulo:"🌙 Madrugada Sombria",texto:"Acordava mais:",alternativas:["1 vez","2 vezes","Várias"],correta:2},
{titulo:"🎁 Primeiro Presente",texto:"O que mais gostou?",alternativas:["Caixa","Brinquedo","Laço"],correta:0},
{titulo:"🍃 Explorador",texto:"Gostava de mexer em:",alternativas:["Tomada","Porta","Tudo"],correta:2},
{titulo:"🧸 Companhia",texto:"Brinquedo preferido:",alternativas:["Bola","Carrinho","Aleatório"],correta:2},
{titulo:"👑 Final",texto:"Vicente completa:",alternativas:["1 ano","2 anos","3 anos"],correta:0}
];

function salvar(){
localStorage.setItem("vicenteFesta",JSON.stringify(estado));
localStorage.setItem("pontosQuiz",JSON.stringify(pontosQuiz));
}

function mostrar(id){
document.querySelectorAll(".screen").forEach(x=>x.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");

if(id==="tela3") setTimeout(renderNomes,50);
if(id==="telao") setTimeout(renderTelao,50);
if(id==="quiz") setTimeout(carregarPergunta,50);
if(id==="ranking") setTimeout(atualizarRanking,50);
}

function escolherGrupo(g){
grupoAtual=g;
document.getElementById("grupoEscolhidoTitulo").innerText=g;
mostrar("tela3");
}

function renderNomes(){
const area=document.getElementById("listaNomes");
area.innerHTML="";

estado.disponiveis.forEach(nome=>{
let b=document.createElement("button");
b.className="nameBtn";
b.innerText=nome;
b.onclick=()=>confirmar(nome);
area.appendChild(b);
});
}

function confirmar(nome){
estado.grupos[grupoAtual].push(nome);
estado.disponiveis=estado.disponiveis.filter(n=>n!==nome);
salvar();

document.getElementById("confirmacao").innerText=
nome+" agora pertence aos "+grupoAtual+"!";

mostrar("tela4");
}

function renderTelao(){
renderGrupo("Elfos","listaElfos");
renderGrupo("Hobbits","listaHobbits");
renderGrupo("Anões","listaAnoes");
renderGrupo("Magos","listaMagos");
}

function renderGrupo(g,id){
const ul=document.getElementById(id);
ul.innerHTML="";

estado.grupos[g].forEach(nome=>{
let li=document.createElement("li");
li.innerText="• "+nome;
ul.appendChild(li);
});
}

function irTelao(){mostrar("telao");}

function resetar(){
if(confirm("Deseja apagar tudo?")){
localStorage.clear();
location.reload();
}
}

function carregarPergunta(){

if(perguntaAtual>=perguntas.length){
mostrar("ranking");
return;
}

let p=perguntas[perguntaAtual];

document.getElementById("perguntaTitulo").innerText=p.titulo;
document.getElementById("perguntaTexto").innerText=p.texto;
document.getElementById("resultadoQuiz").innerText="";
document.getElementById("grupoEscolhidoQuiz").innerText="";

alternativaSelecionada=null;
grupoRespondendo=null;

const area=document.getElementById("alternativas");
area.innerHTML="";

p.alternativas.forEach((txt,i)=>{
let b=document.createElement("button");
b.className="altBtn";
b.innerText=txt;

b.onclick=()=>{
document.querySelectorAll(".altBtn").forEach(x=>x.classList.remove("selecionada"));
b.classList.add("selecionada");
alternativaSelecionada=i;
};

area.appendChild(b);
});
}

function confirmarResposta(){

if(grupoRespondendo===null || alternativaSelecionada===null) return;

let correta=perguntas[perguntaAtual].correta;

if(alternativaSelecionada===correta){
pontosQuiz[grupoRespondendo]++;
salvar();

document.getElementById("resultadoQuiz").innerText=
"✅ Correto! +1 ponto para "+grupoRespondendo;
}else{
document.getElementById("resultadoQuiz").innerText="❌ Errou!";
}
}

function proximaPergunta(){
perguntaAtual++;
carregarPergunta();
}

function atualizarRanking(){
document.getElementById("ptsElfos").innerText=pontosQuiz["Elfos"]+" pontos";
document.getElementById("ptsHobbits").innerText=pontosQuiz["Hobbits"]+" pontos";
document.getElementById("ptsAnoes").innerText=pontosQuiz["Anões"]+" pontos";
document.getElementById("ptsMagos").innerText=pontosQuiz["Magos"]+" pontos";
}

document.addEventListener("DOMContentLoaded",()=>{

mostrar("tela1");

document.getElementById("btnIniciar").onclick=()=>mostrar("tela2");

document.querySelectorAll(".card").forEach(card=>{
if(card.dataset.grupo){
card.onclick=()=>escolherGrupo(card.dataset.grupo);
}
});

document.querySelectorAll(".responder").forEach(card=>{
card.onclick=()=>{
grupoRespondendo=card.dataset.grupo;
document.getElementById("grupoEscolhidoQuiz").innerText=
grupoRespondendo+" irá responder!";
};
});

});
