//llamada regular
let holaMundo = () =>{
    return "hola mundo";
}
let mensaje = holaMundo();
console.log(mensaje);

//llamada asincrona, la respuesta viene despues
let fnTimeout = () =>{
    return "hola mundo, asincrono";
}
let holaMundoAsincrono = () => {
    return setTimeout(fnTimeout, 1000);
}
let mensajeAsinc = holaMundoAsincrono();
console.log(mensajeAsinc);



//llamada con funcion callback
let holaMundoCallback = (fnCallback) => {
    return setTimeout(() => {
        fnCallback("Hola mundo, callback");
    }, 1000);
}
let fnCallback = (respuesta) => {
    console.log(respuesta);
}
let mensajeCallback = holaMundoCallback(fnCallback);


// promesa simple
let holaMundoPromesa = (numero = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve ("hola mundo con promesa: " + numero); 
        }, 1000);
    });
}

let promesa = holaMundoPromesa();
promesa.then((resultadoOk) => {
    console.log(resultadoOk);

}).catch((error) => {
    console.log(error);
});

let arrayPromesas = [holaMundoPromesa(1), holaMundoPromesa(2), holaMundoPromesa(3), holaMundoPromesa(4)];

Promise.all(arrayPromesas).then((arrayResultados) => {
    console.log(arrayResultados);
});

/*
//async await
let holaMundoPromesaAwaitable = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve("hola mundo con async await");
        }, 1000);
    });
}
*/

let holaMundoPromesaAwaitable = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random > 0.5){
                return resolve ("hola mundo promesa cumplida");
            }
            else{
                return reject ("hola mundo promesa rechazada");
            }
        }, 1000);
    });
}

/*
// ahora viene la funcion con async
let holaMundoAsync = async() => {
    let promesa = holaMundoPromesaAwaitable();
    let respuesta = await promesa;
    console.log(respuesta);
}
*/

//hacemos los let con try catch
let holaMundoAsync = async() => {
    let promesa = holaMundoPromesaAwaitable();
    try{
        let respuesta = await promesa;
        console.log(respuesta);

    }
    catch(err){
        console.log(err);
    }finally{
        console.log('se termino el async')
    }
}

//llamamos a la funcion asincrona
holaMundoAsync();
