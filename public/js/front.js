// ----------------- Navbar -----------------
const navbar = document.querySelector('#menubar');
// -------------------- Globo de oferta --------------------
const globoOferta = document.getElementById("globo-oferta");
const tituloDinamico = document.getElementById("titulo-dinamico");
// ---------- Obteniendo la seccion del catalogo -----------------
const filaCatalogo = document.getElementById("catalogo");
// Creando el documentFragment
let documentFragment = document.createDocumentFragment();


window.addEventListener('scroll', function() {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollPosition >= 350) {
    navbar.classList.add('fixed-navbar');
  } else {
    navbar.classList.remove('fixed-navbar');
  }
});

// Funcion para obtener productos
const obtenerProductos = async () => {
  // Es una petición GET, no necesitamos indicar el método ni el cuerpo
  const respuestaRaw = await fetch("./productos.json");
  const productos = await respuestaRaw.json();
  // console.log(productos);

  // Obteniendo los productos en oferta
  const productosEnOferta = productos.filter(function(producto) {
      return producto.boferta_especial === '1';
  });
     
  // Verificar si hay productos en oferta
  let prod;
  if(productosEnOferta==0){
    prod = productos;
  }else{
    prod = productosEnOferta;
  }

  // Ordenando el array, si hay productos en oferta odena por nprecio_descuento, sino por producto_id
  prod.sort(function(a, b) {
    if (a.nprecio_descuento == 0) {
      return parseInt(b.producto_id) - parseInt(a.producto_id);
    } else {
      return parseInt(b.nprecio_descuento) - parseInt(a.nprecio_descuento);
    }
  });

  //Si prod es no tiene descuentos, limita el array a 10 elementos
  if(prod[0].nprecio_descuento==0){
    prod.splice(10);

  }
  // console.log(prod);

  //LLamando a la funcion para crear los itembox 
  crearItemBoxs(prod);

  //LLamando a la funcion para crear el globo de oferta 
  crearGloboOferta(prod[0]);

}

// Llamada a la funcion para obtener los productos
obtenerProductos();

// Funcion para crear el globo de oferta
const crearGloboOferta = (maxProd)=>{
  let div = document.createElement("DIV");
  div.classList.add("row");
  
  div.innerHTML=`
    <div class="col-6 ">
      <div class="text-oferta ">
      <h1 class="text-center">${maxProd.nprecio_descuento > 1 ? 'Oferta Exclusiva' : 'Producto más Vendido del Mes'}</h1>
        <div class="card-text-oferta">
          <h4>${maxProd.cnombre_producto}</h4>
          <p>
          ${maxProd.nprecio_descuento > 1
            ? `<span class="precio_tachado text-danger">$${maxProd.nprecio}</span>
               <span class="">$${maxProd.nprecio_descuento}</span> Cuotas Diarias`
            : `<span class="">$${maxProd.nprecio}</span> Cuotas Diarias`}
          </p>
          <div class="btns-oferta">
            <a href="#" class="btn-prod btn-oferta">Ver Producto</a>
            <a href="#" class="btn-oferta btn-wa-oferta"><span class="fa fa-whatsapp"></span>Consultar</a>
          </div>
        </div>
      </div>
    </div>
    <div class="cont-prod-oferta col-6 ">
      <div class="prod-oferta">                            
        <img src="../../public/img/${maxProd.cimg_prod}" class="" alt="">
      </div>
    </div>
          `;
    
  documentFragment.appendChild(div);
  globoOferta.appendChild(documentFragment);
  
  //Cambiando el titulo del catalogo 
  if(maxProd.nprecio_descuento<1){
    tituloDinamico.innerHTML=`<span class="fa fa-arrow-down"></span> Vea más de Nuestros Productos <span class="fa fa-arrow-down"></span>`;
  }
}

// Funcion para crear los itemBoxes
const crearItemBoxs = (productosEnOferta)=>{
  // Creando los itembox de los productos en oferta dinamicamente
  productosEnOferta.forEach(prod=>{
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
                        <img src="../../public/img/${prod.cimg_prod}" alt="">
                    </div>
                    <div class="image-body">
                        <h6>${prod.cnombre_producto}</h6>
                        <div class="btns">
                        
                        <div class="row">
                            <div class="col-12 col-precios-cards">
                            ${prod.nprecio_descuento > 1
                              ? `<span class="precio_tachado text-danger">$${prod.nprecio}</span>
                                 <span class="">$${prod.nprecio_descuento}</span> Cuotas Diarias`
                              : `<span class="">$${prod.nprecio}</span> Cuotas Diarias`}
                            </div>
                            <div class="col-12 col-btns-cards">
                            <a href="#" title="Ver Informacion del Producto" class="btn-prod text-center" value="${prod.producto_id}">Ver Producto</a>
                            <a href="#" title="Preguntar por WhatsApp" class="btn-oferta btn-wa-oferta"><span class="fa fa-whatsapp text-light"></span>Consultar</a>
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

  // -------Para activar el efecto--------

  list.forEach(li=>{
      li.addEventListener("click",()=>{
          
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

          })
      })
  })

}
