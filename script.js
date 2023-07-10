
 /* ARRAY INICIO */

 const productos = [
    { id: 1, nombre: "Fernet", categoria: "aguardiente", stock: 75, precio: 2750, imagen: "./images/fernet.png"},
    { id: 2, nombre: "Vino tinto", categoria: "fermentadas", stock: 60, precio: 1800, imagen: "./images/vinotinto.png"},
    { id: 3, nombre: "Vino blanco", categoria: "fermentadas", stock: 80, precio: 1200, imagen: "./images/vinoblanco.png"},
    { id: 4, nombre: "Champagne", categoria: "aguardiente", stock: 90, precio: 2500, imagen: "./images/champagne.jpg"},
    { id: 5, nombre: "Whisky", categoria: "aguardiente", stock: 50, precio: 3500, imagen: "./images/whisky.jpg"},
    { id: 6, nombre: "Vodka", categoria: "aguardiente", stock: 69, precio: 980, imagen: "./images/vodka.jpg"},
    { id: 7, nombre: "Ron", categoria: "aguardiente", stock: 38, precio: 1800, imagen: "./images/ron.jpg"},
    { id: 8, nombre: "Cerveza", categoria: "fermentadas", stock: 210, precio: 440, imagen: "./images/cerveza.jpg"},
    { id: 9, nombre: "Tequila", categoria: "aguardiente", stock: 55, precio: 2200, imagen: "./images/tequila.png"},
    { id: 10, nombre: "Ginebra", categoria: "aguardiente", stock: 42, precio: 6000, imagen: "./images/ginebra.png"},

]

 /* AGREGADOS*/

class Agregados {
    constructor (id, nombre, categoria, stock, precio, imagen) {
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.stock = stock,
        this.precio = precio
        this.imagen = imagen
    }
}

let agregado1 = new Agregados (11, "Jägermeister", "Exclusivo", 10, 9850, "./images/jagger.jpg")
let agregado2 = new Agregados (12, "J.Walker Blue Label", "Exclusivo", 1, 99800, "./images/bluelabel.png")
let agregado3= new Agregados (13, "Nero 53", "Exclusivo", 15, 2000, "./images/negro53.jpg")

productos.push(agregado1, agregado2, agregado3)

/* FUNCION E*/

function empaquetar (productos) {
    let containerProductos = document.getElementById("container__productos")
    containerProductos.innerHTML = ""

    productos.forEach(producto => {
        let card__productos = document.createElement("div")

        card__productos.innerHTML = `<h2 class="titulo__producto">${producto.nombre}</h2>
                                        <img src="${producto.imagen}" class="imagen__producto">
                                        <p> Precio: $${producto.precio}</p>
                                        <button class="button" id="button__producto" type="submit" value="${producto.id}">Comprar</button>
                                        <p class="parrafo__stock"> Quedan ${producto.stock} unidades</p>`
        

        card__productos.classList.add("card__productos")
        containerProductos.classList.add("container__productos")
        containerProductos.appendChild(card__productos)
                               
    })

    let botonesCompra = document.getElementsByClassName("button")  

    for (let i = 0; i < botonesCompra.length; i++) {
      botonesCompra[i].addEventListener("click", comprar)
    }

}


empaquetar(productos)


let botonesCategoria = document.getElementsByClassName("botones__categoria")

for (let i = 0; i < botonesCategoria.length; i++) {
    botonesCategoria[i].addEventListener ("click", categorizar)
}

/* CATEGORIAS */

let categoriaActual = "todos"

function categorizar(event) {
  let valorCategoria = event.target.value.toLowerCase()
  let resultadoCategoria = productos.filter(
    (producto) => producto.categoria.toLowerCase() === valorCategoria)

  
  valorCategoria === "todos" ? empaquetar(productos) : empaquetar(resultadoCategoria)

  let nombreCategoria = document.getElementById("productos__title")
  nombreCategoria.innerText = event.target.value
  
  categoriaActual = event.target.value.toLowerCase()
}

/* ORDEN */

let botonOrden = document.getElementById("select__orden")
botonOrden.addEventListener("click", ordenar)


