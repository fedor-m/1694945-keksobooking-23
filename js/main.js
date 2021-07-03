import { generateAnnouncements } from './data.js';
import { generateCardTemplate } from './card.js';
const newAnnouncements = generateAnnouncements();
const cardData=newAnnouncements[0];
function renderCard(card){
  const announcement=generateCardTemplate(card);
  const mapCanvas=document.querySelector('#map-canvas');
  mapCanvas.appendChild(announcement);
}
renderCard(cardData);
