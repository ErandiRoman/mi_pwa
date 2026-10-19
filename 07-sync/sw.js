// Que el Service Worker se active enseguida (solo para esta práctica)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
 
// El navegador dispara este evento cuando hay conexión
self.addEventListener('sync', (event) => {
//   console.log('¡Evento sync recibido! Etiqueta:', event.tag);
 
//   if (event.tag === 'mi-primer-sync') {
//     event.waitUntil(avisarALaPagina('✅ El Service Worker recibió el sync'));
//   }

  if (event.tag === 'mi-primer-sync') {
    event.waitUntil(enviarDatos());
  }
});
 
// Envía un texto a todas las páginas abiertas
async function avisarALaPagina(texto) {
  const ventanas = await self.clients.matchAll();
  ventanas.forEach((ventana) => ventana.postMessage(texto));
}

async function enviarDatos() {
  const respuesta = await fetch('datos.json');   // "enviamos" algo al servidor
  if (!respuesta.ok) {
    throw new Error('Falló el envío');           // el navegador lo reintentará
  }
  await avisarALaPagina('✅ Datos enviados');
}

