import { generateAnnouncements } from './data.js';
import { createMarker } from './map.js';
const newAnnouncements = generateAnnouncements();
newAnnouncements.forEach((announcement) => {
  createMarker(announcement);
});
