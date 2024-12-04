const containerDeck = document.querySelector(".container-deck");
const containerExtraDeck = document.querySelector(".container-extradeck");
const btnExcluirDeck = document.querySelector(".btnExluirDeck");
const btnEditarDeck = document.querySelector(".img-editar-deck")

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

function criarEditorDeck(){

}

function criarCardDoDeck(card, container){
    const div = document.createElement("div");
  
    const img = document.createElement("img");
    img.classList.add("card")
    img.loading = "lazy"
    img.src = `${card.data[0].card_images[0].image_url}`
    img.alt = "card"
    img.id = `${card.data[0].id}`
    img.onclick = function() {
        pegarElementoClicado(this.id)
    }

    div.appendChild(img)
    container.appendChild(div)
}