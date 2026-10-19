// Revisar si el navegador soporta Service Worker
if (navigator.serviceWorker) {
    console.log('Sí se puede usar el Service Worker');

    // Se registra sw.js asumiendo que el HTML está en la raíz
    navigator.serviceWorker.register('./sw.js')
    .then(resultado => {
        console.log("Ya quedó registrado el SW");
    })
    .catch(err => {
        console.warn("Error al tratar de registrar el SW", err);
    });
}