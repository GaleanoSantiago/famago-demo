// obteniendo el divfecha-oferta
const fechaOferta = document.getElementById("fecha-oferta");

// Obtener la fecha actual
let fechaActual = new Date();

// Obtener el día del mes actual
let diaActual = fechaActual.getDate();
// let diaActual = 16;

// Obtener el último día del mes actual
let ultimoDiaMesActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();

// Establecer la fecha límite de la promoción
let fechaLimitePromocion = 15;

// Funcion para obtener productos
const getProducts = async () => {
    // Es una petición GET, no necesitamos indicar el método ni el cuerpo
    const respuestaRaw = await fetch("./productos.json");
    const productos = await respuestaRaw.json();
    
    // Obteniendo los productos en oferta
    const productosEnOferta = productos.filter(function(producto) {
        return producto.boferta_especial === '1';
    });
    mostrarMensajePromo(productosEnOferta);
    
}  
getProducts();

const mostrarMensajePromo = (productosEnOferta)=>{

    if(productosEnOferta != 0){
        // Verificar si el día actual está antes o después de la fecha límite de la promoción
        if (diaActual <= fechaLimitePromocion) {
            // Mostrar mensaje de promoción vigente hasta el día límite de la promoción
            fechaOferta.innerHTML=`<h4>¡Promociones Vigentes Hasta el Dia ${fechaLimitePromocion} del Presente Mes!</h4>`;
        }else{
            // Mostrar mensaje de promoción vigente hasta el final del mes
            fechaOferta.innerHTML=`<h4>¡Promociones Vigentes Hasta Fin de Mes!</h4>`;
        }
    }
    
}


