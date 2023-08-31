let cardsContainer = document.getElementById('cardsContainer')
let upcomingEventesContainer = document.getElementById('upcomingEvents')
let arrayEventos = data.events


const upcomingEvents = []

function filtrado(){
    const currentDate = new Date(data.currentDate) /* Transforma string a fecha */
    for( let iterador of arrayEventos){
        const eventDate = new Date(iterador.date); /* Transforma string a fecha */
        if(eventDate > currentDate){
            upcomingEvents.push(iterador)
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
                <a href="./pages/detail.html" class="btn btn-primary btn-detail">Details</a>
            </div>
        </div>
    </div>`
    } 
    contenedor.innerHTML = iterados
}
generarCards(arrayEventos , cardsContainer)
