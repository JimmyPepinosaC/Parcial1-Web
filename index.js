const url =
  "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce";

let favoritos = [];

const leerJson = (param) => {
  return fetch(param).then((res) => res.json());
};

const lecturaJson = async () => {
  const json = await leerJson(url);
  return json;
};

currencyFormatter = (price, currency) => {
  let value = price;
  let result = value.toLocaleString("es-ar", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
  return result;
};

lecturaJson().then((json) => {
  json = json.items;

  const handleEnlistarElementos = () => {
    handleDescripcion = (evt) => {
      const id = evt.path[0].alt.split(" ")[1];
      for (let i = 0; i < json.length; i++) {
        if (id == json[i].id) {
          const pPrincipal = document.getElementById("principal");
          let precio = currencyFormatter(
            json[i].price.amount,
            json[i].price.currency
          );
          let boton;
          const objetoFav = {
            precio: precio,
            imagen: json[i].picture,
            free_shipping: json[i].free_shipping,
            nombre: json[i].title,
          };
          if (JSON.stringify(favoritos.find((e) => e.nombre == json[i].title)) != JSON.stringify(objetoFav)) {
            boton =
              '<button type="button" class="btn btn-primary" id="botonAnadirFav">Añadir a favoritos</button>';
          }else{
            boton = '<button type="button" class="btn btn-primary" id="botonQuitarFav">Quitar de favoritos</button>';
          }

          pPrincipal.innerHTML =
            '<div class="row" id="categoriaElemD"></div><div class="row" id="categoriaElemD"></div><div class="card"> <div class="card-body" id="detalleProducto"> <div class="row"> <div class="col-8"> <img src=' +
            json[i].picture +
            ' alt="imagen objeto" id="imgDetalle"> <h2 id="titDesc">Descripcion del producto</h2> <p id="desc">' +
            json[i].description +
            '</p> </div> <div class="col"> <div class="row" id="rowCQ"> <p id="cond-quan">' +
            json[i].condition +
            "|" +
            json[i].sold_quantity +
            ' vendidos </p> </div> <div class="row" id="rowNom"> <p id="nombreDesc">' +
            json[i].title +
            '</p> </div> <div class="row" id = rowPrecio> <p id="precioDesc">' +
            precio +
            '</p> </div> <div class="row" id="rowBotonCom">      <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#modalComprar" id="botonComprar">Comprar</button>  <div class="modal fade" id="modalComprar" tabindex="-1" role="dialog" aria-labelledby="comprarModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="comprarModalLabel">' +
            json[i].title +
            '</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <p>Añadido al carrito de compras</p> </div> <div class="modal-footer"> <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button> </div> </div> </div></div>     </div> <div class="row" id="rowBotonA">' +
            boton +
            "</div> </div> </div> </div> </div>";

          const handleAgregarFavs = () => {
            favoritos.push(objetoFav);
            handleDescripcion(evt);
          };

          const handleQuitarFavs = () => {
            let index = favoritos.findIndex((e) => e.nombre == json[i].title);
            favoritos.splice(index, 1);
            handleDescripcion(evt);
          };

          if (JSON.stringify(favoritos.find((e) => e.nombre == json[i].title)) != JSON.stringify(objetoFav)) {
            const botonAnadirF = document.getElementById("botonAnadirFav");
            botonAnadirF.addEventListener("click", handleAgregarFavs);
          }else{
            const botonAnadirF = document.getElementById("botonQuitarFav");
            botonAnadirF.addEventListener("click", handleQuitarFavs);
          }


          const rowP = document.getElementById("categoriaElemD");
          const p = document.createElement("p");
          p.id = "categoriaElemento";
          let categoria;
          for (let j = 0; j < json[i].categories.length; j++) {
            if (j == 0) {
              categoria = json[i].categories[0];
            } else {
              categoria += ">" + json[i].categories[j];
            }
          }
          p.textContent = categoria;
          rowP.appendChild(p);
        }
      }
    };

    const pPrincipal = document.getElementById("principal");
    pPrincipal.innerHTML = "";

    let row = document.createElement("div");
    row.className = "row";
    row.id = "listaCards";
    pPrincipal.appendChild(row);
    //console.log(json.items.length)
    for (let i = 0; i < json.length; i++) {
      let objeto = json[i];
      //console.log(objeto);

      let card = document.createElement("div");
      card.className = "card";
      row.appendChild(card);
      let html;
      if (objeto.free_shipping == true) {
        html =
          '<div class="card-body" id="productoLista"><div class="row"><div class="col-3"><img src=' +
          objeto.picture +
          ' alt="imagenobjeto: ' +
          objeto.id +
          '" ' +
          ' id="objeto"></div><div class="col"><div class="row" id="desc"><div class="col-3"><p id="precio">' +
          currencyFormatter(objeto.price.amount, objeto.price.currency) +
          '</p></div><div class="col"><img src="./Imagenes/Verde.png" alt="carrito" id="carrito"></div></div><div class="row" id="desc"><p id="nombre">' +
          objeto.title +
          '</p></div></div><div class="col-2"><p id="lugar">' +
          objeto.location +
          "</p></div></div></div>";
      } else {
        html =
          '<div class="card-body" id="productoLista"><div class="row"><div class="col-3"><img src=' +
          objeto.picture +
          ' alt="imagenobjeto: ' +
          objeto.id +
          '" ' +
          ' id="objeto"></div><div class="col"><div class="row" id="desc"><div class="col-3"><p id="precio">' +
          currencyFormatter(objeto.price.amount, objeto.price.currency) +
          '</p></div><div class="row" id="desc"><p id="nombre">' +
          objeto.title +
          '</p></div></div><div class="col-2"><p id="lugar">' +
          objeto.location +
          "</p></div></div></div>";
      }
      // const img = document.getElementById("objeto");
      // console.log(img);
      card.innerHTML = html;
    }
    const objetos = document.getElementsByClassName("card-body");
    for (let i = 0; i < objetos.length; i++) {
      const img = objetos[i].childNodes[0].childNodes[0].childNodes[0];
      img.addEventListener("click", handleDescripcion);
    }
  };

  handleEnlistarElementos();
  document
    .getElementById("logo")
    .addEventListener("click", handleEnlistarElementos);
});

const handleListaFav = () => {
  const pPrincipal = document.getElementById("principal");

  pPrincipal.innerHTML = "";

  let row = document.createElement("div");
  row.className = "row";
  row.id = "listaCards";
  pPrincipal.appendChild(row);

  let html;
  if (favoritos.length >= 1) {
    let card = document.createElement("div");
    card.className = "card";
    row.appendChild(card);
    html = `
    
    <div class="card-body" id="eliminarFav">
      <div class="row">
        <div class="col-1" id="checkEliminarP">
          <div class="form-check">
            <input  type="checkbox" class="cba" id="checkEliminarTodos">
          </div>
        </div>
        <div class="col">
          <button type="button" class="btn btn-primary "id="botonEliminar" disabled>Eliminar</button>
        </div>
      </div>
    </div>`;
    card.innerHTML = html;
  }

  for (let i = 0; i < favoritos.length; i++) {
    let objeto = favoritos[i];

    let card = document.createElement("div");
    card.className = "card";
    row.appendChild(card);
    if (objeto.free_shipping == true) {
      html =
        `
        <div class="card-body" id="productoFavorito">
            <div class="row">
                <div class="col-1" id="checkEliminarG">
                  <div class="form-check">
                    <input type="checkbox" class="cb" id="checkEliminar">
                  </div>
                </div>
                <div class="col-2">
                    <img src=` +
        objeto.imagen +
        ` alt="objeto" id="objeto">
                </div>
                <div class="col">
                    <div class="row" id="desc">
                        <div class="col-3">
                            <p id="precio">` +
        objeto.precio +
        `</p>
                        </div>
                        <div class="col">
                            <img src="./Imagenes/Verde.png" alt="carrito" id="carrito">
                        </div>
                    </div>
                    <div class="row" id="desc">
                        <p id="nombre">` +
        objeto.nombre +
        `</p>
                    </div>
                </div>
                <div class="col-3">
                  <button type="button" class="btn btn-primary "id="botonVer">Ver articulo</button>
                </div>
            </div>
        </div>`;
    } else {
      html =
        `
      <div class="card">
        <div class="card-body" id="productoFavorito">
            <div class="row">
                <div class="col-1" id="checkEliminarG">
                  <div class="form-check">
                    <input class="cb" type="checkbox" id="checkEliminar">
                  </div>
                </div>
                <div class="col-2">
                    <img src=` +
        objeto.imagen +
        ` alt="objeto" id="objeto">
                </div>
                <div class="col">
                    <div class="row" id="desc">
                        <div class="col-3">
                            <p id="precio">` +
        objeto.precio +
        `</p>
                        </div>
                    </div>
                    <div class="row" id="desc">
                        <p id="nombre">` +
        objeto.nombre +
        `</p>
                    </div>
                </div>
                <div class="col-3">
                  <button type="button" class="btn btn-primary "id="botonVer">Ver articulo</button>
                </div>
            </div>
        </div>`;
    }
    card.innerHTML = html;
  } 
};

document.getElementById("fav").addEventListener("click", handleListaFav);




