import { generateAnnouncements } from './data.js';
import { generateCardTemplate } from './card.js';
import { toggleFormFields } from './form.js';
const newAnnouncements = generateAnnouncements();
const cardData=newAnnouncements[0];
const map=document.querySelector('#map');
const isMapBlocked=map===null;
function renderCard(card){
  const announcement=generateCardTemplate(card);
  const mapCanvas=document.querySelector('#map-canvas');
  mapCanvas.appendChild(announcement);
}
renderCard(cardData);
toggleFormFields(isMapBlocked);
