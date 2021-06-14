import {NUMBER, TYPES, ACTIONS, STATUSES, DESCRIPTIONS, CHECKINS, CHECKOUTS, FEATURES, PHOTOS, LATMIN, LATMAX, LNGMIN, LNGMAX} from './utils.js';
import {getRandomNumber, getRandomFloat, getRandomIndex} from './utils.js';
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  array.length = getRandomNumber(1, array.length);
  return array;
}
//Источник — https://learn.javascript.ru/task/shuffle с небольшой правкой

/*Создание объекта*/
function createAnnouncement(index) {
  return {
    author: {
      avatar: index < 10 ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`,
    },
    location: {
      lat: getRandomFloat(LATMIN, LATMAX, 5),
      lng: getRandomFloat(LNGMIN, LNGMAX, 5),
    },//адрес
    offer: {
      title: `${ACTIONS[getRandomIndex(ACTIONS)]} жильё в центре Токио!`,
      address: `${getRandomFloat(LATMIN, LATMAX, 5)},${getRandomFloat(LNGMIN, LNGMAX, 5)}`,
      price: getRandomNumber(100000, 1000000),
      type: TYPES[getRandomIndex(TYPES)],
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(1, 4),
      checkIn: CHECKINS[getRandomIndex(CHECKINS)],
      checkOut: CHECKOUTS[getRandomIndex(CHECKOUTS)],
      features: shuffle(FEATURES),
      description: `Жильё ${STATUSES[getRandomIndex(STATUSES)]} с удобствами! ${ DESCRIPTIONS[getRandomIndex(DESCRIPTIONS)]}`,//описание
      photos: shuffle(PHOTOS),
    },
  };
}
function generateAnnouncements() {
  return new Array(NUMBER).fill(null).map((_, i) => createAnnouncement(i+1));
}
export {generateAnnouncements};
