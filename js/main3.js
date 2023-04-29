let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing'
//variables globales necesarias
let eventos = [];

async function recibirEventos() {
    try {
        let response = await fetch(urlApi);
        let eventos = await response.json();
        console.log(eventos);
        //---
        renderizarCheckBoxes(eventos.events);

    }catch(error) {
        console.error(error);
    }

}


//Funcion genera tarjetitas

function crearTarjetitas(event) {
    return ;`<div class="card m-2 py-2" style="width: 18rem">
                        <img src = ${event.image} class="card-img-top imageCard" ">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.category}</p>
                            <p class="card-text"> ${eventos.date}</p>
                            <p class="card-text">${event.description}</p>
                            <div class="row">
                                <div class="col-4"><p class="precio"><b>Price:</b><br>${event.price}</p></div>
                                <div class="col-8"><a href="../js/details.html?id=${event._id}" class="btn btn-primary">more info</a></div>    
                            </div>
                        </div>
                    </div>`
}

let htmlEvents = ''
let htmlFuture = ''
let htmlPast = ''
for (let event of data.events) {
    let currentDate = new Date(data.currentDate)
    let eventDate = new Date(event.date)
    if (eventDate < currentDate) {
    htmlPast += crearTarjetitas(event)
    } else {
        htmlFuture += crearTarjetitas(event);
    }
    htmlEvents += crearTarjetitas(event)
}

function renderizarCheckBoxes (eventos) {
  //recorro con un forEach mi array
    eventos.forEach(dat => {
    if (!categories.includes(dat.category)) {
        categories.push(dat.category)
        listOfCategories += `
                <ul>
                    <li>
                        <label for="category">
                        <input type="checkbox" class="category" name="category">
                        <span>${dat.category}</span>
                        </label>
                    </li>    
                </ul>`
    }
    })
  let list = document.querySelector('.col-7') //El contenedor donde quiero que aparezcan los checkboxes dinamicos
  list.innerHTML = listOfCategories //para que se vean en el html
  cajitas = document.querySelectorAll('.category') //cajitas contine
}

// ------------------------

function checkEvents () {
    let checked = []
    cajitas.forEach(cajitas => {
        if (cajitas.checked) {
        checked.push(cajitas.value)
        }
    })
    return checked
}

function escuchadorDeCajitas () {
    //escuchar el evento de los checkboxes
    cajitas.forEach(cajita => {
        cajita.addEventListener('change', () => {
        console.log('Hola cajita')
        filtroCruzado()
        })
    })
}

function searchEvents() {
    const searchInput = document.querySelector('#resize')

    searchInput.addEventListener('input', function (evento) {
        evento.preventDefault()

        const searchTerm = searchInput.value.toLowerCase()
        console.log('Término de búsqueda:', searchTerm)

        const filteredEvents = data.events.filter(function (event) {
            const searchName = event.name.toLowerCase()
            const searchCategory = event.category.toLowerCase()
            const searchDescription = event.description.toLowerCase()

            return (
                searchName.includes(searchTerm) ||
                searchCategory.includes(searchTerm) ||
                searchDescription.includes(searchTerm)
            )
        })

        console.log('resultados: ', filteredEvents)
    })
}
