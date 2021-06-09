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
/*Функции*/
/*Получение числа*/
function getRandomNumber(min, max) {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
    return 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max, exp) {
  if (isNaN(min) || isNaN(max) || isNaN(exp) || min < 0 || min >= max) {
    return 0;
  }
  return parseFloat(Math.random() * (max - min + Math.pow(10, -exp)).toFixed(exp)) + min;
}
//Источник — https://www.w3schools.com/js/js_random.asp с небольшой правкой
function getRandomIndex(array) {
  return getRandomNumber(0, array.length - 1);
}
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
      avatar: index < 9 ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`,
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
generateAnnouncements();
