/*Константы*/
const NUMBER = 10;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ACTIONS = ['Продаётся', 'Сдаётся в аренду'];
const TITLES = ['дворец', 'квартира', 'дом', 'бунгало', 'номер в гостинице'];
const STATUSES = ['в отличном состоянии', 'в хорошем состоянии', 'в неплохом состоянии'];
const DESCRIPTIONS=['Лучшая цена', 'Тихое место', 'Вид во двор', 'Вид на улицу'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = CHECKINS.slice();
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
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
  const newArray = array.map((a) => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map((a) => a.value);
  newArray.length = getRandomNumber(1, array.length);
  return newArray;
}
//Источник — https://stackoverflow.com/posts/46545530/revisions с небольшой правкой

/*Создание объекта*/
function createAnnouncement() {
  const announcement = {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`,
    }, //автор и его аватар img/avatars/user{{xx}}.png
    location: {
      lat: getRandomFloat(LATMIN, LATMAX, 5), lng: getRandomFloat(LNGMIN, LNGMAX, 5),
    },//адрес
    offer: {
      title: '', //заголовок,
      address: '',//адрес
      price: getRandomNumber(100000, 1000000), //стоимость
      type: TYPES[getRandomIndex(TYPES)], //тип жилья
      rooms: getRandomNumber(1, 4), //количество комнат
      guests: getRandomNumber(1, 4), //количество гостей
      checkIn: CHECKINS[getRandomIndex(CHECKINS)], //время заезда
      checkOut: CHECKOUTS[getRandomIndex(CHECKOUTS)],//время отъезда
      features: shuffle(FEATURES),//услуги и удобства
      description: '',//описание
      photos: shuffle(PHOTOS),//фото
    },
    setAddress: function () {
      return Object.values(this.location).join(',');
    },
    setTitle: function () {
      return `${ACTIONS[getRandomIndex(ACTIONS)]} ${TITLES[TYPES.indexOf(this.offer.type)]} в центре Токио!`;
    },
    setDescription: function () {
      return `Жильё ${STATUSES[getRandomIndex(STATUSES)]} с удобствами! ${ DESCRIPTIONS[getRandomIndex(DESCRIPTIONS)]}`;
    },
  };
  announcement.offer.address = announcement.setAddress();
  announcement.offer.title = announcement.setTitle();
  announcement.offer.description = announcement.setDescription();
  return announcement;
}
/*const announcements=new Array(NUMBER).fill(null).map(() => createAnnouncement());
console.log(announcements);*/
function generateAnnouncements() { return new Array(NUMBER).fill(null).map(() => createAnnouncement()); }
generateAnnouncements();
