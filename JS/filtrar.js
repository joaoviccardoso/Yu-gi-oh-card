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
    const minDef = document.getElementById("min-def");
    const maxDef =  document.getElementById("max-def");

    console.log(minDef)

    if(minDef == "" || maxDef == ""){
        alert("Coloque valor nos dois campo para filtrar")
        return 
    }

    try {
        const dadosDaApi = await api.pegarDadosDaApi()

        const cardDef = dadosDaApi.data.filter(card =>{
            console.log(card.def)
            if (card.def >= Number(minDef.value) && card.def <= Number(maxDef.value)){
                return card
            }
        })

        containerCards.innerHTML = ""
        
        if(cardDef.length === 0){
            containerCards.innerHTML = "<p>Nenhuma carta encontrada para os valores de DEF fornecidos.</p>";
        } else{
            cardDef.forEach(card => criarElementoCard(card))
        }

        minDef.value = "";
        maxDef.value = "";
    } catch (error) {
        alert("erro ao Filtrar a def das card", error)
    }
}

//filtrar card pela Atk
async function filtrarAtk(){
    const minAtk = document.getElementById("min-atk");
    const maxAtk = document.getElementById("max-atk");

    if(minAtk === "" || maxAtk === ""){
        alert("coloque um valor para filtrar o atk")
        return
    }

    try {
        const dadosDaApi = await api.pegarDadosDaApi()

        const cardAtk = dadosDaApi.data.filter(card =>{
            if(card.atk >= Number(minAtk.value) && card.atk <= Number(maxAtk.value)){
                return card
            }
        })

        containerCards.innerHTML = ""

        if(cardAtk.length === 0){
            containerCards.innerHTML = "<p>Nenhuma carta encontrada para os valores de ATK fornecidos.</p>";
        } else{
            cardAtk.forEach(card => criarElementoCard(card))
        }
        
        minAtk.value = "";
        maxAtk.value = "";
    } catch (error) {
        alert("erro ao Filtrar a def das card", error)
    }
}

//função remove espaço
function removeEspaco(string){
    return string.replace(/\s+/g, '').toLowerCase();
}
