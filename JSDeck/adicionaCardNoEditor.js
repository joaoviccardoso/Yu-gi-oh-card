let idPorCard = 0;

export function criarCardDoEditor(card){
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

    const type = document.createElement("p")
    type.classList.add("tybe");
    type.textContent = `${card.data[0].type}`
        
    divContainerAtkDef.appendChild(type)
    
    //cria a div para colocar a disc
    const divDesc = document.createElement("div");
    divDesc.classList.add("containerDesc")

    const descricao = document.createElement("p");
    descricao.classList.add("descricroCard");
    descricao.textContent = `${card.data[0].desc}`

    divDesc.appendChild(descricao)
    //cria o botao de excluir a card
    const btnExcluirCard = document.createElement("button");
    btnExcluirCard.classList.add("btnExcluir");
    btnExcluirCard.id = `${idPorCard}`;
    idPorCard++
    btnExcluirCard.addEventListener("click", () => {
        const arrayDeckLocalStorage = JSON.parse(localStorage.getItem("deck"));

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
    divContainerAtkDef.appendChild(divDesc)
    divInfoCard.appendChild(nomeDaCard)
    divInfoCard.appendChild(divContainerAtkDef)
    
    divContainerCard.appendChild(img)
    divContainerCard.appendChild(divInfoCard)
    divContainerCard.appendChild(btnExcluirCard)
    return divContainerCard
}