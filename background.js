let tiempo = 0;
let intervalo;
let activo = false;

function actualizarPopup() {
  const tiempoFormateado = new Date(tiempo * 1000).toISOString().substr(11, 8);
  chrome.runtime.sendMessage({ action: 'actualizar', tiempo: tiempoFormateado });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ tiempo: 0, activo: false });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'iniciar') {
    if (!activo) {
      activo = true;
      intervalo = setInterval(() => {
        tiempo++;
        actualizarPopup();
      }, 1000);
      chrome.storage.local.set({ tiempo, activo });
    }
  } else if (message.action === 'pausar') {
    if (activo) {
      activo = false;
      clearInterval(intervalo);
      chrome.storage.local.set({ tiempo, activo });
    }
  } else if (message.action === 'parar') {
    activo = false;
    clearInterval(intervalo);
    tiempo = 0;
    actualizarPopup();
    chrome.storage.local.set({ tiempo, activo });
  }
});

chrome.storage.local.get(['tiempo', 'activo'], (result) => {
  tiempo = result.tiempo || 0;
  activo = result.activo || false;
  if (activo) {
    intervalo = setInterval(() => {
      tiempo++;
      actualizarPopup();
    }, 1000);
  }
});
