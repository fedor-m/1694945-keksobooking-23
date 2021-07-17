import { loadAnnouncements } from './server.js';
import { onUploadFinal } from './form.js';
import { getFiltersData } from './filters.js';
import { disableFormFields } from './map.js';

function onLoadSuccess(result) {
  result.then((announcements) =>
    getFiltersData(announcements),
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
  disableFormFields(true);
}

loadAnnouncements(onLoadSuccess, onLoadError);
