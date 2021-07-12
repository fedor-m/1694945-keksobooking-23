import { toggleFormFields } from './form.js';
import { generateCardTemplate } from './card.js';

const MAP = L.map('map-canvas');
const CENTER = [35.6895, 139.692];
const MIN_ZOOM = 10;
const MAX_ZOOM = 22;
/*const northEast = [35.799747, 139.879467];
const southWest = [35.795068, 139.748757];*/
const MAIN_MARKER = L.marker();
MAIN_MARKER.setLatLng(CENTER);
MAIN_MARKER.options.draggable = true;
const MAIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
MAIN_MARKER.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  const lat = coordinates.lat;
  const lng = coordinates.lng;
  document.querySelector('#address').value = `${lat}, ${lng}`;
});
MAIN_MARKER.setIcon(MAIN_ICON).addTo(MAP);

function initializeMap(map) {
  map.on('load', () => {
    toggleFormFields(false);
  });
  map.CENTER = CENTER;
  map.setZoom(MIN_ZOOM);
  map.setMaxZoom(MAX_ZOOM);
  map.setView(map.CENTER, map.zoom);
  /*map.setMaxBounds([northEast, southWest]);*/
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  return map;
}
const markerGroup = L.layerGroup().addTo(MAP);
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
  marker.on('click', () => {
    marker.bindPopup(generateCardTemplate(point), {
      keepInView: true,
    });
  });
  marker.addTo(markerGroup);
}

initializeMap(MAP);
export { MAP, CENTER, MAIN_MARKER, MIN_ZOOM, createMarker };
