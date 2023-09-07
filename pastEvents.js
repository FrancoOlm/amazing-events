let pastEventsContainer = document.getElementById('pastEvents')
let checkboxContainer = document.getElementById('checkboxContainerP')
let searchInput = document.getElementById('searchInputP')
let arrayEventos = data.events

const pastEvents = []

function filtrado(){
    const currentDate = new Date(data.currentDate) /* Transforma string a fecha */
    for( let iterador of arrayEventos){
        const eventDate = new Date(iterador.date); /* Transforma string a fecha */
        if(eventDate < currentDate){
            pastEvents.push(iterador)
        }
    }
}
filtrado()

function generarCards(parametro, contenedor){
    let iterados = ""
    for(let dato of parametro){
        iterados += `<div class="card" style="width: 18rem;">
        <img src=${dato.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${dato.name}</h5>
            <p class="card-text carDescription">${dato.description}</p>
            <p class="card-text">$${dato.price}</p>
            <div class="btndContainer">
                <a href="../pages/detail.html?id=${dato._id}" class="btn btn-primary btn-detail">Details</a>
            </div>
        </div>
    </div>`
    } 
    contenedor.innerHTML = iterados
}
generarCards(pastEvents , pastEventsContainer)

let arrayCategoriasFiltradas = [...new Set(pastEvents.map(objeto => objeto.category))]
function checkBox(caregoria) {
    let checks = ""
    checks = `
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" name="" value="${caregoria}">
        <label class="form-check-label" for="inlineCheckbox1">${caregoria}</label>
        </div>`
    return checks
}

function checkGenerator(array, contenedor) {
    let imprimirCheck = ""
    array.forEach(caregoria => {
        imprimirCheck += checkBox(caregoria)
    });
    contenedor.innerHTML = imprimirCheck
}
checkGenerator(arrayCategoriasFiltradas, checkboxContainer)

function filtrarPorChecks() {
    let nodeListChecked = document.querySelectorAll("input[type='checkbox']:checked")
    let inputValues = Array.from(nodeListChecked).map(check => check.value)

    if (inputValues.length > 0) {
        let objetosFiltradosCheck = pastEvents.filter(objeto => inputValues.includes(objeto.category))
        return objetosFiltradosCheck
    } else {
        return pastEvents
    }
}

/* evento change de checkbox */
checkboxContainer.addEventListener('change', () => {
    let returnFiltroDoble = filtroDoble(pastEvents, searchInput)
    generarCards(returnFiltroDoble, pastEventsContainer)

    if (returnFiltroDoble == "") {
        generarCards(pastEvents, pastEventsContainer)
    }
})
/* evento change de checkbox */

function filtrarInput(array, input) {
    let objetosFiltrados = array.filter(objeto => objeto.name.toLowerCase().includes(input.value.toLowerCase()))
    return objetosFiltrados
}
/* evento keyup de input */
searchInput.addEventListener('keyup', (e) => {
    let returnFiltroDoble = filtroDoble(pastEvents, searchInput)
    if (returnFiltroDoble !=0) {
        generarCards(returnFiltroDoble, pastEventsContainer)
    }else{
        return pastEventsContainer.innerHTML = `<h3 class="noResultados">No hay resultados para tu busqueda ☹</h3>`;
    }
})
/* evento keyup de input */

function filtroDoble(array, input) {
    let arrayChecksFiltrados = filtrarPorChecks(array)
    let arrayInputFiltrados = filtrarInput(arrayChecksFiltrados, input)
    return arrayInputFiltrados
}