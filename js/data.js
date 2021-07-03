import { getRandomNumber, getRandomFloat, getRandomIndex, shuffle } from './utils.js';
/*Константы*/
const NUMBER = 10;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ACTIONS = ['Продаётся', 'Сдаётся в аренду'];
const STATUSES = ['в отличном состоянии', 'в хорошем состоянии', 'в неплохом состоянии'];
const DESCRIPTIONS=['Лучшая цена', 'Тихое место', 'Вид во двор', 'Вид на улицу'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = CHECKINS.slice();
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LATMIN = 35.65000;
const LATMAX = 35.70000;
const LNGMIN = 139.70000;
const LNGMAX = 139.80000;
/*Создание объекта*/
function createAnnouncement(index) {
  return {
    author: {
      avatar: index < 10 ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`,
    },
    location: {
      lat: getRandomFloat(LATMIN, LATMAX, 5),
      lng: getRandomFloat(LNGMIN, LNGMAX, 5),
    },
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
      description: `Жильё ${STATUSES[getRandomIndex(STATUSES)]} с удобствами! ${ DESCRIPTIONS[getRandomIndex(DESCRIPTIONS)]}`,
      photos: shuffle(PHOTOS),
    },
  };
}
function generateAnnouncements() {
  return new Array(NUMBER).fill(null).map((_, i) => createAnnouncement(i+1));
}
export { generateAnnouncements };
