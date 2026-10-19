function SolicitarSaludo (saludo){
    return new Promise ((resolve, reject) => {
        setTimeout (() => {
            resolve (saludo)
        }, 2000)
    })
}

function SolicitarNombre (nombre){
    return new Promise ((resolve, reject) => {
        if (nombre == "PACMAN"){
            reject ('El nombre es incorrecto')
        }
        setTimeout(() => {
            resolve (nombre)
        }, 80)
    })
}

SolicitarSaludo("HOLA")
    .then(resultado => {
        console.log(resultado)
    })
    .catch(resultado => {
        console.log(error)
    })

SolicitarNombre("PACMAN")
    .then(resultado => {
        console.log(resultado)
    })
    .catch(error => {
        console.log(error)
    })


// Promise.all([SolicitarSaludo("HOLA"), SolicitarNombre("PACMAN")]).then(
//     resultado => {
//         console.log(resultado)
//     }
// ).catch(err => {
//     console.log(err)
// })