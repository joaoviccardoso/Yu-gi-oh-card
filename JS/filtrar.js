const btnFiltrar = document.getElementById("filtrar");

const meuSet = new Set()

btnFiltrar.onclick = async () =>{
    const categoryPesquisa = document.querySelector(".category").value;
    const levelPesquisa = document.querySelector(".level").value;
    const attributePesquisa = document.querySelector(".attribute").value;

    let meuSetArray = [];

    const dadosDaApi = await api.pegarDadosDaApi()
    console.log(dadosDaApi)

    dadosDaApi.data.forEach(card => {
        const categoryFiltrada = categoryPesquisa ? card.type.includes(categoryPesquisa) : true; 
        const levelFiltrada = levelPesquisa ? card.level == Number(levelPesquisa) : true;
        const attributeFiltrada = attributePesquisa ? card.attribute == attributePesquisa : true;

        if(categoryFiltrada && attributeFiltrada && levelFiltrada){
            meuSet.add(card)
        }
    })
     
    console.log(meuSet)
}

function PassarValorParaSet(cardFiltro){
    cardFiltro.forEach(card => {
        meuSet.add(card)
    });
}