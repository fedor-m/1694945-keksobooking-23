import { initFilters } from './filters.js';
import { generateCardTemplate } from './card.js';

const map = L.map('map-canvas');
const CENTER = [35.6895, 139.692];
const MIN_ZOOM = 10;
const MAX_ZOOM = 22;
const mainMarker = L.marker();
const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const markerGroup = L.layerGroup().addTo(map);
mainMarker.setLatLng(CENTER);
mainMarker.options.draggable = true;
mainMarker.on('moveend', (e) => {
  const coordinates = e.target.getLatLng();
  const lat = coordinates.lat;
  const lng = coordinates.lng;
  document.querySelector('#address').value = `${lat}, ${lng}`;
});
mainMarker.setIcon(mainIcon).addTo(map);
const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapCheckboxes = mapFilters.querySelectorAll('input');
const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const inputs = Array.from(mapSelects).concat(Array.from(mapCheckboxes)).concat(Array.from(adFieldsets));

function initializeCapacity() {
  const capacity = adForm.querySelector('#capacity');
  capacity.value = 1;
  capacity.querySelectorAll('option').forEach((o) => {
    o.value !== '1' ? ((o.disabled = true), o.removeAttribute('selected')) : '';
  });
}

function disableFormFields(isBlocked) {
  if (isBlocked) {
    mapFilters.classList.add('map-filters--disabled');
    adForm.classList.add('ad-form--disabled');
    map.remove();
  } else {
    mapFilters.classList.remove('map-filters--disabled');
    adForm.classList.remove('ad-form--disabled');
    initializeCapacity();
  }
  inputs.forEach((input) => {
    input.disabled = isBlocked;
  });
}

function initializeMap(createdMap) {
  createdMap.on('load', () => {
    disableFormFields(false);
  });
  createdMap.setCenter = CENTER;
  createdMap.setZoom(MIN_ZOOM);
  createdMap.setMaxZoom(MAX_ZOOM);
  createdMap.setView(CENTER, MIN_ZOOM);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(createdMap);
  return createdMap;
}


function createMarker(point) {
  const { lat, lng } = point.location;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker.bindPopup(generateCardTemplate(point), {
    keepInView: true,
  });
  marker.addTo(markerGroup);
}

initializeMap(map);

initFilters();

export { map, CENTER, mainMarker, MIN_ZOOM, createMarker, disableFormFields, initializeCapacity };
