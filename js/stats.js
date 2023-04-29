urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';
let dataStats = [];
let pastEvents = [];
let mostAttendances = {};
let lessAttendances = [];
eventosPorCategorias = [];
let arrayGenerico = [];
let propiedad = {};
let tablaPorCategoria = "";
let tablaPorCategoria1 = "";

let mayorasistencia = [];
let mayorAsistenciaFuture = []

let porcentajeAsist = [];
let renueve = []
let renueve1 = []
let futureEvents = [] //mis eventons en el futuro 

async function getstats() {
    try {
        let response = await fetch(urlApi);
        dataStats = await response.json();
        console.log(dataStats);
        eventosPorCategorias = extraerCategorias()
        
        
        cargarStats();

        console.log(eventosPorCategorias)
        let categoriasFuturas = filterEventCards(dataStats)
        console.log(categoriasFuturas)
        

        eventoMasGrandePorCategoriasFuturo(futureEvents)

        console.log(eventoMasGrandePorCategoriasFuturo(categoriasFuturas))


    } catch (e) {
        console.error(e);
    }
}
getstats();

///me devuelve las categorias de mis tarjetitas en la api justo a sus eventos asociados
function extraerCategorias() {
    let categorias = {}
    dataStats.events.forEach(evento => {
        if (!categorias[evento.category]) {
            categorias[evento.category] = []
        }
        categorias[evento.category].push(evento)
    })
    console.log(categorias);
    return categorias
}


function cargarStats(events) {
    let contenedorDeTabla = document.querySelector("#tablita");
    eventoMasGrandePorCategorias(eventosPorCategorias);

    let cuerpoDeTabla = "";
    mostAttendances = mayorPorcentajeAsistencia(dataStats.events);
    lessAttendances = menorPorcentajeAsistencia(dataStats.events);
    
    LargerEvent = largerCapacity();
    cuerpoDeTabla += `<tr>
                    <div class="border">
                        <th>Event statistics</th>
                        <th></th>
                        <th></th>
                    </div>
                    </tr>
                    <tr>
                        <td>Events with the highest percentage of attendance</td>
                        <td>Events with the lowest percentage of attendance</td>
                        <td>Event with larger capacity</td>
                    </tr>
                    <tr>
                        <td><b>${mostAttendances.name}</b><br> Assistance = ${mostAttendances.assistance}<br> ${mostAttendances.description}</td>
                        <td><b>${lessAttendances.name}</b> <br> Assistance = ${lessAttendances.assistance} <br> ${lessAttendances.description}</td>
                        <td><b>${LargerEvent.name}</b> <br> Capacity = ${LargerEvent.capacity} <br> ${LargerEvent.description}</td>
                    </tr>
                    `;


    contenedorDeTabla.innerHTML = `${cuerpoDeTabla}`

}



function mayorPorcentajeAsistencia(arrayGenerico) {
    let mayorPorcentajeEvent = arrayGenerico[0] // Asignar el primer evento como el de mayor porcentaje
    arrayGenerico.forEach(event => {
        const porcentajeAsistencia = (event.assistance / event.capacity) * 100 // Calcular el porcentaje de asistencia de cada evento
        const porcentajeMayor = (mayorPorcentajeEvent.assistance / mayorPorcentajeEvent.capacity) * 100 // Calcular el porcentaje de asistencia del evento con mayor porcentaje hasta ahora
        if (porcentajeAsistencia > porcentajeMayor) {
            mayorPorcentajeEvent = event // Actualizar el evento con mayor porcentaje si encontramos uno con mayor porcentaje
        }
    })
    return mayorPorcentajeEvent // evento con mayor porcentaje de asistencia
}


function calculateAttendancePercentages(events) {
    const result = []
    events.forEach(event => {
        const category = event.category
        const attendancePercentage = ((event.estimate / event.capacity) * 100)
        const eventName = event.name
        const renueveEvent = event.price * event.estimate

        const categoryIndex = result.findIndex(item => item.category === category)
        if (categoryIndex === -1) {
            // Category not found in the result array
            result.push({
                category,
                attendancePercentage,
                renueveEvent,
                events: [{ name: eventName, attendancePercentage, renueveEvent }]
            })
        } else {
            // Category found in the result array
            result[categoryIndex].attendancePercentage += attendancePercentage
            result[categoryIndex].events.push({
                name: eventName,
                attendancePercentage, renueveEvent
            })
        }
    })

    // Divide the total attendance percentage by the number of events in each category
    result.forEach(item => {
        const eventCount = item.events.length
        item.attendancePercentage /= eventCount
        item.name = item.events[0].name // Add the name of the first event to the category object
        delete item.events // Remove the 'events' array from the category object
    })

    return result
}




