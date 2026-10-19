
function multiplicar(numero) {
    var promesa = new Promise(function(resolve,reject){

        if(numero >= 10){
            return reject('numero muy alto')
        }

        //return resolve(numero *2)
        setTimeout(function(){
            return resolve(numero * 2)
        }, 200);
    })
    return promesa
    
}

//console.log(multiplicar(2))
multiplicar(4)
    .then(resultado => {
        return multiplicar(resultado)
    })
    .then(resultado => {
        console.log(resultado)
    })
    .catch(error => {
        console.log(error)
    })