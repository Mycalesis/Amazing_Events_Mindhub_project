
async function getUpcomingEvents() {
    try {
        let response = await fetch(urlApi)
        let dataDeEventos = await response.json()
        console.log(dataDeEventos)
        let arrayFuturo = filterEventCards(dataDeEventos.events)
        renderizarCheckBoxes(dataDeEventos.events)
        detectorInput(arrayFuturo)
        console.log(arrayFuturo)
        escuchadorDeCajitas(arrayFuturo)
        console.log(escuchadorDeCajitas(arrayFuturo))
        generateFutureEventsCard(arrayFuturo)
    } catch (error) {
        console.log(error)
    }
}

function filterEventCards(dataDeEventos) {
    //La función de retorno que se pasa a filter compara la fecha de cada evento con la fecha actual y retorna true si el evento ocurre en el futuro y false si no.
    const currentDate = new Date()
    let futureEvents = dataDeEventos.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getTime() > currentDate.getTime()
    })
    console.log(futureEvents)
    return futureEvents // futureEvents que es un arreglo filtrado de los eventos que ocurren después de la fecha actual
}

function generateFutureEventsCard(eventosGenericos) {
    let containerOfCard = document.querySelector('div.eventcard.row')
    let htmlEvents = ''
    eventosGenericos.forEach(evento => {
        htmlEvents += `<div class="card m-2 py-2" style="width: 18rem">
                <div class = "imageContainer">
                <img src="${evento.image}" class="card-img-top imageCard">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text">${evento.category}</p>
                    <p class="card-text">${evento.date}</p>
                    <p class="card-text">${evento.description}</p>
                    <div class="row">
                        <div class="col-4"><p class="precio"><b>Price:</b><br>${evento.price}</p></div>
                        <div class="col-8"><a href="details.html?id=${evento._id}" class="btn btn-primary">more info</a></div>    
                    </div>
                </div>
        </div>`
    })
    containerOfCard.innerHTML = `${htmlEvents}`
}

getUpcomingEvents();
