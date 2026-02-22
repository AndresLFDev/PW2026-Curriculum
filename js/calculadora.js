/*-----------------CALCULADORA-----------------------*/

/* VARIABLES */



//variables para las operaciones

let borrar = false


//FUNCIONES

function hacerOperacion(){
    var expresion = document.getElementById('expresion')
    datos = getDatos()
    console.log(datos.n1 + datos.op + datos.n2 )
    if(datos.op === "+"){
        expresion.value = datos.n1 + datos.n2; 
    }else if(datos.op === "-"){
        expresion.value = datos.n1 - datos.n2;
    }else if(datos.op === "*"){
        expresion.value = datos.n1 * datos.n2;
    }else if(datos.op === "/"){
        expresion.value = datos.n1 / datos.n2;
    }else{
        expresion.value = "ilegalArgument"
    }
    
    if(!borrar){
        borrar = true
    }
}

function getDatos(){
    var input = document.getElementById('expresion')
    let expresion = input.value
    let numero1 = "";
    let numero2 = "";
    let operador = "";
    let numero1completo = false;
    for(i = 0; i < expresion.length ; i++){
        if(expresion[i] != "+" && expresion[i] != "-" && expresion[i] != "*" && expresion[i] != "/"){
            console.log(expresion[i])
            if(!numero1completo){
                numero1 += expresion[i];
            }else{
                numero2 += expresion[i];
            }
        }else{
            console.log(expresion[i])
            operador = expresion[i];
            if(numero1completo === true){
                return { n1: 0, n2: 0, op: "@"}
            }
            numero1completo = true;
        }
    }
    return { n1: parseInt(numero1), n2:parseInt(numero2), op: operador}
}

function agregarCaracter(caracter){
    var expresion = document.getElementById('expresion')
    if(borrar){
        expresion.value = ""
        borrar = false
    }
    expresion.value += caracter;
}

function limpiar(){
    var input = document.getElementById('expresion')
    input.value = ""
}



