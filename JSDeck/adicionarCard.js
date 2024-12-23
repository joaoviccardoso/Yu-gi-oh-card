import { criarEditorDeck } from "./criarEditorDoDeck.js";
import { criarCardDoDeck } from "./criarCardDeck.js";

const containerDeck = document.querySelector(".container-deck");
const containerExtraDeck = document.querySelector(".container-extradeck");
const btnExcluirDeck = document.querySelector(".btnExluirDeck");
const btnEditarDeck = document.querySelector(".img-editar-deck");

btnExcluirDeck.addEventListener("click", limparLocalStorage);
btnEditarDeck.addEventListener("click", criarEditorDeck);

meuDeck.forEach(card => {
    const divCard = criarCardDoDeck(card, containerDeck)
});

meuExtraDeck.forEach(card => {
    const divCard = criarCardDoDeck(card, containerExtraDeck)
})

function limparLocalStorage(){
    localStorage.clear()
    alert("Deck Excluido")
    location.reload(true)
}

