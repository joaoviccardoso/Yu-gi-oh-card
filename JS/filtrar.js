const btnFiltrar = document.getElementById("filtrar");

const meuSet = new Set()

btnFiltrar.onclick = async () =>{
    const CardCategory = document.querySelector(".category").value;
    const level = document.querySelector(".level").value;
    const attribute = document.querySelector(".attribute").value;

    let meuSetArray = [];

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

    if (cardFiltradosCategory.length !== 0 && cardFiltradosAttribute.length !== 0 && cardFiltradosLevel.length !== 0) {
        PassarValorParaSet(cardFiltradosCategory)
        PassarValorParaSet(cardFiltradosAttribute)
        PassarValorParaSet(cardFiltradosLevel)

        meuSetArray = Array.from(meuSet)
        
        const todosOsCardFiltrados = meuSetArray.filter(card =>{
            const cardCategory = CardCategory ? card.type.includes(CardCategory) : true; 
            const cardAttribute = attribute ? card.attribute == attribute : true;
            const cardLevel = level ? card.level == Number(level) : true;

            return cardAttribute && cardCategory && cardLevel
        })
        
        console.log(todosOsCardFiltrados)
    } else {
        alert("se NAO TIVER item e pra cair aqui")
    }
}

function PassarValorParaSet(cardFiltro){
    cardFiltro.forEach(card => {
        meuSet.add(card)
    });
}