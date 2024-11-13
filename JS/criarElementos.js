const containerCards = document.querySelector(".container-card");
const asideEsquerda = document.querySelector(".container-aside-esquerdo")

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
    divContainerPrincipal.appendChild(containerBtnFechar)
    divContainerPrincipal.appendChild(divContainerInfoImg)
    divContainerPrincipal.appendChild(divContainerInfoCard)
    asideEsquerda.appendChild(divContainerPrincipal)
}

async function criarListaCard(){
  const respostaApi = await api.pegarDadosDaApi()
  let cardHtml = '';
  try{
    respostaApi.data.forEach(card =>{
      criarElementoCard(card)
    });
  } catch {
    alert("erro ao criar os cards")
  }
}

function criarElementoCard(card){
  const div = document.createElement("div");

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

