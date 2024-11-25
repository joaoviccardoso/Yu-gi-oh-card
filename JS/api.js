document.addEventListener("DOMContentLoaded",()=>{
    //criarListaCard()
})

api = {
    async pegarDadosDaApi() {
        try {
            const resposta = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
            const dadosApi = await resposta.json()
            console.log(dadosApi)
            return dadosApi
        } catch (error) {
            alert("erro ao pegar os dados da api")
        }
    },

    async pegarDadosDaApiPorId(id){
        try {
            const resposta = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
            const dadoApiId = await resposta.json()
            console.log(dadoApiId)
            return dadoApiId
        } catch (error) {
            alert("erro ao buscar dados da api pelo id")
        }
    },
}