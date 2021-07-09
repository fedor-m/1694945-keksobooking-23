import { toggleFormFields } from './form.js';
function initializeMap() {
  const map = L.map('map-canvas');
  const center=[35.6895, 139.692];
  const minZoom=10;
  const maxZoom=22;
  const northEast=[35.788747,139.868467];
  const southWest=[35.784068,139.737757];
  map.on('load', () => {
    toggleFormFields(false);
  });
  map.center = center;
  map.setZoom(minZoom);
  map.setMaxZoom(maxZoom);
  map.setView(map.center, map.zoom);
  map.setMaxBounds([northEast,southWest]);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  return map;
}
export { initializeMap };
