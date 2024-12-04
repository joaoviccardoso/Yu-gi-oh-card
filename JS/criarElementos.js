const containerCards = document.querySelector(".container-card");
const asideEsquerda = document.querySelector(".container-aside-esquerdo")

let meuDeck = JSON.parse(localStorage.getItem("deck")) || [];
let meuExtraDeck = JSON.parse(localStorage.getItem("ExtraDeck")) || [];

async function criarElementoEsquesta(dadosApi){
    asideEsquerda.innerHTML = "";

    //Cria o container principal das card
    const divContainerPrincipal = document.createElement("div");
    divContainerPrincipal.classList.add("container-info-esquerda");

    const divContainerInfoImg = document.createElement("div");
    divContainerInfoImg.classList.add("container-info-img");

    //Cria o container do btn fechar janela e o btn add
    const containerBtnFechar = document.createElement("div");
    containerBtnFechar.classList.add("container-btn-fechar");

    const btnFecharJanela = document.createElement("button");
    btnFecharJanela.classList.add("btn-fechar-janela");

    const iconeFecharJanela = document.createElement("img");
    iconeFecharJanela.classList.add("icone-fechar-janela");
    iconeFecharJanela.alt = "fechar janela"
    iconeFecharJanela.src = "img/excluir.png"

    const btnAddCardAoDeck = document.createElement("button");
    btnAddCardAoDeck.classList.add("btn", "btn-primary");
    btnAddCardAoDeck.id = "btnAdd"
    btnAddCardAoDeck.textContent = "Add Card"

    //adiciona o btn fechar e btn add no container
    btnFecharJanela.appendChild(iconeFecharJanela)
    containerBtnFechar.appendChild(btnFecharJanela);
    containerBtnFechar.appendChild(btnAddCardAoDeck);
    divContainerPrincipal.appendChild(containerBtnFechar)

    //adiciona evento de click nos botoes de fechar janela e add card para o deck
    btnFecharJanela.addEventListener("click", () => {
      asideEsquerda.innerHTML = "";

      asideEsquerda.innerHTML = `
        <div class="container-aside-esquerdo-quadradro">
            <img src="./img/yugioh logo.png" alt="logo do yugioh" width="250">
            <p class="texto-asideEsquerto">Yu-Gi-Oh! é um jogo de cartas colecionáveis onde dois jogadores duelam usando monstros, magias e armadilhas para reduzir os pontos de vida do oponente a zero. Cada carta possui efeitos e atributos únicos, permitindo aos jogadores criarem estratégias e construírem decks personalizados para vencerem seus adversários.</p>
            <button type="button" class="btn btn-primary"><a href="#" class="saberMais">Saber mais.</a></button>
        </div>
      `
    })
    
    //adiciona o card ao deck ou extradeck
    btnAddCardAoDeck.addEventListener("click", () => {
      const cardParaAddAoDeck = dadosApi;

      if (!Array.isArray(meuDeck)) meuDeck = [];
      if (!Array.isArray(meuExtraDeck)) meuExtraDeck = [];

      //verifica se tem mais de 3 card repetido no deck 
      const quantidadeCardNoDeck = meuDeck.filter(card => card.data[0].id === dadosApi.data[0].id);
      if(quantidadeCardNoDeck.length === 3){
        alert("Quantidade maxima de copia de card por deck são 3 copias")
        return;
      }

      const quantidadeCardNoExtrDeck = meuExtraDeck.filter(card => card.data[0].id === dadosApi.data[0].id);
      if(quantidadeCardNoExtrDeck.length === 3){
        alert("Quantidade maxima de copia de card por deck são 3 copias")
        return;
      }
      
      const tiposExtraDeck = ["xyz", "synchro", "fusion"]

      try {
        //faz uma verificação de o card perdence ao extra deck
        if(tiposExtraDeck.includes(dadosApi.data[0].frameType)){
          //verifica se passou da quantidade maxima de card no extra deck
          if(meuExtraDeck.length >= 15){
            alert("quantidade maxima de 15 card no ExtraDeck");
            return;
          } 
          //adiciona card ao array extradeck e depois salva no localstorage
          meuExtraDeck.push(cardParaAddAoDeck);
          localStorage.setItem("ExtraDeck", JSON.stringify(meuExtraDeck ));
        } else {
          //verifica se passou da quantidade maxima de card no deck
          if(meuDeck.length >= 60){
            alert("quantidade maxima de 60 card no deck")
            return
          }
          //adiciona card ao array extradeck e depois salva no localstorage
          meuDeck.push(cardParaAddAoDeck);
          localStorage.setItem("deck", JSON.stringify(meuDeck));
        }} catch (error) {
          alert("erro ao adicionar card ao deck", error)
        }
        
        alert("card adicionado no deck")
    })

    //criar o container das fotos da card
    const imgInfo = document.createElement("img");
    imgInfo.classList.add("img-info");
    imgInfo.alt = "card" 
    imgInfo.src = `${dadosApi.data[0].card_images[0].image_url}`

    const divContainerInfoCard = document.createElement("div");
    divContainerInfoCard.classList.add("container-informação-carta");

    //Cria o container Ul q vai ser colocado nivel, ATK e DEF
    const ulInfo = document.createElement("ul");
    ulInfo.classList.add("ul-informacao-item");

    if(dadosApi.data[0].atk){

    //Cria o container Li das estrelas
    const liNivel = document.createElement("li");

    const divInfo = document.createElement("div");
    divInfo.classList.add("container_infomacao");

    const imgNivel = document.createElement("img");
    imgNivel.classList.add("img-estrela-nivel","img-icones");
    imgNivel.src = "img/estrela.png";
    imgNivel.alt = "nivel";

    const pDescricaoNivel = document.createElement("p");
    pDescricaoNivel.classList.add("nivel-da-card", "informacao");
    pDescricaoNivel.textContent = `${dadosApi.data[0].level}`

    liNivel.appendChild(divInfo)
    divInfo.appendChild(imgNivel)
    divInfo.appendChild(pDescricaoNivel)

    //Cria o container do atk
    const liAtk = document.createElement("li");
    const divInfo2 = document.createElement("div");
    divInfo2.classList.add("container_infomacao");

    const imgAtk = document.createElement("img");
    imgAtk.classList.add("img-atk", "img-icones");
    imgAtk.src = "img/espadas-cruzadas.png";
    imgAtk.alt = `atk`;

    const pDescricaoAtk = document.createElement("p");
    pDescricaoAtk.classList.add("atk-da-card", "informacao");
    pDescricaoAtk.textContent = `${dadosApi.data[0].atk}`

    liAtk.appendChild(divInfo2)
    divInfo2.appendChild(imgAtk)
    divInfo2.appendChild(pDescricaoAtk)

    //Cria o container da Def
    const liDef = document.createElement("li");
    const divInfo3 = document.createElement("div");
    divInfo3.classList.add("container_infomacao");

    const imgDef = document.createElement("img");
    imgDef.classList.add("img-defesa", "img-icones");
    imgDef.src = "img/escudo.png";
    imgDef.alt = `def`;

    const pDescricaoDef = document.createElement("p");
    pDescricaoDef.classList.add("defesa-da-card", "informacao");
    pDescricaoDef.textContent = `${dadosApi.data[0].def}`

    liDef.appendChild(divInfo3)
    divInfo3.appendChild(imgDef)
    divInfo3.appendChild(pDescricaoDef)

    //Add todas as Li na Ul
    ulInfo.appendChild(liNivel)
    ulInfo.appendChild(liAtk)
    ulInfo.appendChild(liDef)
    } 
  
    const divDescricao = document.createElement("div")
    divDescricao.classList.add("conteiner-descricao-carta");
    
    const pDescricaoDaCard = document.createElement("p");
    pDescricaoDaCard.classList.add("descricao");
    pDescricaoDaCard.textContent = `${dadosApi.data[0].desc}`;

    divDescricao.appendChild(pDescricaoDaCard)

    divContainerInfoImg.appendChild(imgInfo)
    divContainerInfoCard.appendChild(ulInfo)
    divContainerInfoCard.appendChild(divDescricao)
    divContainerPrincipal.appendChild(divContainerInfoImg)
    divContainerPrincipal.appendChild(divContainerInfoCard)
    asideEsquerda.appendChild(divContainerPrincipal)
}

