import { criarCardDoEditor } from "./adicionaCardNoEditor.js";

export function criarEditorDeck(){
    //cria o container que vai receber as card salvas
    const divEditorDeck  = document.createElement("div");
    divEditorDeck.classList.add("containerEditorDeck");

    //cria o container que vai receber o nome do deck e o botao de fechar
    const divNomeDeck = document.createElement("div");
    divNomeDeck.classList.add("divNomeDeckEditor");

    //cria o nome do deck
    const nomeDeckEditor = document.createElement("h3");
    nomeDeckEditor.classList.add("nomeDeckEditor");
    nomeDeckEditor.textContent = "Meu Deck";

    //cria o botao de fechar o deck
    const btnFecharEditar = document.createElement("button");
    btnFecharEditar.classList.add("btnFecharEditor");

    btnFecharEditar.addEventListener("click", () => {
        asideEsquerda.innerHTML = "";

        asideEsquerda.innerHTML = `
        <div class="container-aside-esquerdo-quadradro">
            <img src="./img/yugioh logo.png" alt="logo do yugioh" width="250">
            <p class="texto-asideEsquerto">Yu-Gi-Oh! é um jogo de cartas colecionáveis onde dois jogadores duelam usando monstros, magias e armadilhas para reduzir os pontos de vida do oponente a zero. Cada carta possui efeitos e atributos únicos, permitindo aos jogadores criarem estratégias e construírem decks personalizados para vencerem seus adversários.</p>
            <button type="button" class="btn btn-primary"><a href="#" class="saberMais">Saber mais.</a></button>
        </div>
      `
    })

    //cria a imagem q vai ser colocado no botao
    const imgBtnFcharEditar = document.createElement("img");
    imgBtnFcharEditar.classList.add("imgBtnFcharEditar");
    imgBtnFcharEditar.src = "img/excluir.png";

    btnFecharEditar.appendChild(imgBtnFcharEditar);
    divNomeDeck.appendChild(nomeDeckEditor);
    divNomeDeck.appendChild(btnFecharEditar);

    asideEsquerda.innerHTML = "";

    meuDeck.forEach(card =>{
        const cardParaEditar = criarCardDoEditor(card);
        divEditorDeck.appendChild(cardParaEditar);
    })

    meuExtraDeck.forEach(card =>{
        const cardParaEditarExtra = criarCardDoEditor(card);
        divEditorDeck.appendChild(cardParaEditarExtra);
    })

    asideEsquerda.appendChild(divNomeDeck)
    asideEsquerda.appendChild(divEditorDeck);
}
