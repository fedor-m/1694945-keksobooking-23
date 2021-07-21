import { generateCardTemplate } from './card.js';
import { enableFilters } from './filters.js';
import { enableFormElements } from './form.js';

const DIGITS = 5;
const CENTER = [35.6895, 139.69171];
const MIN_ZOOM = 10;
const MAX_ZOOM = 22;
const map = L.map('map-canvas');
const mainMarker = L.marker();
const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const markerGroup = L.layerGroup();
markerGroup.addTo(map);

map.on('load', () => {
  enableFilters();
  enableFormElements();
});
map.setCenter = CENTER;
map.setZoom(MIN_ZOOM);
map.setMaxZoom(MAX_ZOOM);
map.setView(CENTER, MIN_ZOOM);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

mainMarker.setLatLng(CENTER);
mainMarker.options.draggable = true;
mainMarker.on('moveend', (e) => {
  const coordinates = e.target.getLatLng();
  const lat = coordinates.lat.toFixed(DIGITS);
  const lng = coordinates.lng.toFixed(DIGITS);
  document.querySelector('#address').value = `${lat}, ${lng}`;
});
mainMarker.setIcon(mainIcon).addTo(map);

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

function generateMarkers(announcements)
{
  announcements.forEach((announcement) => createMarker(announcement));
  return announcements;
}

function renderMarkers(announcements) {
  markerGroup.clearLayers();
  announcements.forEach((announcement) => createMarker(announcement));
}

export { map, CENTER, mainMarker, MIN_ZOOM, generateMarkers, renderMarkers };
