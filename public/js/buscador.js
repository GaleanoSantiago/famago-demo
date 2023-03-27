// ------------- Buscador -------------
const buscador = document.getElementById("buscador");
const tablaProductos = document.getElementById("tablaProductos").getElementsByTagName("tbody")[0];

// Funcion para obtener productos
const getProductos = async () => {
    // Es una petición GET, no necesitamos indicar el método ni el cuerpo
    const respuestaRaw = await fetch("./productos.json");
    const productos = await respuestaRaw.json();
    // console.log(productos);
  
    // Buscador
    let descuento;
    buscador.addEventListener("keyup", () => {
      const valorBusqueda = buscador.value.trim().toLowerCase();
      tablaProductos.innerHTML = "";
      
      if (valorBusqueda !== "") {
        const productosFiltrados = productos.filter(producto => producto.cnombre_producto.toLowerCase().includes(valorBusqueda) || producto.cod_producto.toLowerCase().includes(valorBusqueda));
        productosFiltrados.forEach(producto => {
          const fila = tablaProductos.insertRow();
          fila.insertCell().textContent = producto.cod_producto;
          fila.insertCell().innerHTML = `<a href="./verProducto.html?id=${producto.producto_id}">${producto.cnombre_producto}</a>`;
          fila.insertCell().textContent = `$${producto.nprecio}`;
          if(producto.nprecio_descuento == 0){
            descuento = "Sin Descuento";
          }else{
            descuento = "$"+producto.nprecio_descuento;
          }
          fila.insertCell().textContent = `${descuento}`;
        });
      }
      });
    }  

getProductos();