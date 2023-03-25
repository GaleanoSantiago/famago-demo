// ----------------- Navbar -----------------
const navbar = document.querySelector('#menubar');
// ------ Obtiene variable get de la URL ----
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idGet = urlParams.get('id');
// ------------- Creando el documentFragment -------------
let documentFragment = document.createDocumentFragment();
// --------- Seccion donde se mostrara el producto -------
const showProduct = document.getElementById("contenedor-producto");



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
const obtenerProductos = async (idGet) => {
  // Es una petición GET, no necesitamos indicar el método ni el cuerpo
  const respuestaRaw = await fetch("./productos.json");
  const productos = await respuestaRaw.json();

  const producto = productos.find((producto) => producto.producto_id === idGet);

  //LLamando a la funcion para crear el Show Product 
  crearShowProd(producto);
}

obtenerProductos(idGet);


// Funcion para crear el globo de oferta
const crearShowProd = (producto)=>{
    let div = document.createElement("DIV");
    div.classList.add("row");
    
    div.innerHTML=`
    <div class="col-12 col-lg-6 colo-md-6 col-sm-12">
        <div class="col-12 col-lg-12 colo-md-12 col-sm-12">
            <div class="contenedor-img-prod">
                <img src="./public/img/${producto.cimg_prod}" alt="">
            </div>
        </div>
        <div class="col-12 col-lg-12 colo-md-12 col-sm-12 border-top cont-carac-gener">
        <h5>Caracteristicas Generales</h5>
            <div class="caract-gener">
                <div class="scrolleable">
                    <p>${producto.ccaracter_generales.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "<br>")}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 col-lg-6 colo-md-6 col-sm-12 border-start col-cont-info">
        <div class="desc-prod">
            <h2>${producto.cnombre_producto}</h2>
            <h5 class="text-end fw-light">Carniceria</h5>
            <div class="desc-prod-scrll">
                <div class="scrolleable">
                    <p>${producto.cdescripcion_producto.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "<br>")}</p>
                </div>
            </div>
        </div>
        <div class="footer-prod">
            <span>COD: 235</span><br>
            <p>
            ${producto.nprecio_descuento > 1
            ? ` Precio: <span class="footer-prod-precio">$${producto.nprecio}</span>
                <span class="no-line-thru">$${producto.nprecio_descuento}</span>
                Cuotas Diarias` 
                : 
              ` <span class="no-line-thru">$${producto.nprecio}</span>
                Cuotas Diarias`
            }
            </p>
            <div class="d-flex justify-content-end align-items-center">
                <a href="https://wa.me/5493704073147?text=Hola,+me+interesa+${producto.cnombre_producto}" target="_blank" class="btn-wa"><span class="fa fa-whatsapp"></span>Consultar</a>
                </div>
        </div>
    </div>
            `;
      
    documentFragment.appendChild(div);
    showProduct.appendChild(documentFragment);
    
  }
  
