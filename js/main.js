import { loadAnnouncements } from './server.js';
import { renderMarkers } from './map.js';
import { filtersForm, getFiltersData, disableFilters, getMarkers } from './filters.js';
import { onUploadFinal, disableFormElements } from './form.js';
import { debounce } from './debounce.js';


const DELAY = 500;

function onLoadSuccess(announcements) {
  const markers = getFiltersData(announcements);
  getMarkers(markers);
  renderMarkers(markers);
  const applyFilters = () => {
    const filteredAnnouncements = getFiltersData(announcements);
    renderMarkers(filteredAnnouncements);
  };
  filtersForm.addEventListener('change', debounce(applyFilters, DELAY));
}

function onLoadError() {
  const divError = document.createElement('div');
  const message = document.createElement('p');
  const mapCanvas = document.querySelector('#map-canvas');
  const mapCanvasClasses = [...mapCanvas.classList];
  for (let i = 0; i < mapCanvasClasses.length; i++) {
    if (mapCanvasClasses[i].match('leaflet')) {
      mapCanvas.classList.remove(mapCanvasClasses[i]);
    }
  }
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

export { onLoadSuccess, onLoadError};
