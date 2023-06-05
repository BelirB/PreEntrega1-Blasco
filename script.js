let fernet = 1
let whisky = 2
let espumantes= 3
let vino = 4
let sumaTotal = 0
let opcionFernet

function bebida() {
    alert("Bienvenidos al Drugstore Online\n ¿Qué desea llevar?")
    alert("Antes de seguir con la compra, debemos corroborar de que usted es mayor de edad y pueda realizar compras de forma Online")
let edad = Number(prompt("Ingrese su edad"))
if (edad >= 18) {
    alert("Usted cumple con la edad requerida para realizar esta compra")
    let ingreseUnNumero = prompt("Ingrese la opcion deseada:\n 1-Fernet $2750\n 2-Whisky $3500\n 3-Espumantes $1100\n 4-Vino $1500\n 5-Ver total de la compra\n 0-Salir")
    while (ingreseUnNumero != "0") {
        switch (ingreseUnNumero) {
            case "1":
                alert("Has elegido fernet")
                /*opcionFernet = prompt("¿Cuantos desea llevar? El fernet cuesta $2750 Pero contamos con las siguientes ofertas: A) x2 a $4800 B) x10 a $23500*/
                sumaTotal = sumaTotal + 2750
                alert(sumaTotal)
                break;
            case "2":
                alert("Has elegido whisky")
                /*let = prompt("¿Cuantos desea llevar? El whisky cuesta $3500 Pero contamos con las siguientes ofertas: A) x2 a $6000*/
                sumaTotal = sumaTotal + 3500
                alert(sumaTotal)
                break;
            case "3":
                alert("Has elegido espumantes")
                /*let = prompt("¿Cuantos desea llevar? Los espumantes rondan alrededor de $1100\n Pero contamos con las siguientes ofertas: A) x5 a $4600 B) x10 a $10000*/
                sumaTotal = sumaTotal + 1100
                alert(sumaTotal)
                break;
            case "4":
                alert("Has elegido vino")
            /*let = prompt("¿Cuantos desea llevar? Los vinos rondan alrededor de $1500 Pero contamos con las siguientes ofertas: A) x2 a $2700 B) x10 a $13000*/
                sumaTotal = sumaTotal + 1500
                alert(sumaTotal)
                break;
            case "5":
                alertaCinco()
                break;
                default:
                    alert("El número ingresado es incorrecto, vuelva a intentarlo")
        }
        ingreseUnNumero = prompt("Ingrese la opcion deseada:\n 1-Fernet $2750\n 2-Whisky $3500\n 3-Espumantes $1100\n 4-Vino $1500\n 5-Ver total de la compra\n 0-Salir")
    }
} else {
    alert("Usted no cumple con la edad requerida para seguir avanzando con esta compra")
}
alert("Gracias por visitarnos")
}

function alertaCinco() {
    alert(sumaTotal)
}


