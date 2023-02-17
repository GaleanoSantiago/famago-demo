// --------------------------------- Catalogo de productos ---------------------------------
const filaCatalogo = document.getElementById("catalogo");
const productos=[
    {
        categoria:"materiales",
        nombre:"Ladrillo",
        descripcion:"Ladrillo 23x70x30",
        imagen:"./public/img/1.jpg",
        value:0
    },
    {
        categoria:"obras",
        nombre:"Cal 23kg",
        descripcion:"cal 23kg se vende por docena",
        imagen:"https://picsum.photos/id/870/600/400",
        value:1
    },
    {
        categoria:"fletes",
        nombre:"Grava",
        descripcion:"grava vendida por kilo o algo",
        imagen:"https://picsum.photos/id/655/600/400",
        value:2
    },
    {
        categoria:"obras",
        nombre:"Arena",
        descripcion:"Arena de playa de la plata, granitos de vidrio templado rgb",
        imagen:"https://picsum.photos/id/870/600/400",
        value:3
    },
    {
        categoria:"obras",
        nombre:"Tubos de PVC",
        descripcion:"Tubos de pvc :p rgb gamer",
        imagen:"https://picsum.photos/id/870/600/400",
        value:4
    },
    {
        categoria:"materiales",
        nombre:"Cilindros",
        descripcion:"Cilindros de aluminio 12X13cm",
        imagen:"https://picsum.photos/id/1040/600/400",
        value:5
    },
    {
        categoria:"fletes",
        nombre:"Viajes fletes",
        descripcion:"Cilindros de aluminio 12X13cm",
        imagen:"https://picsum.photos/id/655/600/400",
        value:6
    },
    {
        categoria:"fletes",
        nombre:"Viajes fletes 2",
        descripcion:"viajes fletes",
        imagen:"https://picsum.photos/id/655/600/400",
        value:7
    },
    {
        categoria:"obras",
        nombre:"Construccion de obras pequeñas",
        descripcion:"Construccion de obras pequeñas 31x34",
        imagen:"https://picsum.photos/id/870/600/400",
        value:8
    },
    {
        categoria:"materiales",
        nombre:"Tuverias de metal",
        descripcion:"Tuverias de metal 12X13cm",
        imagen:"https://picsum.photos/id/1040/600/400",
        value:9
    },
    {
        categoria:"materiales",
        nombre:"Hierros",
        descripcion:"hierros de aluminio 12X13cm",
        imagen:"https://picsum.photos/id/1040/600/400",
        value:10
    },
    {
        categoria:"fletes",
        nombre:"Logistica en fletes",
        descripcion:"logistica en obras, fletes :p",
        imagen:"https://picsum.photos/id/655/600/400",
        value:11
    },
    {
        categoria:"materiales",
        nombre:"Tablas de madera",
        descripcion:"tablas de madera 123x300",
        imagen:"https://picsum.photos/id/1040/600/400",
        value:12
    },
    {
        categoria:"fletes",
        nombre:"Logistica en fletes 2",
        descripcion:"logistica en obras, fletes 2",
        imagen:"https://picsum.photos/id/655/600/400",
        value:13
    }
]

let documentFragment = document.createDocumentFragment();
let img;
let nombreProducto;
productos.forEach(prod=>{
    switch (prod.categoria) {
        case 'materiales':
            img="./public/img/1.jpg";
            nombreProducto="Exhibidora vertical MT 400 - 390 litros";
        break;
        case 'fletes':
            img="./public/img/2.jpg";
            nombreProducto="Batea vidrio curvo con puertas - 1.20 metros - Equ";
          break;
        case 'obras':
            img="./public/img/4.jpg";
            nombreProducto="Exhibidora vertical 3 puertas - 1200 litros";
        break;
        default:
            img="./public/img/3.jpg";

      }
    let div = document.createElement("DIV");
    div.classList.add("itemBox");
    div.setAttribute("data-item",`${prod.categoria}`);
    div.innerHTML=`
    <div class="image">
                    <div class="imgs">
                        <img src="${img}" alt="">
                    </div>
                    <div class="image-body">
                        <h6>${nombreProducto}</h6>
                        <div class="btns">
                        
                        <div class="row">
                            <div class="col-8 d-flex align-items-center">
                            <a href="./verProducto.html" class="btn-prod text-center" value="${prod.value}">Ver Producto</a>
                            </div>
                            <div class="col-3">
                                <span class="precio_tachado">$30000</span>
                                <span class="">$25000</span>
                            </div>
                        
                        </div>
                        </div>
                    </div>
                </div>
    `;
    documentFragment.appendChild(div);

   
})
filaCatalogo.appendChild(documentFragment);


const btnsProd = document.querySelectorAll(".btn-prod");

btnsProd.forEach(btn=>{
    
    const modalHeader=document.getElementById("modal-header");
    const modalBody=document.getElementById("modal-body");
    const modalFooter=document.getElementById("modal-footer");

    btn.addEventListener("click",()=>{
        // console.log(btn.value);
        // console.log(productos[btn.value].nombre);

        modalHeader.innerHTML = `
        <h3 class="modal-title fs-5" id="exampleModalLabel">${productos[btn.value].nombre}</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
        modalBody.innerHTML = `
        <div class="row">
            <div class="col-12 col-lg-6 col-md-12 col-sm-12 border">
                <div class="cont-modal-img">
                    <img src="${productos[btn.value].imagen}" alt="">
                </div>    
            </div>
            <div class="col-12 col-lg-6 col-md-12 col-sm-12 border">
                <div class="modal-desc">
                    <h2>${productos[btn.value].nombre}</h2>
                    <p>Descripcion: ${productos[btn.value].descripcion}</p>
                    <p>orem ipsum dolor sit amet consectetur adipisicing elit. 
                    Deleniti necessitatibus dolor eveniet qui totam iste 
                    voluptas ipsam eius maiores, possimus natus quaerat 
                    molestiae consequuntur expedita enim architecto quos 
                    eaque laudantium tenetur nesciunt, harum impedit unde 
                    doloribus laboriosam. Repellat facere </p>
                </div>
            </div>
        </div>
        `;
        modalFooter.innerHTML=`
            <a href="https://wa.me/5493704073147?text=Hola,+me+gustaria+saber+el+precio+de+${productos[btn.value].nombre}" 
                class="btn-wa" target="_blank" title="Boton para ir a WahatsApp"> <span class="fa fa-whatsapp"></span> Consultar Precio</a>
        `;
    })
})

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


            if(item.getAttribute("data-item") == dataFilter || dataFilter == "all"){
                item.classList.remove("hide");
                item.classList.add("active");
            }

        })
    })
})
