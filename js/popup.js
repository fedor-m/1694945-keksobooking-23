import { generateAnnouncements } from './data.js';
const newAnnouncements = generateAnnouncements();
const demo=newAnnouncements[0];
const card=document.querySelector('#card').content;
const newCard=card.cloneNode(true);
const { avatar } = demo.author;
const { title, address, price, type, rooms, guests, checkIn, checkOut, description, features, photos } = demo.offer;
newCard.querySelector('.popup__avatar').setAttribute('src',avatar);
newCard.querySelector('.popup__title').textContent = title;
newCard.querySelector('.popup__text--address').textContent = address;
newCard.querySelector('.popup__text--price').textContent = `${price} ₽ за ночь`;
switch(type)
{
  case 'palace':
    newCard.querySelector('.popup__type').textContent = 'Дворец';
    break;
  case 'flat':
    newCard.querySelector('.popup__type').textContent = 'Квартира';
    break;
  case 'house':
    newCard.querySelector('.popup__type').textContent = 'Дом';
    break;
  case 'bungalow':
    newCard.querySelector('.popup__type').textContent = 'Бунгало';
    break;
  case 'hotel':
    newCard.querySelector('.popup__type').textContent = 'Отель';
    break;
}
newCard.querySelector('.popup__text--capacity').textContent =` ${rooms} комната(ы) для размещения ${guests} гостя(ей)`;
newCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkIn}, выезд до ${checkOut}`;
newCard.querySelector('.popup__description').textContent = description;
newCard.querySelector('.popup__features').innerHTML = '';
features.forEach((feature)=>{
  const li=document.createElement('li');
  li.classList.add('popup__feature');
  li.classList.add(`popup__feature--${feature}`);
  newCard.querySelector('.popup__features').appendChild(li);
});
newCard.querySelector('.popup__photos').innerHTML = '';
photos.forEach((photo)=> {
  const img=document.createElement('img');
  img.setAttribute('src',photo);
  img.classList.add('popup__photo');
  img.setAttribute('width',45);
  img.setAttribute('height',40);
  img.setAttribute('alt', 'Фотография жилья');
  newCard.querySelector('.popup__photos').appendChild(img);
});
const mapCanvas=document.querySelector('#map-canvas');
mapCanvas.appendChild(newCard);
