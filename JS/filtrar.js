const btnFiltrar = document.getElementById("filtrar");

btnFiltrar.onclick = () =>{
    const CardCategory = document.querySelector(".category").value;
    const level = document.querySelector(".level").value;
    const attribute = document.querySelector(".attribute").value;
    const type = document.querySelector(".type").value;

    console.log(CardCategory, level, attribute, type)
}