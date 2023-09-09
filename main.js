let cardsContainer = document.getElementById('cardsContainer')
let upcomingEventesContainer = document.getElementById('upcomingEvents')
let checkboxContainer = document.getElementById('checkboxContainer')
const submitBtn = document.getElementById('submit')
const searchInput = document.getElementById('searchInput')
let arrayEventos = data.events
const dataEvents =  "https://mindhub-xj03.onrender.com/api/amazing"

/*     async function accederApi(){
    try{
        const respuesta = await fetch(dataEvents)
        const datos = await respuesta.json()
        const eventos= datos.events
        console.log(eventos)
        return eventos;
    }
    catch(error){
        console.log(error)
    }

}
console.log(accederApi()) */
function accederDatos(){
    fetch(dataEvents)
    .then(respuesta => respuesta.json())
    .then( datos => {
        let datosResueltos = datos.events
        generarDetail(datosResueltos, cardsContainer)
    })
    .catch(error => console.log(error))
    
}
accederDatos()

    function generarDetail(parametro, contenedor) {
    let iterados = ""
    for (let dato of parametro) {
        iterados += `<div class="card" style="width: 18rem;">
        <img src=${dato.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${dato.name}</h5>
            <p class="card-text carDescription">${dato.description}</p>
            <p class="card-text">$${dato.price}</p>
            <div class="btndContainer">
                <a href="./pages/detail.html?id=${dato._id}" class="btn btn-primary btn-detail">Details</a>
            </div>
        </div>
    </div>`
    }
    contenedor.innerHTML = iterados
}


let arrayCategoriasFiltradas = [...new Set(arrayEventos.map(objeto => objeto.category))]

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
        let objetosFiltradosCheck = arrayEventos.filter(objeto => inputValues.includes(objeto.category))
        return objetosFiltradosCheck
    } else {
        return arrayEventos
    }
}
/* evento change de checkbox */
checkboxContainer.addEventListener('change', () => {
    let returnFiltroDoble = filtroDoble(arrayEventos, searchInput)
    generarDetail(returnFiltroDoble, cardsContainer)

    if (returnFiltroDoble == "") {
        generarDetail(arrayEventos, cardsContainer)
    }
})
/* evento change de checkbox */

function filtrarInput(array, input) {
    let objetosFiltrados = array.filter(objeto => objeto.name.toLowerCase().includes(input.value.toLowerCase()))
    return objetosFiltrados
}
/* evento keyup de input */
searchInput.addEventListener('keyup', (e) => {
    let returnFiltroDoble = filtroDoble(arrayEventos, searchInput)
    if (returnFiltroDoble !=0) {
        generarDetail(returnFiltroDoble, cardsContainer)
    }else{
        return cardsContainer.innerHTML = `<h3 class="noResultados">No hay resultados para tu busqueda ☹</h3>`;
    }
})
/* evento keyup de input */

function filtroDoble(array, input) {
    let arrayChecksFiltrados = filtrarPorChecks(array)
    let arrayInputFiltrados = filtrarInput(arrayChecksFiltrados, input)
    return arrayInputFiltrados
}