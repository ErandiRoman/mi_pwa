const CACHE_STATIC_NAME  = 'static-v6';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

console.log('Cargando');

self.addEventListener('install', e => {
    const cacheProm = caches.open( CACHE_STATIC_NAME )
        .then( cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/estrellas.jpg',
                '/js/app.js',
                '/img/no-img.jpg',
                '/img/galaxia.jpg'
            ]);

        
        });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
            .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));


    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );
});

// self.addEventListener('activate', (event) => {
//     console.log('SW Activado');
// });

self.addEventListener('activate', e => {
	// Borrado del cache 
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {

            if (key !== CACHE_STATIC_NAME && key.includes('static')){
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(respuesta);
});

self.addEventListener('fetch', e => {

    // // Responder algo a los fetchs
    // e.respondWith( 
    //     // CACHE ONLY
    //     caches.match(e.request)
    // );

    //CACHE CON AYUDA DE LA RED
            // const respuesta = caches.match(e.request)
            // .then(res =>{
            //     if (res) return res
            //     //No existe el archivo
            //     //Tengo que ir a la red

            //     console.log('No existe: ', e.request.url)

            //     return fetch(e.request) .then(newResp=>{
            //         caches.open(CACHE_STATIC_NAME).then(
            //             cache=>{
            //                 cache.put(e.request, newResp)
            //             }
            //         )
            //         return newResp.clone()
            //     })
            // })
            // e.respondWith(respuesta)


            const promesa = fetch(e.request).then (respuesta => {
                if (!respuesta){
                    return caches.match(e.request);
                }

                caches.open(CACHE_DYNAMIC_NAME).then(
                    cache =>{
                        cache.put(e.request, respuesta);               
                    }
                )
                return respuesta.clone();
            })
            .catch (err => {

                return caches.match(e.request).then(response=>{
                    if(response){
                        return response;
                    }
                    if(e.request.destination === 'image'){
                        return caches.match('/img/no-img.jpg');
                    }
                });
            });

            e.respondWith(promesa);

});
