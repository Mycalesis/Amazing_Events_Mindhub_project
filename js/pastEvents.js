async function getPastEvents() {
    try {
        let response = await fetch(urlApi)
        let dataDeEventos = await response.json()
        console.log(dataDeEventos)
        let arrayPasado = filterEventCards(dataDeEventos.events)
        renderizarCheckBoxes(dataDeEventos.events)
        detectorInput(arrayPasado)
        console.log(arrayPasado)
        escuchadorDeCajitas(arrayPasado)
        console.log(escuchadorDeCajitas(arrayPasado))
        generateEventsCard(arrayPasado)
    } catch (error) {
        console.log(error)
    }
}

function filterEventCards(dataDeEventos) {
    //La función de retorno que se pasa a filter compara la fecha de cada evento con la fecha actual y retorna true si el evento ocurre en el futuro y false si no.
    const currentDate = new Date()
    let pastEvents = dataDeEventos.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getTime() < currentDate.getTime()
    })
    console.log(pastEvents)
    return pastEvents // futureEvents que es un arreglo filtrado de los eventos que ocurren después de la fecha actual
}


getPastEvents()
