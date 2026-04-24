const nomesOriginais = ["Abner","Mariana Cristina","Maria José","Flaviane","Lucas Tiago","Sara","Caio Moreira","Margarete","Dannilo","José David","Raquel","Mateus","Rafael Boeira","Flávia","Rafaela","Jéssica Fernanda","Cleverson","Helia","Ozamar","Onri","Priscila","Israel","Evelyn","Gabriel","Patrícia","Max","Lucas Gonçalves","Luana Bueno","Reianchell","Merli","Alexandre","Luiz Carlos","Maricler","Guilherme","Rebeca","Caio Miguel","Paula Caroline","Nikolas","Fernanda Caroline","Jessica Martins","Theodoro","Rosa Aurora","Noemi","Kevin","Luana Borges","Leonardo","Alex","Amanda","Willian Rodrigues","Amabilie","Kesia","Lucas Sant'Anna","Isabella","Maria Helena","Beijamin","Rafael Borges","Caio Borges","Lívia","Alice","William Alencar","Elisabeth","Noah","Cecília","Helena"];

let grupoAtual = "";

let estado = JSON.parse(localStorage.getItem("vicenteFesta")) || {
disponiveis:[...nomesOriginais],
grupos:{Elfos:[],Hobbits:[],"Anões":[],Magos:[]}
};

function salvar(){
localStorage.setItem("vicenteFesta", JSON.stringify(estado));
}

function mostrar(id){
document.querySelectorAll(".screen").forEach(t=>{
t.classList.add("hidden");
});
document.getElementById(id).classList.remove("hidden");

if(id==="tela3") renderNomes();
if(id==="telao") renderTelao();
}

function escolherGrupo(nome){
grupoAtual = nome;
document.getElementById("grupoEscolhidoTitulo").innerText = nome;
mostrar("tela3");
}

function renderNomes(){
const area = document.getElementById("listaNomes");
area.innerHTML = "";

estado.disponiveis.forEach(nome=>{
const b = document.createElement("button");
b.className = "nameBtn";
b.innerText = nome;
b.onclick = ()=>confirmar(nome);
area.appendChild(b);
});
}

function confirmar(nome){
estado.grupos[grupoAtual].push(nome);
estado.disponiveis = estado.disponiveis.filter(n=>n!==nome);
salvar();

document.getElementById("confirmacao").innerText =
nome + " agora pertence aos " + grupoAtual;

mostrar("tela4");
}

function renderTelao(){
renderGrupo("Elfos","listaElfos");
renderGrupo("Hobbits","listaHobbits");
renderGrupo("Anões","listaAnoes");
renderGrupo("Magos","listaMagos");
}

function renderGrupo(grupo,id){
const ul = document.getElementById(id);
ul.innerHTML = "";

estado.grupos[grupo].forEach(nome=>{
const li = document.createElement("li");
li.innerText = "• " + nome;
ul.appendChild(li);
});
}

function irTelao(){
mostrar("telao");
}

function resetar(){
localStorage.removeItem("vicenteFesta");
location.reload();
}

document.addEventListener("DOMContentLoaded", ()=>{

mostrar("tela1");

document.getElementById("btnIniciar").addEventListener("click", ()=>{
mostrar("tela2");
});

document.querySelectorAll(".card").forEach(card=>{
card.addEventListener("click", ()=>{
escolherGrupo(card.dataset.grupo);
});
});

document.querySelectorAll(".voltarTela2").forEach(btn=>{
btn.addEventListener("click", ()=>mostrar("tela2"));
});

document.querySelector(".proximo").addEventListener("click", ()=>{
mostrar("tela2");
});

document.querySelector(".verTelao").addEventListener("click", ()=>{
mostrar("telao");
});

});