//cria a lista de card do index
async function criarListaCard(){
  const respostaApi = await api.pegarDadosDaApi()
  let cardHtml = '';

  try{
    for (let i = 0; i < 2000; i++) {
      const card = respostaApi.data[i];
      criarElementoCard(card)
    }
  } catch {
    alert("erro ao criar os cards")
  }
}


//cria as card que ser colocado no main
function criarElementoCard(card){
  const div = document.createElement("div");
  div.classList.add("containerCardsMain")

  const img = document.createElement("img");
  img.classList.add("card")
  img.loading = "lazy"
  img.src = `${card.card_images[0].image_url}`
  img.alt = "card"
  img.id = `${card.id}`
  img.onclick = function() {
    pegarElementoClicado(this.id)
  }

  div.appendChild(img)
  containerCards.appendChild(div)
}

async function pegarElementoClicado(id){
  const elemento = document.getElementById(id)
  const dadoDaCardClicada = await api.pegarDadosDaApiPorId(id)
  criarElementoEsquesta(dadoDaCardClicada)
}

//Criar card do filtro de atk e def
async function criarCardFiltroAtkDef(card){
  containerCards.innerHTML = ""
            
  if(card.length === 0){
    containerCards.innerHTML = "<p>Nenhuma carta encontrada para os valores de DEF fornecidos.</p>";
  } else{
    card.forEach(card => criarElementoCard(card))
  }
   
  const minDef = document.getElementById("min-def");
  const maxDef = document.getElementById("max-def");
  const minAtk = document.getElementById("min-atk");
  const maxAtk = document.getElementById("max-atk");
  minDef.value = "";
  maxDef.value = "";
  minAtk.value = "";
  maxAtk.value = "";
}