let cardsContainer = document.getElementById('cardsContainer')
let upcomingEventesContainer = document.getElementById('upcomingEvents')
let checkboxContainer = document.getElementById('checkboxContainer')
const searchInput = document.getElementById('searchInput')

const dataEvents = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(dataEvents)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let datosResueltos = datos.events
        generarDetail(datosResueltos, cardsContainer)

        let arrayCategoriasFiltradas = [...new Set(datosResueltos.map(objeto => objeto.category))]
        checkGenerator(arrayCategoriasFiltradas, checkboxContainer)

        /* evento change de checkbox */
        checkboxContainer.addEventListener('change', () => {
            let returnFiltroDoble = filtroDoble(datosResueltos, searchInput)

            generarDetail(returnFiltroDoble, cardsContainer)

            if (returnFiltroDoble == "") {
                generarDetail(datosResueltos, cardsContainer)
            }
        })
        /* evento change de checkbox */

        /* evento keyup de input */
        searchInput.addEventListener('keyup', () => {
            let returnFiltroDoble = filtroDoble(datosResueltos, searchInput)
            if (returnFiltroDoble != 0) {
                generarDetail(returnFiltroDoble, cardsContainer)
            } else {
                return cardsContainer.innerHTML = `<h3 class="noResultados">No hay resultados para tu busqueda ☹</h3>`;
            }
        })
        /* evento keyup de input */

    })
    .catch(error => console.log(error))

function generarDetail(parametro, contenedor) {
    let iterados = ""
    for (let dato of parametro) {
        iterados += `<div class="card" style="width: 18rem;">
        <img src=${dato.image} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${dato.name}</h5>
            <p class="card-text carDescription">${dato.description}</p>
            <p class="card-text price">$${dato.price}</p>
            <div class="btndContainer">
                <a href="./pages/detail.html?id=${dato._id}" class="btn btn-primary btn-detail">Details</a>
            </div>
        </div>
    </div>`
    }
    contenedor.innerHTML = iterados
}

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

function filtrarPorChecks(api) {
    let nodeListChecked = document.querySelectorAll("input[type='checkbox']:checked")
    let inputValues = Array.from(nodeListChecked).map(check => check.value)

    if (inputValues.length > 0) {
        let objetosFiltradosCheck = api.filter(objeto => inputValues.includes(objeto.category))
        return objetosFiltradosCheck
    } else {
        return api
    }
}

function filtrarInput(array, input) {
    let objetosFiltrados = array.filter(objeto => objeto.name.toLowerCase().includes(input.value.toLowerCase()))
    return objetosFiltrados
}

function filtroDoble(array, input) {
    let arrayChecksFiltrados = filtrarPorChecks(array)
    let arrayInputFiltrados = filtrarInput(arrayChecksFiltrados, input)
    return arrayInputFiltrados
}