const main = document.querySelector(".main-centro");
const asideEsquerda = document.querySelector(".container-aside-esquerdo")

async function pegarDadosDaApi() {
    const resposta = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician");
    const dadosApi = await resposta.json()
    console.log(dadosApi)
    main.innerHTML = `
        <img src="${dadosApi.data[0].card_images[0].image_url_small}" alt="seila" width="200">
    `
    asideEsquerda.innerHTML = `
        <div class="container-info-esquerda">
           <div class="container-info-img">
               <img src="${dadosApi.data[0].card_images[0].image_url_small}" alt="card" class="img-info">
           </div>
           <div class="container-informação-carta">
               <ul class="ul-informacao-item">
                  <li>
                    <div class="container_infomacao">
                        <img src="#" alt="" class="img-estrela-nivel">
                        <p class="nivel-da-card">${dadosApi.data[0].level}</p>
                    </div>
                  </li> 
                  <li>  
                    <div class="container_infomacao">
                        <img src="#" alt="" class="img-atk">
                        <p class="atk-da-card">${dadosApi.data[0].atk}</p>
                    </div>
                  </li>  
                  <li>
                    <div class="container_infomacao">
                        <img src="#" alt="" class="img-defesa">
                        <p class="defesa-da-card">${dadosApi.data[0].def}</p>
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

pegarDadosDaApi()