//variables para el filtro por fechas.
urlApi = 'https://mindhub-xj03.onrender.com/api/amazing'
//variables globales necesarias
let dataDeEventos = []
let categories = []
let categorias = []
let listOfCategories = []
let cajitas

//Funciones que me construye tarjetitas.
function generateEventsCard(eventosGenericos) {
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

//gatiCard
function gatiCard(eventosGenericos) {
    let containerOfCard = document.querySelector('div.eventcard.row')
    let gatievento = ''
    gatievento += `<div class="card m-2 py-2" style="width: 18rem">
                <div class = "imageContainer">
                <img src="../assets/imagenes/gatiCard.jpg" class="card-img-top imageCard">
                </div>
                <div class="card-body">
                <p style ="text-align:center; "><b>No matches found <br> ✨try again✨</b></p>
                </div>
        </div>`

    containerOfCard.innerHTML = `${gatievento}`
}

function extraerCategorias() {
    let categories = []
    dataDeEventos.forEach(event => {
        if (!categories.includes(event.category)) {
            categories.push(event.category)
        }
    })
    return categories
}

///Evento de busqueda
function detectorInput(dataDeEventos) {
    let searchForm = document.querySelector('form')
    searchForm.addEventListener('submit', event => {
        event.preventDefault()
        console.log('hola')
        filtroCruzado(dataDeEventos)
    })
}

// ---------------------
//funcion las renderiza y las dibuja en el html
function renderizarCheckBoxes(dataDeEventos) {
    //recorro con un forEach mi array
    dataDeEventos.forEach(dat => {
        if (!categories.includes(dat.category)) {
            categories.push(dat.category)
            listOfCategories += `
                <ul>
                    <li>
                        <label for="category">
                        <input type="checkbox" class="category" name="${dat.category}">
                        <span>${dat.category}</span>
                        </label>
                    </li>    
                </ul>`
        }
    })
    let list = document.querySelector('.col-7') //El contenedor donde quiero que aparezcan los checkboxes dinamicos
    console.log(list)
    list.innerHTML = listOfCategories //para que se vean en el html
    cajitas = document.querySelectorAll('.category') //cajitas contine
}

// ------------------------

function checkEvents() {
    let checked = []
    cajitas.forEach(cajitas => {
        if (cajitas.checked) {
            checked.push(cajitas.name)
        }
    })
    return checked
}

function escuchadorDeCajitas(dataDeEventos) {
    //escuchar el evento de los checkboxes
    cajitas.forEach(cajita => {
        cajita.addEventListener('change', event => {
            filtroCruzado(dataDeEventos)
        })
    })
}

//Me devuelve un array con los eventos seleccionados o deseleccionados

// let searchResults = [];
let htmlResult = ''

function filtroCruzado(eventosFiltrados) {
    //pasar como parametro el array que sale de filtrar eventos por fecha
    let searchInput = document.querySelector('#resize')
    let searchTerm = searchInput.value.toLowerCase()
    console.log(searchTerm)
    let checkedCheckboxes = checkEvents()
    console.log(checkedCheckboxes)
    let searchResults = []
    let searchResults2 = []
    if (searchTerm.length > 0) {
        searchResults = eventosFiltrados.filter(event => {
            return event.name.toLowerCase().includes(searchTerm)
        })
        console.log('searchResults')

        console.log(searchResults)
    } else {
        searchResults = eventosFiltrados
    }
    if (checkedCheckboxes.length > 0) {
        searchResults2 = searchResults.filter(evento => {
            return checkedCheckboxes.includes(evento.category)
        })
        console.log('searchResults2')

        console.log(searchResults2)
    } else {
        searchResults2 = searchResults
    }
    if (searchResults2.length == 0) {
        gatiCard(searchResults2)
    } else {
        generateEventsCard(searchResults2)
    }
}
