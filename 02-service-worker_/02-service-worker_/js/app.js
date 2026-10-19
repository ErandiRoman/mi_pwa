// Revisar si puedo usar el Service Worker


// EL service worker se registra en el navegador y se deja al mismo nivel del index 
// debido a que asi puede controlar toda la aplicacion
if (navigator.serviceWorker) {
    console.log('Si se puede usar el Service Worker');

    navigator.serviceWorker.register('./sw.js')
    .then(resultado => {
        console.log("Ya quedo el SW")
    })
    .catch(err => {
        console.warn("Error al tratar de registrar el SW", err);
    });
}

// fetch("css/style.css")
// .then (respuesta => respuesta.text())
// .then (texto => console.log(texto));

// fetch("img/main.jpg")
// .then (respuesta => {
//     console.log(respuesta);
//     return respuesta.blob();
// })
// .then (blob => {
//     console.log('El blob completo:', blob);
//     console.log('Tamaño en bytes:', blob.size);
//     console.log('Tipo de archivo:', blob.type);
// });

fetch ('https://jsonplaceholder.typicode.com/posts/1')
.then (respuesta => respuesta.json())
.then (datos => {
    console.log(datos);
    console.log(datos.title);
});