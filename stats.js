let tableContainer = document.getElementById('tableContainer')
let tableUpcomingContainer = document.getElementById('tablaUpcoming')
let tablePastContainer = document.getElementById('tablaPastEvent')
const dataEvents = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(dataEvents)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let dataActual = datos.currentDate
        let datosResueltos = datos.events

        let asistenciasFiltradas = datosResueltos.filter((objeto) => objeto.assistance)
        let arrayAsistencias = asistenciasFiltradas.map((objeto) => {
            let porAsistencia = (objeto.assistance * 100) / objeto.capacity
            let porcentajeFiltrado = {
                porcentajeAsistencia: porAsistencia,
                nombre: objeto.name,
                capacidad: objeto.capacity
            }
            return porcentajeFiltrado
        })
        arrayAsistencias.sort((a, b) => a.porcentajeAsistencia - b.porcentajeAsistencia);
        let eventoMayorAsistencia = arrayAsistencias[arrayAsistencias.length - 1];
        let eventoMenorAsistencia = arrayAsistencias[0];

        let mayorCapacidad = arrayAsistencias.sort((b, a) => a.capacidad - b.capacidad);
        let capacidadAlta = mayorCapacidad[0]

        tablaAsistencia(eventoMayorAsistencia, eventoMenorAsistencia, capacidadAlta, tableContainer)

        //trabajando en la tabla 2 y 3 apartir de aca 
        const filtroUpcoming = datosResueltos.filter(event => Date.parse(event.date) > Date.parse(dataActual)); 
        const filtroPast =  datosResueltos.filter(event => Date.parse(event.date) < Date.parse(dataActual));
        const arrayCategoriasPast = [...new Set(filtroPast.map(evento => evento.category))]; 
        const arrayCategoriasUpcoming = [...new Set(filtroUpcoming.map(evento => evento.category))];

        function calcularEstadisticasPorCategoria(eventos, categoria) {
            const eventosFiltrados = eventos.filter(evento => evento.category === categoria);
            let ganancias = 0;
            let porcentajeAsistencia = 0;
        
            if (eventosFiltrados.length > 0) {
                ganancias = eventosFiltrados.reduce((acc, evento) => acc + evento.price, 0);
        
                let asistencia = 0;
                for (const evento of eventosFiltrados) {
                    const porcentaje = (evento.assistance * 100 / evento.capacity).toFixed(2);
                    if (porcentaje > asistencia) {
                        asistencia = porcentaje;
                        porcentajeAsistencia = `${porcentaje}%`;
                    }
                }
                const estadisticasCategoria = {
                    nombre: categoria,
                    ganancias: ganancias,
                    porcentajeAsistencia: porcentajeAsistencia,
                };
                return estadisticasCategoria;
            }
        }
        function tabla2(categorias, contenedor) {
            const tabla = `
                <table class="table">
                <thead>
                    <th>Past Event Statics</th>
                    <td></td>
                    <td></td>
                </thead>
                <tbody>
                <tr> 
                    <th>Categories</th>
                    <th>Revenues</th> 
                    <th>Percentage of assistance</th>
                </tr>
                    ${categorias.map(categoria => {
                    const estadisticas = calcularEstadisticasPorCategoria(filtroPast, categoria);
                    return `
                        <tr>
                            <td>${estadisticas.nombre}</td>
                            <td>$${estadisticas.ganancias.toFixed(2)}</td>
                            <td>${estadisticas.porcentajeAsistencia}</td>
                        </tr>
                    `;
                    }).join('')}
                </tbody>
                </table>
            `;
            contenedor.innerHTML = tabla;
        }
        tabla2(arrayCategoriasPast, tablePastContainer);

        function tabla3(categorias, contenedor) {
            const tabla = `
                <table class="table">
                <thead>
                    <th>Upcoming Event Statics</th>
                    <td></td>
                    <td></td>
                </thead>
                <tbody>
                <tr> 
                    <th>Categories</th>
                    <th>Revenues(Estimated)</th> 
                    <th>Percentage of assistance(Estimated)</th>
                </tr>
                    ${categorias.map(categoria => {
                    const estadisticas = calcularEstadisticasPorCategoria(filtroPast, categoria);
                    return `
                        <tr>
                            <td>${estadisticas.nombre}</td>
                            <td>$${estadisticas.ganancias.toFixed(2)}</td>
                            <td>${estadisticas.porcentajeAsistencia}</td>
                        </tr>
                    `;
                    }).join('')}
                </tbody>
                </table>
            `;
            contenedor.innerHTML = tabla;
        }
        tabla3(arrayCategoriasUpcoming,tableUpcomingContainer)

    })
    .catch(error => console.log(error))
    

        function tablaAsistencia(eventoMayor, eventoMenor, mayorCapacidad, contenedor) {
            tabla = `
                <table class="table">
                <thead>
                    <th>Event Statics</th>
                    <td></td>
                    <td></td>
                </thead>

                <tbody>
                <tr> <!-- FILA -->
                    <th>Event with highest % of assistance</th>
                    <th>Events with lowest % of assistance</th> <!-- CADA COLUMNA -->
                    <th>Events with lager capacity</th>

                </tr>
                <tr>
                    <td>${eventoMayor.nombre} : ${eventoMayor.porcentajeAsistencia.toFixed(2)}%</td>
                    <td>${eventoMenor.nombre} : ${eventoMenor.porcentajeAsistencia.toFixed(2)}%</td>
                    <td>${mayorCapacidad.nombre} : ${mayorCapacidad.capacidad}</td>
                </tr>
                </tbody>
            </table>
            `
            contenedor.innerHTML = tabla
}