function menorPorcentajeAsistencia(arrayGenerico) {
    let menorPorcentajeEvent = arrayGenerico[0] // Asignar el primer evento como el de mayor porcentaje
    arrayGenerico.forEach(event => {
        const porcentajeAsistencia = (event.assistance / event.capacity) * 100 // Calcular el porcentaje de asistencia de cada evento
        const porcentajeMenor =
            (menorPorcentajeEvent.assistance / menorPorcentajeEvent.capacity) * 100 // Calcular el porcentaje de asistencia del evento con mayor porcentaje hasta ahora
        if (porcentajeAsistencia < porcentajeMenor) {
            menorPorcentajeEvent = event // Actualizar el evento con mayor porcentaje si encontramos uno con mayor porcentaje
        }
    })
    console.log(menorPorcentajeEvent)
    return menorPorcentajeEvent // evento con mayor porcentaje de asistencia
}

function filterEventCards (dataStats) {
  //La función de retorno que se pasa a filter compara la fecha de cada evento con la fecha actual y retorna true si el evento ocurre en el futuro y false si no.
  const currentDate = new Date()
  let futureEvents = dataStats.events.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getTime() > currentDate.getTime()
  })
  console.log(futureEvents)
  return futureEvents // futureEvents que es un arreglo filtrado de los eventos que ocurren después de la fecha actual
}

function largerCapacity() {
    const currentDate = new Date()
    let eventoMasGrandote = null

    dataStats.events.forEach(capacidadActual => {
        if (
            capacidadActual.capacity >
            (eventoMasGrandote ? eventoMasGrandote.capacity : 0) &&
            new Date(capacidadActual.date) < currentDate
        ) {
            eventoMasGrandote = capacidadActual
        }
    })
    console.log(eventoMasGrandote)
    return eventoMasGrandote
}

function eventoMasGrandePorCategorias(eventosPorCategorias) {
    let contenedorDeTabla2 = document.querySelector('.pastEvents')
    let mayorasistencia = []
    let porcentajeAsist = []
    let renueve = []
    let tablaPorCategoria = '' // Declarar la variable tablaPorCategoria al inicio de la función
    for (let propiedad in eventosPorCategorias) {
        if (Array.isArray(eventosPorCategorias[propiedad])) {
            mayorasistencia = mayorPorcentajeAsistencia(
                eventosPorCategorias[propiedad]
            )
            porcentajeAsist = Math.floor(
                (mayorasistencia.assistance / mayorasistencia.capacity) * 100
            )
            renueve = mayorasistencia.price * mayorasistencia.assistance
        }
        tablaPorCategoria += `<tr>
            <td><b>${propiedad}</b><br>${mayorasistencia.name}</td>
            <td>${renueve} USD</td>
            <td>% ${porcentajeAsist}</td>
        </tr>`
        contenedorDeTabla2.innerHTML = `${tablaPorCategoria}`
    }
    return tablaPorCategoria // Devolver la variable tablaPorCategoria al final de la función
}

function eventoMasGrandePorCategoriasFuturo(categoriasFuturas) {
    let contenedorDeTabla3 = document.querySelector('.futureEvents')
    let tablaPorCategoria2 = '' // Declarar la variable tablaPorCategoria al inicio de la función
    let mayorAsistenciaEstimada =
        calculateAttendancePercentages(categoriasFuturas)
    console.log(mayorAsistenciaEstimada)
    mayorAsistenciaEstimada.forEach(item => {
        let renueveFuture = item.renueveEvent
        let porcentajeAsistFuture = Math.floor(item.attendancePercentage);
        tablaPorCategoria2 += `<tr>
            <td><b>${item.category}</b><br>${item.name}</td>
            <td>${renueveFuture} USD</td>
            <td>% ${porcentajeAsistFuture}</td>
        </tr>`
    })
    contenedorDeTabla3.innerHTML = `${tablaPorCategoria2}`
    return tablaPorCategoria2 // Devolver la variable tablaPorCategoria al final de la función
}



