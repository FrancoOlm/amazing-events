
let detailContainer = document.getElementById('detailContainer')
const objetoURL = new URLSearchParams(location.search)
const valorParametro= objetoURL.get('id')
let arrayEventos = data.events
let idEventos = arrayEventos.find(objeto => objeto._id === valorParametro)

function generarDetail(objeto) {
    let iterados = ""
        return iterados = `
        <div class="boxTextImg">
        <div>
            <img src="${objeto.image}" alt="">
        </div>
        <div class="textDetailContainer">
            <h3>${objeto.name}</h3>
            <p>${objeto.date}</p>
            <p>${objeto.description}</p>
            <p>Category: ${objeto.category}</p>
            <p>Capacity: ${objeto.capacity}</p>
            <p>Assistance: ${objeto.assistance}</p>
            <p>Price: ${objeto.price}</p>
        </div>
    </div>`
    
}
function renderCard(contenedor,objeto){
    contenedor.innerHTML = generarDetail(objeto)
}
renderCard(detailContainer, idEventos)
