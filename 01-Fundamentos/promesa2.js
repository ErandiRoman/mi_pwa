function SolicitarSumarLento(a, b) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 5000)
    })


}

let SolicitarSumarRapido = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            reject('Los números deben ser positivos')
        }
        setTimeout(() => {
            resolve(a + b)
        }, 800)
    })
}


SolicitarSumarLento(2, 2).then(resultado => {
    console.log(resultado)
})

SolicitarSumarRapido(3, 3).then(resultado => {
    console.log(resultado)
})

// que las dos peticiones lleguen al mismo tiempo
// Promise.all([SolicitarSumarLento(5, 10), SolicitarSumarRapido(-5, -1)]).then(
//     resultado => {
//         console.log(resultado)
//     }
// ).catch(err => {
//     console.log(err)
// })