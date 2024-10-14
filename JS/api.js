async function pegarDadosDaApi() {
    const resposta = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    const dadosApi = await resposta.json()
    console.log(dadosApi)
}

pegarDadosDaApi()