function ordenar(event) {
  
  if (event.target.value === "menorPrecio") {
    let resultadoOrden = productos.sort((a,b) => a.precio - b.precio)
    empaquetar(resultadoOrden)
  }
  else if (event.target.value === "mayorPrecio") {
    let resultadoOrden = productos.sort((a,b) => b.precio - a.precio)
    empaquetar(resultadoOrden)
  }

  else if (event.target.value === "menorStock") {
    let resultadoOrden = productos.sort((a,b) => a.stock - b.stock)
    empaquetar(resultadoOrden)
  }

  else if (event.target.value === "mayorStock") {
    let resultadoOrden = productos.sort((a,b) => b.stock - a.stock)
    empaquetar(resultadoOrden)
  }
  empaquetar(resultadoOrden)
 
}

/* BUSQUEDA */


let busquedaInput = document.getElementById("busqueda__input")
busquedaInput.addEventListener('input', recorrer)

function recorrer (event) {
  let busqueda = event.target.value.toLowerCase()
  let productoBuscado = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda))

  if (productoBuscado) {
    empaquetar(productoBuscado)
  } 
  else {
    empaquetar(productos)
  }
}

/* CARRITO */

let carrito = []

function comprar (event) {
    let productoId = parseInt(event.target.value)
    let producto = productos.find(producto => productoId === producto.id)

    if (producto && producto.stock > 0 ) {
        let productoEnCarrito = carrito.find(producto => productoId === producto.id)

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++
        }
        else {
            productoEnCarrito = {
                id : producto.id,
                nombre: producto.nombre,
                categoria: producto.categoria,
                stock: producto.stock,
                precio: producto.precio,
                cantidad: 1
            }
            carrito.push(productoEnCarrito)
      
            
        }
        producto.stock--

        mostrarCarrito()
        let resultadoCategoria = productos.filter(
          (producto) => producto.categoria.toLowerCase() === categoriaActual)

          
        categoriaActual !== "todos" ? empaquetar(resultadoCategoria) :  empaquetar(productos)
        
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Nos quedamos sin stock',
        text: '¡Revise las unidades disponibles de otros posibles productos!',
        
      })
    }
}

/* MOSTRAR CARRITO */

function mostrarCarrito() {
    let carritoContainer = document.getElementById("carrito__productos")
    carritoContainer.innerHTML = ""
    let parrafoTotal = document.getElementById("parrafo__total")
    let total = 0
  
    carrito.forEach((producto, index) => {
      
      let contenedorProducto = document.createElement("div")
      contenedorProducto.innerHTML = `<p>${producto.nombre}</p> <p>${producto.cantidad}</p> <p>$${producto.precio}</p><img src="./images/equis.png" class="eliminar-producto">`
  
      localStorage.setItem('producto', `${producto.nombre}`)
      localStorage.setItem('cantidad', `${producto.cantidad}`)
      localStorage.setItem('precio', `${producto.precio}`)


      contenedorProducto.className = "carrito__producto"
      carritoContainer.appendChild(contenedorProducto)
  
      let eliminarProducto = contenedorProducto.querySelector(".eliminar-producto")
      eliminarProducto.addEventListener("click", () => remove(index))
     
     
      total += producto.precio * producto.cantidad
  
    })
    parrafoTotal.innerText = `TOTAL: $${total}`
  
  }

  /* ELIMINAR BEBIDA*/

  function remove(index) {
    let productoEliminado = carrito[index]
    carrito.splice(index, 1)
  
    
    let productoOriginal = productos.find(p => p.id === productoEliminado.id)
    productoOriginal.stock += productoEliminado.cantidad
  
    mostrarCarrito()
    empaquetar(productos)
  }


  /* INGRESAR */

  let ingreso = document.getElementById("opcion__ingreso")
  ingreso.addEventListener("click", loguear)
  
  function loguear() {
    let megaContainer = document.getElementById("mega__container")
    megaContainer.classList.add("mega__container")
    
  
    let logueoContainer = document.createElement("div")
    logueoContainer.innerHTML = `<h2> Ingresá tus datos</h2>
                                <form id="form__ingreso">
                                  <input type="text" placeholder="Nombre" id="input__nombre">
                                  <input type="text" placeholder="Apellido" id="input__apellido">
                                  <input type="email" placeholder="E-mail" id="input__mail">
                                  <input type="password" placeholder="Designa una contraseña" id="input__contrasena">
                                  <button id="ingresar__button" type="button">Ingresar</button>
                                </form>
                                <img id="equis__ingreso" src="./images/equis.png">`
    logueoContainer.classList.add("logueo__container")
    document.body.appendChild(logueoContainer)
  
    let equisIngreso = logueoContainer.querySelector("#equis__ingreso")
    equisIngreso.addEventListener("click", function() {
      document.body.removeChild(logueoContainer)
      megaContainer.classList.remove("mega__container")
    });


    
  let inicioSesion = document.getElementById("ingresar__button")
  inicioSesion.addEventListener("click", iniciar)
  }
  
  /* INICIO SESION */
  

  function iniciar (event) {

    event.preventDefault()

    let nombreUsuario = document.getElementById("input__nombre").value
    let apellidoUsuario = document.getElementById("input__apellido").value
    let mailUsuario = document.getElementById("input__mail").value
    let contrasenaUsuario = document.getElementById("input__contrasena").value
  
    let usuario = {
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      mail: mailUsuario,
      contrasena: contrasenaUsuario
    }

    localStorage.setItem('nombre', nombreUsuario)
    localStorage.setItem('apellido', apellidoUsuario)
    localStorage.setItem('mail', mailUsuario)
    localStorage.setItem('contrasena', contrasenaUsuario)
  
    let bienvenida = document.createElement("div")
    bienvenida.innerHTML = "Hola " + nombreUsuario + `<p id="cerrar__sesion">Cerrar Sesion</p>`
    document.getElementById("header__usuario").appendChild(bienvenida)
    document.getElementById("opcion__ingreso").classList.add("ingreso__off")


    let megaContainer = document.getElementById("mega__container")
      megaContainer.classList.remove("mega__container")
    let logueoContainer = document.querySelector(".logueo__container")
    document.body.removeChild(logueoContainer)

    let cerrarSesion = document.getElementById("cerrar__sesion")
    cerrarSesion.addEventListener("click", desloguear)
    
  }

  window.addEventListener('beforeunload', function() {
    localStorage.clear()
  })

  /* CERRAR SESION */

