// instalacion del service worker
self.addEventListener('install', event => {
    // Descargar assets
    // Creamos un cache

    // console.log("Instalando SW")

    // Simulaciond descarga de recursos que tarda 
    // const instalaciones = fetch('https://jsonplaceholder.typicode.com/posts/1')
    // instalaciones.then(resp=> console.log(resp))

    event.waitUntil(
    caches.open("mi primer cache")
    .then (cache => {
        cache.addAll(['/', '/index.html', 'css/style.css', 'js/app.js', 'img/main-patas-arriba.jpg', '/sw.js'])
    })
    )

    
})

// Activacion de Sw
// Cuando el SW toma el control de la app
self.addEventListener('activate', event => {
    // Borrar cache viejo
    // console.log('Activando SW2 y controlando la app')
})

// Fetch manejo de peticiones de http 
// self.addEventListener('fetch', event => {

//     event.respondWith(
//         caches.match(event.request).then(respuestaGuardada => {
//             if(respuestaGuardada) return respuestaGuardada;
//         })
//     )
//     // Todas las nuevas peticiones salen aqui 
//     // Se pueden capturar las peticiones 

//     // // Aplicar estrategias del cache , hay que determinar si vale la pena guadarlo 
//     //  if( event.request.url.includes('.jpg')){
//     //     caches.open('mi primer cache')
//     //     .then(cache => cache.add('img/main.jpg'))
//     //     .then(() => console.log('¡GUARDADO!'));
//     // }

//     // if( event.request.url.includes('.jpg')){
//     //     caches.open('mi primer cache')
//     //     .then(cache => cache.add('img/main-patas-arriba.jpg'))
//     //     .then(() => console.log('¡GUARDADO!'));
//     // }

//     //  if( event.request.url.includes('.css')){
//     //     caches.open('mi primer cache')
//     //     .then(cache => cache.add('css/style.css'))
//     //     .then(() => console.log('¡GUARDADO!'));
//     // }

//     // if( event.request.url.includes('.js')){
//     //     caches.open('mi primer cache')
//     //     .then(cache => cache.add('sw.js'))
//     //     .then(() => console.log('¡GUARDADO!'));
//     // }

//     // if( event.request.url.includes('.html')){
//     //     caches.open('mi primer cache')
//     //     .then(cache => cache.add('index.html'))
//     //     .then(() => console.log('¡GUARDADO!'));
//     // }

// })

self.addEventListener('fetch', event => {
    // Todas las nuevas peticiones salen aqui 
    // Se pueden capturar las peticiones 

    // Aplicar estrategias del cache , hay que determinar si vale la pena guadarlo 
    event.respondWith(
        caches.match(event.request).then(respuestaGuardada => {
            if (respuestaGuardada) {
                return respuestaGuardada;
            }
            
            // 2. Si NO está en el caché, lo descargamos de la red (internet)
            return fetch(event.request);
        })
    )
})

// PUSH : Maneja las notificaciones pust , se puede manejar como vibrar el telefono 
self.addEventListener('push', event => {
    console.log('Notificacion Recibida')
    console.log(event)
})