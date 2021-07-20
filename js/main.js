import { loadAnnouncements } from './server.js';
import { renderMarkers } from './map.js';
import { filtersForm, getFiltersData, disableFilters } from './filters.js';
import { onUploadFinal, disableFormElements } from './form.js';
import { debounce } from './debounce.js';

const DELAY = 500;

function onLoadSuccess(announcements) {
  renderMarkers(announcements);
  const withFilters = () => {
    const filteredAnnouncements = getFiltersData(announcements);
    renderMarkers(filteredAnnouncements);
  };
  filtersForm.addEventListener('change', debounce(withFilters, DELAY));
}

function onLoadError() {
  const divError = document.createElement('div');
  const message = document.createElement('p');
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.classList = ['map__canvas'];
  mapCanvas.innerHTML = '';
  divError.classList.add('error');
  message.classList.add('error__message');
  message.textContent = 'Ошибка загрузки данных с сервера!';
  divError.appendChild(message);
  document.body.appendChild(divError);
  disableFilters();
  disableFormElements();
  onUploadFinal();
}

loadAnnouncements(onLoadSuccess, onLoadError);

export { onLoadSuccess, onLoadError };
