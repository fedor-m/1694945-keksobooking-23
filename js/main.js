import { loadAnnouncements } from './server.js';
import { createMarker } from './map.js';
loadAnnouncements()
  .then((result) => {
    result.forEach((announcement) => {
      createMarker(announcement);
    });
  })
  .catch((err) => {
    const divError = document.createElement('div');
    const message = document.createElement('p');
    divError.classList.add('error');
    message.classList.add('error__message');
    message.textContent = err;
    divError.appendChild(message);
    document.body.appendChild(divError);
  });
