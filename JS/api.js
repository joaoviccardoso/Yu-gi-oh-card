document.addEventListener("DOMContentLoaded",()=>{
    api.pegarDadosDaApi()
})

const cardsApi = 13000

api = {
    async pegarDadosDaApi() {
        try {
            const resposta = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
            const dadosApi = await resposta.json()
            criarListaCard(dadosApi)
            console.log(dadosApi.data[2])
        } catch (error) {
            alert("erro ao pegar os dados da api")
        }
    },

    async pegarDadosDaApiPorId(id){
        try {
            const resposta = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
            const dadoApiId = await resposta.json()
            return dadoApiId
        } catch (error) {
            alert("erro ao buscar dados da api pelo id")
        }
    }
}

