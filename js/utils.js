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
export {NUMBER, TYPES, ACTIONS, STATUSES, DESCRIPTIONS, CHECKINS, CHECKOUTS, FEATURES, PHOTOS, LATMIN, LATMAX, LNGMIN, LNGMAX};
export {getRandomNumber, getRandomFloat, getRandomIndex};

