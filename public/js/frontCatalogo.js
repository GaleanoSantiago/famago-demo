// ----------------- Navbar -----------------
const navbar = document.querySelector('#menubar');
// ---------- Obteniendo la seccion del catalogo -----------------
const filaCatalogo = document.getElementById("catalogo");
// Creando el documentFragment
let documentFragment = document.createDocumentFragment();
// ------ Mensaje para cuando no hay productos en el catalogo ----
const mensajeError = document.getElementById("mensajeError");

const manejarScroll = () => {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollPosition >= 350) {
    navbar.classList.add('fixed-navbar');
  } else {
    navbar.classList.remove('fixed-navbar');
  }
}

window.addEventListener('scroll', manejarScroll);

manejarScroll();


// Funcion para obtener productos
const obtenerProductos = async () => {
  // Es una petición GET, no necesitamos indicar el método ni el cuerpo
  const respuestaRaw = await fetch("./productos.json");
  const productos = await respuestaRaw.json();
  // console.log(productos);

  // Ordenando el array por producto_id de manera descendente
  productos.sort(function(a, b) {
      return parseInt(b.producto_id) - parseInt(a.producto_id);
  });

//   console.log(productos);

  //LLamando a la funcion para crear los itembox 
  crearItemBoxs(productos);

}

obtenerProductos();

// Funcion para crear los itemBoxes
const crearItemBoxs = (productos)=>{
    // Creando los itembox de los productos dinamicamente
    productos.forEach(prod=>{
      let div = document.createElement("DIV");
      div.classList.add("itemBox");
      div.setAttribute("data-item",`${prod.rela_categoria_id}`);
      div.innerHTML=`
      <div class="image">
                      ${prod.nprecio_descuento>1 ? `
                      <div class="oferta">
                      <span>Oferta Especial</span>
                      </div>` : ``}
                    
                      <div class="imgs">
                          <img src="./public/img/${prod.cimg_prod}" alt="${prod.cnombre_producto}">
                      </div>
                      <div class="tag-cod">
                        <span>Cod: ${prod.cod_producto}</span>
                      </div>
                      <div class="image-body">
                          <h6>${prod.cnombre_producto}</h6>
                          <div class="btns">
                          
                          <div class="row">
                              <div class="col-12 col-precios-cards">
                              ${prod.nprecio_descuento > 1
                                ? `<span class="precio_tachado">$${prod.nprecio}</span>
                                   <span class="">$${prod.nprecio_descuento}</span> Cuotas Diarias`
                                : `<span class="">$${prod.nprecio}</span> Cuotas Diarias`}
                              </div>
                              <div class="col-12 col-btns-cards">
                              <a href="./verProducto.html?id=${prod.producto_id}" title="Ver Informacion del Producto" class="btn-prod text-center">Ver Producto</a>
                              <a href="https://wa.me/5493704073147?text=Hola,+me+interesa+el+producto:+${prod.cnombre_producto}+-+CODIGO+${prod.cod_producto}" target="_blank" title="Preguntar por WhatsApp" class="btn-oferta btn-wa-oferta"><span class="fa fa-whatsapp text-light"></span>Consultar</a>
                              </div>
                              
                          </div>
                          </div>
                      </div>
                  </div>
      `;
      documentFragment.appendChild(div);
  
    })
    
    filaCatalogo.appendChild(documentFragment);
  
  // Activo el filtro cuando se generen todos los itemboxes
    selectorFiltro();
  }

// Funcion para el filtro de productos
const selectorFiltro = ()=>{
    // -------Seleccionando el menu de categorias y los items--------
  
    const list = document.querySelectorAll(".list");
    const itemBox = document.querySelectorAll(".itemBox");
    let countItems = 0;

    // -------Para activar el efecto--------
  
    list.forEach(li=>{
        li.addEventListener("click",()=>{
            countItems=0;

            if (mensajeError.classList.contains('active')) {
                mensajeError.classList.replace('active', 'hide'); // reemplaza la clase "active" por "hide"
            }

            list.forEach(lis=>{
                lis.classList.remove("active");
            })
  
            li.classList.add("active");
  
            let dataFilter = li.getAttribute("data-filter");
  
            itemBox.forEach(item=>{
                item.classList.remove("active");
                item.classList.add("hide");
                // console.log(item);
  
                if(item.getAttribute("data-item") == dataFilter || dataFilter == "all"){
                    item.classList.remove("hide");
                    item.classList.add("active");
                }

                if(item.classList[1]=="hide"){
                    countItems++;
                    if(countItems===itemBox.length){
                        mensajeError.classList.remove("hide");
                        mensajeError.classList.add("active");
                    }
                    
                };
            })            
        })
    })
    
  }
  


