async function getEvents () {
    try {
    let response = await fetch(urlApi)
    dataDeEventos = await response.json()
    console.log(dataDeEventos)
        renderizarCheckBoxes(dataDeEventos.events);
        detectorInput(dataDeEventos.events);
        console.log(cajitas)
        escuchadorDeCajitas(dataDeEventos.events);
        console.log(escuchadorDeCajitas(dataDeEventos.events));
        generateEventsCard(dataDeEventos.events);
    } catch (error) {
    console.log(error)
    }
}

getEvents();


function generateEventsCard (eventosGenericos) {
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







