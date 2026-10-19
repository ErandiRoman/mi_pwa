//El SW tiene listeners de acciones

self.addEventListener('fetch', e => {

    // console.log(e)
    // console.log('SW capturó una petición')

    if(e.request.url.includes('.jpg')){
        console.log('Ya vi la imagen')
        e.respondWith(fetch('img/main-patas-arriba.jpg'));
        //e.respondWith(null);
    }

});
