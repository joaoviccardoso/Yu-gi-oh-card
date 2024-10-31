const btnFiltrar = document.getElementById("filtrar");

btnFiltrar.onclick = async () =>{
    const CardCategory = document.querySelector(".category").value;
    const level = document.querySelector(".level").value;
    const attribute = document.querySelector(".attribute").value;
    const type = document.querySelector(".type").value;

    const dadosDaApi = await api.pegarDadosDaApi()
    console.log(dadosDaApi)

    const cardFiltradosCategory = await dadosDaApi.data.filter(card =>{
        const matchCategory = CardCategory ? card.type.includes(CardCategory) : true; 
        return matchCategory
    })

    const cardFiltradosLevel = await dadosDaApi.data.filter(card => {
        const matchLevel = level ? card.level == Number(level) : true;
        return matchLevel
    })

    const cardFiltradosAttribute = await dadosDaApi.data.filter(card =>{
        const matchAttribute = attribute ? card.attribute == attribute : true;
        return matchAttribute
    })

    const cardFiltradosType = await dadosDaApi.data.filter(card => {
        const matchType = type ? (card.typeline && Array.isArray(card.typeline) && card.typeline[0].includes(type)) : true;
        return matchType
    })

    console.log(cardFiltradosCategory, cardFiltradosAttribute, cardFiltradosLevel, cardFiltradosType)
}