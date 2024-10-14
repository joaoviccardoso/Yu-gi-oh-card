const main = document.querySelector(".main-centro");

async function pegarDadosDaApi() {
    const resposta = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician");
    const dadosApi = await resposta.json()
    console.log(dadosApi)
    main.innerHTML = `
    <img src="${dadosApi.data[0].card_images[0].image_url_small}" alt="seila" width="200">
    `
}

pegarDadosDaApi()