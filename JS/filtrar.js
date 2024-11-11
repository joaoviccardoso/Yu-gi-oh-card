const btnFiltrar = document.getElementById("filtrar");
const btnPesquisar = document.getElementById("pesquisarBtn");
const btnFiltrarDef = document.getElementById("filtrarDef");
const btnFiltrarAtk = document.getElementById("filtrarAtk");
const categoryPesquisa = document.querySelector(".category");
const levelPesquisa = document.querySelector(".level");
const attributePesquisa = document.querySelector(".attribute");

btnFiltrarDef.addEventListener("click", filtrarDef);
btnFiltrarAtk.addEventListener("click", filtrarAtk);
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
        alert("No minimo 3 caracteres")
    }
    
    try{
        const dadosDaApi = await api.pegarDadosDaApi()
        console.log(dadosDaApi)
        const pesquisaFiltrada = dadosDaApi.data.filter(card => {
            return card.name.replace(/\s+/g, '').toLowerCase().includes(removeEspaco(campoInput))
        })

        if(pesquisaFiltrada.length === 0){
            alert("nem um card encontrado com esse nome")
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

//filtrar card pela Def
async function filtrarDef(){
    const minDef = document.getElementById("min-def").value;
    const maxDef = document.getElementById("max-def").value;

    try {
        const dadosDaApi = await api.pegarDadosDaApi()

        const cardDef = dadosDaApi.data.filter(card =>{
            console.log(card.def)
            if (card.def >= minDef && card.def <= maxDef){
                return card
            }
        })
        
        console.log(cardDef)
    } catch (error) {
        alert("erro ao Filtrar a def das card", error)
    }
}

//filtrar card pela Atk
async function filtrarAtk(){
    const minAtk = document.getElementById("min-atk").value;
    const maxAtk = document.getElementById("max-atk").value;

    try {
        const dadosDaApi = await api.pegarDadosDaApi()

        const cardAtk = dadosDaApi.data.filter(card =>{
            if(card.atk >= minAtk && card.atk <= maxAtk){
                return card
            }
        })

        console.log(cardAtk)
    } catch (error) {
        alert("erro ao Filtrar a def das card", error)
    }
}

//função remove espaço
function removeEspaco(string){
    return string.replace(/\s+/g, '').toLowerCase();
}
