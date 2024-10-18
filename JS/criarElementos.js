const containerCards = document.querySelector(".container-card");
const asideEsquerda = document.querySelector(".container-aside-esquerdo")

async function criarElementoEsquesta(){
    const resposta = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician");
    const dadosApi = await resposta.json()

    asideEsquerda.innerHTML = `
        <div class="container-info-esquerda">
           <div class="container-info-img">
               <img src="${dadosApi.data[0].card_images[0].image_url_small}" alt="card" class="img-info">
           </div>
           <div class="container-informação-carta">
               <ul class="ul-informacao-item">
                  <li>
                    <div class="container_infomacao">
                        <img src="img/estrela.png" alt="" class="img-estrela-nivel img-icones">
                        <p class="nivel-da-card informacao">${dadosApi.data[0].level}</p>
                    </div>
                  </li> 
                  <li>  
                    <div class="container_infomacao">
                        <img src="img/espadas-cruzadas.png" alt="" class="img-atk img-icones">
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
    `
}

async function criarListaCard(cards){
    let cardHtml = '';
    cards.data.forEach(card => { 
    cardHtml += `
      <div>
         <img src="${card.card_images[0].image_url_small}" alt="card" class="card">
      </div>
    `; 
    });
  containerCards.innerHTML = cardHtml;
}

criarElementoEsquesta()