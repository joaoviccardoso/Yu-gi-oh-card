const btnFiltrar = document.getElementById("filtrar");
const btnPesquisar = document.getElementById("pesquisarBtn");
const btnFiltrarDef = document.getElementById("filtrarDef");
const categoryPesquisa = document.querySelector(".category");
const levelPesquisa = document.querySelector(".level");
const attributePesquisa = document.querySelector(".attribute");

btnFiltrarDef.addEventListener("click", filtrarDef);
btnPesquisar.addEventListener("click", filtrarPesquisa);

//Filtrar por categorias
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
            alert("Nem um card encontrada")
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

//Filtrar por pesquisa
async function filtrarPesquisa(){
    const campoInput = document.getElementById("pesquisar").value;
    console.log(campoInput)
    if(campoInput.length <= 2){
        alert("No minimo 3 caracteres");
        return
    }
    
    try{
        //Pegando os dados da api do yugioh
        const dadosDaApi = await api.pegarDadosDaApi();
        
        const pesquisaFiltrada = dadosDaApi.data.filter(card => {
            return card.name.replace(/\s+/g, '').toLowerCase().includes(removeEspaco(campoInput))
        })

        if(pesquisaFiltrada.length === 0){
            alert("nem um card encontrado com esse nome");
            return
        }

        containerCards.innerHTML = ""

        console.log(pesquisaFiltrada)
        pesquisaFiltrada.forEach(card => {
            criarElementoCard(card)
        })
    } catch{
        alert('erro ao filtrar pesquisa')
    }
}

//filtrar card pela Def e o Atk
async function filtrarDef(){
    //pega os valores do input de def
    const minDef = document.getElementById("min-def").value;
    const maxDef =  document.getElementById("max-def").value;

    //pega os valores do input de atk
    const minAtk = document.getElementById("min-atk").value;
    const maxAtk = document.getElementById("max-atk").value;

    //Verifica se o campo de input possui algum valor para poder filtrar
    if((minAtk == "" || maxAtk == "") && (minDef == "" || maxDef == "")){
        alert("Coloque um valor para filtrar as cards pelo ATK e DEF.")
        return
    }

    if(minAtk && maxAtk && minDef && maxDef){
        try {
            const dadosDaApi = await api.pegarDadosDaApi();
    
            const cardAtkDef = dadosDaApi.data.filter(card =>{
                console.log(card.def)
                if (card.def >= Number(minDef) && card.def <= Number(maxDef) && (card.atk >= Number(minAtk) && card.atk <= Number(maxAtk))){
                    return card
                }
            })
    
            criarCardFiltroAtkDef(cardAtkDef);
        } catch (error) {
            alert("erro ao Filtrar a def e o atk das card", error);
        }
        return
    }

    //verifica se os dois input possui valor
    if(minDef && maxDef){
        try {
            const dadosDaApi = await api.pegarDadosDaApi();
    
            const cardDef = dadosDaApi.data.filter(card =>{
                console.log(card.def)
                if (card.def >= Number(minDef) && card.def <= Number(maxDef)){
                    return card
                }
            })
    
            criarCardFiltroAtkDef(cardDef);
        } catch (error) {
            alert("erro ao Filtrar a def das card", error)
        }
        return
    }

    if(minAtk && maxAtk){
        try {
            const dadosDaApi = await api.pegarDadosDaApi();
            console.log(dadosDaApi)
    
            const cardAtk = dadosDaApi.data.filter(card =>{
                if(card.atk >= Number(minAtk) && card.atk <= Number(maxAtk)){
                    return card
                }
            })
    
            criarCardFiltroAtkDef(cardAtk);
        } catch (error) {
            alert("erro ao Filtrar a def das card", error);
        }
        return
    }
}

//função remove espaço
function removeEspaco(string){
    return string.replace(/\s+/g, '').toLowerCase();
}
