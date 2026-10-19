// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then((reg) => console.log('Service Worker registrado correctamente', reg))
    .catch((err) => console.error('Error al registrar Service Worker', err));
}

// Control del botón de Notificaciones
$('#btn-notify').on('click', () => {
  if (!('Notification' in window)) {
    alert('Este navegador no soporta notificaciones.');
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification('✨ Notificaciones Activadas', {
          body: 'Recibirás las últimas novedades astronómicas.',
          icon: 'img/icons/icon-512x512.png'
        });
      });
    }
  });
});

// Control de Background Sync al registrar estrella
$('#btn-save').on('click', () => {
  const starName = $('#star-name').val();
  if (!starName) return alert('Por favor ingresa un nombre de estrella');

  $('#stars').append(`<li>${starName}</li>`);
  $('#star-name').val('');

  // Registrar evento Sync si el navegador lo permite
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((reg) => {
      return reg.sync.register('sync-new-stars');
    }).then(() => {
      console.log('Evento Sync registrado con éxito');
    }).catch((err) => console.error('Error al registrar Sync:', err));
  } else {
    console.log('Sincronización de fondo no soportada, guardando en local.');
  }
});