let alcohol = [
    { id: 1, bebida: "Fernet", categoria: "aguardiente", disponiblesstock: 75, precio: 2750 },
    { id: 2, bebida: "Vino tinto", categoria: "fermentadas", disponiblesstock: 90, precio: 1200 },
    { id: 3, bebida: "Vino blanco", categoria: "fermentadas", disponiblesstock: 80, precio: 980 },
    { id: 4, bebida: "Champagne", categoria: "aguardiente", disponiblesstock: 110, precio: 1300 },
    { id: 5, bebida: "Whisky", categoria: "aguardiente", disponiblesstock: 80, precio: 3500 },
    { id: 6, bebida: "Vodka", categoria: "aguardiente", disponiblesstock: 70, precio: 930 },
    { id: 7, bebida: "Ron", categoria: "aguardiente", disponiblesstock: 40, precio: 1500 },
    { id: 8, bebida: "Cerveza", categoria: "fermentadas", disponiblesstock: 150, precio: 850 },
    { id: 9, bebida: "Tequila", categoria: "aguardiente", disponiblesstock: 65, precio: 900 },
    { id: 10, bebida: "Ginebra", categoria: "aguardiente", disponiblesstock: 55, precio: 1300 },

]

let carrito = []

let mensaje = "Bienvenido al Drugstore Online, ¿Que desea? \n1 - Bebidas\n2 - Agregar bebidas al carrito \n3 - Ver Stock Disponible \n4 - Categorias de Bebidas\n5 - Precios de menor a mayor segun la bebida\n6 - Ver carrito\n7 - Ver Total y finalizar compra\n0 - SALIR"

let opcion

do {
    opcion = Number(prompt(mensaje))
    if (opcion === 1) {
        alert(listar(alcohol))
    } else if (opcion === 2) {
        let id = Number(prompt("Seleccione id del producto que desea comprar\n" + listar(alcohol)))
        let bebidabuscada = alcohol.find(trago => trago.id === id)
        let bebidasenCarrito = carrito.findIndex(prod => prod.id === bebidabuscada.id)

        if (bebidasenCarrito === -1) {
            carrito.push({
                id: bebidabuscada.id,
                bebida: bebidabuscada.bebida,
                precioporUnidad: bebidabuscada.precio,
                unidades: 1,
                subtotal: bebidabuscada.precio
            })
        } else {
            carrito[bebidasenCarrito].unidades++
            carrito[bebidasenCarrito].subtotal = carrito[bebidasenCarrito].precioporUnidad * carrito[bebidasenCarrito].unidades
        }
        console.log(carrito)
    } else if (opcion === 3) {
        let listaTragos = "Stock disponible:\n"
        for (const tragos of alcohol) {
            listaTragos += "Bebida: " + tragos.bebida + " - Stock disponible: " + tragos.disponiblesstock + "\n"
        }
        alert(listaTragos)

    } else if (opcion === 4) {
        let categoria = prompt("Ingrese la categoría: aguardiente o fermentadas").toLowerCase()
        let bebidasCategoria = alcohol.filter(alcohol => alcohol.categoria.toLowerCase() === categoria)
        if (bebidasCategoria.length > 0) {
            alert(listar(bebidasCategoria))
        } else {
            alert("No se encontraron productos en esa categoría.")
        }

    } else if (opcion === 5) {
        alcohol.sort((a, b) => a.precio - b.precio)
        let listaBebidas = "Bebidas ordenadas por precio de menor a mayor:\n"
        for (const tragos of alcohol) {
            listaBebidas += "Bebida: " + tragos.bebida + " - Precio: $" + tragos.precio + "\n"
        }
        alert(listaBebidas)
    } if (opcion === 6) {
        if (carrito.length > 0) {
            alert(listar(carrito))
        } else {
            alert("Antes que nada debe agregar productos al carrito")
        }
    } else if (opcion === 7) {
        let total = 0
        carrito.forEach(alcohol => {
            total += alcohol.subtotal
        })
        alert("Total de la compra: $" + total)
        break
    }
} while (opcion !== 0)


function listar(arrayAListar) {
    let listado = "ID - Bebida\n"
    arrayAListar.forEach(element => {
        listado = listado + element.id + "-" + element.bebida + "\n"
    })
    return listado
}


