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

function criarEditorDeck(){
    const divEditorDeck  = document.createElement("div");
    divEditorDeck.classList.add("containerEditorDeck");

    asideEsquerda.innerHTML = "";

    meuDeck.forEach(card =>{
        const cardParaEditar = criarCardDoEditor(card);
        divEditorDeck.appendChild(cardParaEditar);
    })

    asideEsquerda.appendChild(divEditorDeck)   
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

function criarCardDoEditor(card){
    //cria o div do container da card
    const divContainerCard = document.createElement("div");
    divContainerCard.classList.add("containerCard")

    //cria a img da card 
    const img = document.createElement("img");
    img.classList.add("imgEditar");
    img.alt = "imagem da card do editor de deck"
    img.src = `${card.data[0].card_images[0].image_url}`

    //container com informação das card
    const divInfoCard = document.createElement("div");
    divInfoCard.classList.add("containerCardInfo");

    //criar um container para colocar o atk e a def
    const divContainerAtkDef = document.createElement("div");
    divContainerAtkDef.classList.add("containerCardAtkDef")

    //cria as informação da card
    const nomeDaCard = document.createElement("h3");
    nomeDaCard.classList.add("nomeCardEditar");

    const atkCard = document.createElement("p")
    atkCard.classList.add("cardATK");
    atkCard.textContent = `${card.data[0].atk}`

    const defCard = document.createElement("p")
    defCard.classList.add("cardDEF")
    defCard.textContent = `${card.data[0].def}`

    //cria o botao de excluir a card
    const btnExcluirCard = document.createElement("button");
    btnExcluirCard.classList.add("btnExcluir");

    //adiciona os elmentos na div de informação
    divContainerAtkDef.appendChild(atkCard);
    divContainerAtkDef.appendChild(defCard);
    divInfoCard.appendChild(nomeDaCard)
    divInfoCard.appendChild(divContainerAtkDef)
    
    divContainerCard.appendChild(img)
    divContainerCard.appendChild(divInfoCard)
    divContainerCard.appendChild(btnExcluirCard)
    return divContainerCard
}