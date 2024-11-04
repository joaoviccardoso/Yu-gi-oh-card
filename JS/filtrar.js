const btnFiltrar = document.getElementById("filtrar");
const categoryPesquisa = document.querySelector(".category");
const levelPesquisa = document.querySelector(".level");
const attributePesquisa = document.querySelector(".attribute");

btnFiltrar.onclick = async () =>{
    const meuSet = new Set()
    let meuSetArray = [];
    try { 
        const dadosDaApi = await api.pegarDadosDaApi()

        if(categoryPesquisa.value == "Card Category" && levelPesquisa.value == "Level" && attributePesquisa.value == "Attribute"){
            alert("Nem um valor selecionado para filtrar")
            return
        }

        dadosDaApi.data.forEach(card => {
            const categoryFiltrada = categoryPesquisa.value !== "Card Category" ? card.type.includes(categoryPesquisa.value) : true; 
            const levelFiltrada = levelPesquisa.value !== "Level" ? card.level === Number(levelPesquisa.value) : true;
            const attributeFiltrada = attributePesquisa.value !== "Attribute" ? card.attribute === attributePesquisa.value : true;

            if (categoryFiltrada && levelFiltrada && attributeFiltrada) {
                meuSet.add(card);
            }
        });

        meuSetArray = Array.from(meuSet)
        if(meuSetArray == ""){
            alert("Nem uma carda encontrada")
            return
        }
        containerCards.innerHTML = ""

        meuSetArray.forEach(card =>{
            criarElementoCard(card)
        })
    } catch (error) {
        alert("erro ao gerar o filtro")
    }
    categoryPesquisa.value = "Card Category" 
    levelPesquisa.value = "Level"
    attributePesquisa.value = "Attribute"
}

