const btnFiltrar = document.getElementById("filtrar");

btnFiltrar.onclick = async () =>{
    const CardCategory = document.querySelector(".category").value;
    const level = document.querySelector(".level").value;
    const attribute = document.querySelector(".attribute").value;
    const type = document.querySelector(".type").value;

    const dadosDaApi = await api.pegarDadosDaApi()
    console.log(dadosDaApi)

    const cardFiltrados = await dadosDaApi.data.filter(card =>{
        return card.type.includes(CardCategory)
    })

    console.log(cardFiltrados)
}