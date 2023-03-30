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
// ---------- Obteniendo la seccion del catalogo -----------------
const filaCatalogo = document.getElementById("catalogo");


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

  // Producto por id
  const producto = productos.find((producto) => producto.producto_id === idGet);

  // Productos de la misma categoria
  const productosCategoria = productos.filter(function (prod) {
      return prod.rela_categoria_id === producto.rela_categoria_id;
  });
  productosCategoria.splice(10);
//   console.log(productosCategoria);
  //LLamando a la funcion para crear el Show Product 
  crearShowProd(producto);

  crearItemBoxs(productosCategoria);
}

obtenerProductos(idGet);


// Funcion para crear el globo de oferta
const crearShowProd = (producto)=>{
    const categorias = ["Refrigeración", "Equipamientos para Carniceria", "Organización y Exhibición", "Gastronomia","Equipamientos para Panaderias","Equipamientos para Comercios","Accesorios","Otros"]
    let div = document.createElement("DIV");
    div.classList.add("row");
    if(producto != undefined){
    div.innerHTML=`
    <div class="col-12 col-lg-6 colo-md-6 col-sm-12">
        <div class="col-12 col-lg-12 colo-md-12 col-sm-12">
            <div class="contenedor-img-prod">
                <img src="./public/img/${producto.cimg_prod}" alt="">
            </div>
        </div>
        <!-- <div class="col-12 col-lg-12 colo-md-12 col-sm-12 border-top cont-carac-gener">
        <h5>Caracteristicas Generales</h5>
            <div class="caract-gener">
                <div class="scrolleable">
                    <p>${producto.ccaracter_generales.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "<br>")}
                    </p>
                </div>
            </div>
        </div>-->
    </div>
    <div class="col-12 col-lg-6 colo-md-6 col-sm-12 border-start col-cont-info">
        <div class="desc-prod">
            <h2>${producto.cnombre_producto}</h2>
            <h5 class="text-end fw-light">${categorias[producto.rela_categoria_id-1]}</h5>
            <div class="desc-prod-scrll">
                <div class="scrolleable">
                    <p>${producto.cdescripcion_producto.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "<br>")}</p>
                </div>
            </div>
        </div>
        <div class="footer-prod">
            <span>COD: ${producto.cod_producto}</span><br>
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
                <a href="https://wa.me/5493704073147?text=Hola,+me+interesa+el+producto:+${producto.cnombre_producto}+-+CODIGO+${producto.cod_producto}" target="_blank" class="btn-wa"><span class="fa fa-whatsapp"></span>Consultar</a>
                </div>
        </div>
    </div>
            `;
        }else{
            div.innerHTML=`
            <div class="text-center p-3">
            <h2 class="text-secondary text-center">Producto no Encontrado</h2>
            <h2 class="text-danger text-center mt-3 mb-3">404 error</h2>
            <a href="./index.html" class="btn btn-primary btn-prod">Volver</a>
            </div>
            `;
        }
    documentFragment.appendChild(div);
    showProduct.appendChild(documentFragment);
    
  }
  
// Funcion para crear los itemBoxes
const crearItemBoxs = (productos)=>{
    // Creando los itembox de los productos en oferta dinamicamente
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
                              <a href="./verProducto.html?id=${prod.producto_id}" title="Ver Informacion del Producto" class="btn-prod text-center" >Ver Producto</a>
                              <a href="https://wa.me/5493704073147?text=Hola,+me+interesa+el+producto:+${prod.cnombre_producto}+-+CODIGO+${prod.cod_producto}" title="Preguntar por WhatsApp" class="btn-oferta btn-wa-oferta" target="_blank"><span class="fa fa-whatsapp text-light"></span>Consultar</a>
                              </div>
                              
                          </div>
                          </div>
                      </div>
                  </div>
      `;
      documentFragment.appendChild(div);
  
    })
    
    filaCatalogo.appendChild(documentFragment);
  
  }