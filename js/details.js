async function getDetails() {
    try {
        let response = await fetch(urlApi)
        dataDeEventos = await response.json()
        const queryString = location.search
        const params = new URLSearchParams(queryString)
        const id = params.get('id')

        const detailsEvent = dataDeEventos.events.find(eve => eve._id == id)
        const div = document.querySelector('.details')
        div.innerHTML = `<div class="card mb-3" style="max-width: 75vw;">
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${detailsEvent.image}" class="img-fluid rounded-start" alt="${detailsEvent.name}">
                        </div>
                        <div class="col-md-4">
                            <div class="card-body" style="max-width: 75vw;">
                            <h5 class="card-title">${detailsEvent.name}</h5>
                            <p class="card-text">${detailsEvent.description}</p>
                            <p class="card-text"><b>Place of event: </b>${detailsEvent.place}</p>
                            <p class="card-text"><b>Price: $</b>${detailsEvent.price}</p>
                            <div col-6>
                            <div class="col-8"><a href="#" class="btn btn-primary">Buy</a></div>
                            </div>
                            <div col-6>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>`
    } catch (e) {
        console.error(e)
    }
}
//LO DEJO COMENTADO, ME ESTA TIRANDO ERROR EN EL EVENT LISTENER DEL SEARCH EN LA LINEA 113 DE MAIN2

getDetails()
