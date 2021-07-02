import { generateAnnouncements } from './data.js';
const newAnnouncements = generateAnnouncements();
const demo=newAnnouncements[0];
const card=document.querySelector('#card').content;
const newCard=card.cloneNode(true);
const typeToName = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
newCard.querySelector('.popup__avatar').setAttribute('src',demo.author);
newCard.querySelector('.popup__title').textContent = demo.offer.title;
newCard.querySelector('.popup__text--address').textContent = demo.offer.address;
newCard.querySelector('.popup__text--price').textContent = `${demo.offer.price} ₽ за ночь`;
newCard.querySelector('.popup__type').textContent=typeToName[demo.offer.type];
newCard.querySelector('.popup__text--capacity').textContent =` ${demo.offer.rooms} комната(ы) для размещения ${demo.offer.guests} гостя(ей)`;
newCard.querySelector('.popup__text--time').textContent = `Заезд после ${demo.offer.checkIn}, выезд до ${demo.offer.checkOut}`;
newCard.querySelector('.popup__description').textContent = demo.offer.description;
newCard.querySelector('.popup__features').innerHTML = '';
demo.offer.features.forEach((feature) => {
  const li=document.createElement('li');
  li.classList.add('popup__feature');
  li.classList.add(`popup__feature--${feature}`);
  newCard.querySelector('.popup__features').appendChild(li);
});
newCard.querySelector('.popup__photos').innerHTML = '';
demo.offer.photos.forEach((photo) => {
  const img=document.createElement('img');
  img.setAttribute('src', photo);
  img.classList.add('popup__photo');
  img.setAttribute('width', 45);
  img.setAttribute('height', 40);
  img.setAttribute('alt', 'Фотография жилья');
  newCard.querySelector('.popup__photos').appendChild(img);
});
const mapCanvas=document.querySelector('#map-canvas');
mapCanvas.appendChild(newCard);
