const containerCards = document.querySelector(".container-card");
const asideEsquerda = document.querySelector(".container-aside-esquerdo")

async function criarElementoEsquesta(dadosApi){
    asideEsquerda.innerHTML = "";

    const divContainerPrincipal = document.createElement("div");
    divContainerPrincipal.classList.add("container-info-esquerda");

    const divContainerInfoImg = document.createElement("div");
    divContainerInfoImg.classList.add("container-info-img");

    const imgInfo = document.createElement("img");
    imgInfo.classList.add("img-info");
    imgInfo.alt = "card" 
    imgInfo.src = `${dadosApi.data[0].card_images[0].image_url_small}`

    const divContainerInfoCard = document.createElement("div");
    divContainerInfoCard.classList.add("container-informação-carta");

    const ulInfo = document.createElement("ul");
    ulInfo.classList.add("ul-informacao-item");

    if(dadosApi.data[0].atk){
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

    /*asideEsquerda.innerHTML = `
        <div class="container-info-esquerda">
           <div class="container-info-img">
               <img src="${dadosApi.data[0].card_images[0].image_url_small}" alt="card" class="img-info">
           </div>
           <div class="container-informação-carta">
               <ul class="ul-informacao-item">
                  <li>
                    <div class="container_infomacao">
                        <img src="img/estrela.png" alt="${dadosApi.data[0].name}" class="img-estrela-nivel img-icones">
                        <p class="nivel-da-card informacao">${dadosApi.data[0].level}</p>
                    </div>
                  </li> 
                  <li>  
                    <div class="container_infomacao">
                        <img src="img/espadas-cruzadas.png" alt="atk" class="img-atk img-icones">
                        <p class="atk-da-card informacao">${dadosApi.data[0].atk}</p>
                    </div>
                  </li>  
                  <li>
                    <div class="container_infomacao">
                        <img src="img/escudo.png" alt="" class="img-defesa img-icones">
                        <p class="defesa-da-card informacao">${dadosApi.data[0].def}</p>
                    </div>   
                  </li>
               </ul>
               <div class="conteiner-descricao-carta">
                  <p class="descricao">${dadosApi.data[0].desc}</p>
               </div>
           </div>
       </div>
    `*/
}

async function criarListaCard(cards){
  let cardHtml = '';
  try{
    cards.data.forEach(criarElementoCard);
  } catch {
    alert("erro ao criar os cards")
  }
}

function criarElementoCard(card){
  const div = document.createElement("div");

  const img = document.createElement("img");
  img.classList.add("card")
  img.src = `${card.card_images[0].image_url_small}`
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

