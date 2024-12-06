const containerDeck = document.querySelector(".container-deck");
const containerExtraDeck = document.querySelector(".container-extradeck");
const btnExcluirDeck = document.querySelector(".btnExluirDeck");
const btnEditarDeck = document.querySelector(".img-editar-deck");

btnExcluirDeck.addEventListener("click", limparLocalStorage);
btnEditarDeck.addEventListener("click", criarEditorDeck);

let idPorCard = 0;

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
    nomeDaCard.textContent = `${card.data[0].name}`

    const atkCard = document.createElement("p")
    atkCard.classList.add("cardATK");
    atkCard.textContent = `${card.data[0].atk}`

    const defCard = document.createElement("p")
    defCard.classList.add("cardDEF")
    defCard.textContent = `${card.data[0].def}`

    const level = document.createElement("p");
    level.classList.add("cardLevel")
    level.textContent = `${card.data[0].level}`

    //cria o botao de excluir a card
    const btnExcluirCard = document.createElement("button");
    btnExcluirCard.classList.add("btnExcluir");
    btnExcluirCard.id = `${idPorCard}`;
    idPorCard++
    btnExcluirCard.addEventListener("click", () => {
        const arrayDeckLocalStorage = JSON.parse(localStorage.getItem("deck"));

        console.log(btnExcluirCard.id)
        console.log(arrayDeckLocalStorage)
        console.log(arrayDeckLocalStorage[btnExcluirCard.id])
        arrayDeckLocalStorage.splice(btnExcluirCard.id, 1);
        
        localStorage.setItem("deck", JSON.stringify(arrayDeckLocalStorage))
        alert("Card removida do deck")
        location.reload();
    })

    //cria a imagem que vai ser colocado no btn excluir
    const imgBtn = document.createElement("img");
    imgBtn.classList.add("imgDoBtnExcluir");
    imgBtn.src = "img/excluir.png"

    //adiciona a imagem no botao
    btnExcluirCard.appendChild(imgBtn)

    //adiciona os elmentos na div de informação
    divContainerAtkDef.appendChild(atkCard);
    divContainerAtkDef.appendChild(defCard);
    divContainerAtkDef.appendChild(level)
    divInfoCard.appendChild(nomeDaCard)
    divInfoCard.appendChild(divContainerAtkDef)
    
    divContainerCard.appendChild(img)
    divContainerCard.appendChild(divInfoCard)
    divContainerCard.appendChild(btnExcluirCard)
    return divContainerCard
}