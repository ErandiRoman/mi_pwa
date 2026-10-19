const estado = document.getElementById('estado');
const btn = document.getElementById('btn');
 
// 1) Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
 
  // 2) Escuchar los mensajes que nos mande el Service Worker
  navigator.serviceWorker.addEventListener('message', (e) => {
    estado.textContent = e.data;
  });
}
 
// 3) Al pulsar el botón, pedimos la sincronización
btn.addEventListener('click', async () => {
  const registro = await navigator.serviceWorker.ready;
 
  if ('sync' in registro) {
    await registro.sync.register('mi-primer-sync');
    estado.textContent = 'Pedido registrado. El navegador avisará cuando haya conexión.';
  } else {
    estado.textContent = 'Tu navegador no soporta Background Sync (usa Chrome o Edge).';
  }
});
