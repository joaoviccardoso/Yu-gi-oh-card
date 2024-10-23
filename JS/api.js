document.addEventListener("DOMContentLoaded",()=>{
    api.pegarDadosDaApi()
})

const cardsApi = 13000

api = {
    async pegarDadosDaApi() {
        const resposta = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
        const dadosApi = await resposta.json()
        criarListaCard(dadosApi)
    }
}

