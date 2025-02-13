document.getElementById('iniciar').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'iniciar' });
});

document.getElementById('pausar').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'pausar' });
});

document.getElementById('parar').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'parar' });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'actualizar') {
    document.getElementById('tiempo').textContent = message.tiempo;
  }
});
