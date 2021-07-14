import { loadAnnouncements } from './server.js';
import { createMarker } from './map.js';
import { onUploadFinal } from './form.js';

function onLoadSuccess(result) {
  result.then((announcements) =>
    announcements.forEach((announcement) => {
      createMarker(announcement);
    }),
  );
}

function onLoadError() {
  const divError = document.createElement('div');
  const message = document.createElement('p');
  divError.classList.add('error');
  message.classList.add('error__message');
  message.textContent = 'Ошибка загрузки данных с сервера!';
  divError.appendChild(message);
  document.body.appendChild(divError);
  onUploadFinal();
}

loadAnnouncements(onLoadSuccess, onLoadError);
