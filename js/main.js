import { loadAnnouncements } from './server.js';
import { onUploadFinal } from './form.js';
import { filtersForm, getFiltersData } from './filters.js';
import { renderMarkers } from './map.js';

function onLoadSuccess(result) {
  let data=[];
  result.then((announcements) => {
    renderMarkers(announcements);
    data = announcements;
  });
  const reRenderAnnouncements = function () {
    const cards = getFiltersData(data);
    renderMarkers(cards);
  };
  filtersForm.addEventListener('change', reRenderAnnouncements);

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
  //disableFormFields(true);
}

loadAnnouncements(onLoadSuccess, onLoadError);
