import { generateAnnouncements } from './data.js';
import { generateCardTemplate } from './card.js';
import { toggleFormFields } from './form.js';
const newAnnouncements = generateAnnouncements();
const cardData=newAnnouncements[0];
const map=document.querySelector('#map-canvas');
const isMapBlocked=map.children.length===0;
function renderCard(card){
  const announcement=generateCardTemplate(card);
  const mapCanvas=document.querySelector('#map-canvas');
  mapCanvas.appendChild(announcement);
}
renderCard(cardData);
toggleFormFields(isMapBlocked);
