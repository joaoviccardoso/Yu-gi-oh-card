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

        console.log(categoryFiltrada, levelFiltrada, attributeFiltrada)
        if(categoryFiltrada && attributeFiltrada && levelFiltrada){
            meuSet.add(card)
        } else if(categoryFiltrada && attributeFiltrada){
            meuSet.add(card)
        } else if(categoryFiltrada && levelFiltrada){
            meuSet.add(card)
        } else if(levelFiltrada && attributeFiltrada){
            meuSet.add(card)
        } else if(categoryFiltrada){
            if(categoryPesquisa === "Spell"){
                meuSet.add(card)
            } else if(categoryPesquisa === "Trap"){
                meuSet.add(card)
            }
        }
        //Joao tests all the card in the category tomorrow
    })
     
    console.log(meuSet)
}