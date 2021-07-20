import { loadAnnouncements } from './server.js';
import { onLoadSuccess, onLoadError } from './main.js';

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = [...filtersForm.querySelectorAll('[type="checkbox"]')];
const filtersFormElements = [...filtersForm.children];
const housingTypeValues = {
  any: (value) => value,
  bungalow: (value) => value === 'bungalow',
  hotel: (value) => value === 'hotel',
  house: (value) => value === 'house',
  flat: (value) => value === 'flat',
  palace: (value) => value === 'palace',
};
const priceValues = {
  any: (value) => value,
  middle: (value) => value >= MIN_PRICE && value <= MAX_PRICE,
  low: (value) => value <= MIN_PRICE,
  high: (value) => value >= MAX_PRICE,
};
const roomsValues = {
  any: (value) => value,
  1: (value) => value === 1,
  2: (value) => value === 2,
  3: (value) => value === 3,
};
const guestsValues = {
  any: (value) => value,
  0: (value) => value === 0,
  1: (value) => value === 1,
  2: (value) => value === 2,
};

function filterByHousingType(sortItem) {
  const type = sortItem.offer.type;
  return housingTypeValues[housingType.value](type);
}

function filterByPrice(sortItem) {
  const price = sortItem.offer.price;
  return priceValues[housingPrice.value](price);
}

function filterByRooms(sortItem) {
  const rooms = sortItem.offer.rooms;
  return roomsValues[housingRooms.value](rooms);
}

function filterByGuests(sortItem) {
  const guests = sortItem.offer.guests;
  return guestsValues[housingGuests.value](guests);
}

function filterByFeatures(sortItem) {
  const features = sortItem.offer.features;
  const selectedFeatures = housingFeatures.filter((input) => input.checked);
  return selectedFeatures.every(
    (feature) => features && features.includes(feature.value),
  );
}

function getFiltersData(announcements) {
  return announcements.filter(
    (announcement) =>
      filterByHousingType(announcement) &&
      filterByPrice(announcement) &&
      filterByRooms(announcement) &&
      filterByGuests(announcement) &&
      filterByFeatures(announcement),
  );
}

function disableFilters() {
  filtersForm.classList.add('map-filters--disabled');
  filtersFormElements.forEach((element) => {
    element.disabled = true;
  });
}
function enableFilters() {
  filtersForm.classList.remove('map-filters--disabled');
  filtersFormElements.forEach((element) => {
    element.disabled = false;
  });
}

function resetFilters() {
  filtersFormElements.forEach((element) => {
    element.value = 'any';
  });
  housingFeatures.forEach((element) => {
    element.checked = false;
  });
  loadAnnouncements(onLoadSuccess, onLoadError);
}

export {
  getFiltersData,
  filtersForm,
  disableFilters,
  enableFilters,
  resetFilters
};