function desloguear () {
    localStorage.clear()
    location.reload()
  }

  
  /* PAGAR */

let botonPagar = document.getElementById("boton__pagar")
botonPagar.addEventListener("click", function(event) {
  event.preventDefault()
  pagar()
})


function pagar() {  

  if (localStorage.getItem('nombre')) {
    if (carrito.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Agrega productos al carrito para proseguir',
        text: '¡Revisa las unidades disponibles!',
      })
    } else {
      let contenedorCompra = document.createElement("div")
      contenedorCompra.classList.add("contenedor__compra")
      let megaContainer = document.getElementById("mega__container")
    megaContainer.classList.add("mega__container")
      contenedorCompra.innerHTML = "<h2>Estás por comprar:</h2>"

      let total = 0

      carrito.forEach(producto => {
        contenedorCompra.innerHTML += `<p>${producto.nombre} x ${producto.cantidad} - $${producto.precio}</p>` 
        total += producto.precio * producto.cantidad
      })

     
      contenedorCompra.innerHTML += `<p class="parrafo__pago">Total a pagar: $${total}</p>
                                      <button id="pago__final" type="button">Pagar</button>
                                      <img id="equis__pago" src="./images/equis.png">`
      

      document.body.appendChild(contenedorCompra)
      let pagoFinal = document.getElementById("pago__final")
      pagoFinal.addEventListener("click", autorizado)
      

      let equisPago = contenedorCompra.querySelector("#equis__pago")
      equisPago.addEventListener("click", function() {
        
        document.body.removeChild(contenedorCompra)
        megaContainer.classList.remove("mega__container")
       
      });
    }
  } else {
    loguear()
  }
}

/* GRACIAS POR SU COMPRA */

function autorizado () {
    let contenedorGracias = document.createElement("div")
    contenedorGracias.innerHTML = `<h2>GRACIAS POR TU COMPRA</h2>
                                    <p class="parrafo__codigo>Tu código de referencia es "</p>
                                    <button id="salir__button">Salir</button>`
    
    contenedorGracias.classList.add("contenedor__gracias")                                
    document.body.appendChild(contenedorGracias)
    let contenedorCompra = document.querySelector(".contenedor__compra")
    document.body.removeChild(contenedorCompra)

    let botonSalir = document.getElementById("salir__button")
    botonSalir.addEventListener("click", salir)
}


/*  EXIT */

function salir () {
  localStorage.clear()
  location.reload()
}
