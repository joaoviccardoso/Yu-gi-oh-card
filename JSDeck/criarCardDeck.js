export function criarCardDoDeck(card, container){
    const div = document.createElement("div");
  
    const img = document.createElement("img");
    img.classList.add("card")
    img.loading = "lazy"
    img.src = `${card.data[0].card_images[0].image_url}`
    img.alt = "card"
    img.id = `${card.data[0].id}`
    img.onclick = function() {
        pegarElementoClicado(this.id)
    }

    div.appendChild(img)
    container.appendChild(div)
}