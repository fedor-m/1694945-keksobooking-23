import { createMarker } from './map.js';

const DEFAULT = 'any';
const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = filtersForm.querySelector('#housing-features');

function getHousingType(cardData) {
  return cardData.offer.type === DEFAULT ? true : (cardData.offer.type === housingType.value);
}

function getHousingPrice(cardData) {
  const MIN_PRICE = 10000;
  const MAX_PRICE = 50000;
  const priceLimit = {
    any: false,
    middle: cardData.offer.price >= MIN_PRICE && cardData.offer.price <= MAX_PRICE,
    low: cardData.offer.price < MIN_PRICE,
    high: cardData.offer.price >= MAX_PRICE,
  };
  return priceLimit[housingPrice.value];
}

function getHousingRooms(cardData) {
  return cardData.offer.rooms === DEFAULT ? true : (cardData.offer.rooms.toString() === housingRooms.value);
}

function getHousingGuests(cardData) {
  return cardData.offer.guests === DEFAULT ? true : (cardData.offer.guests.toString() === housingGuests.value);
}

function getHousingFeatures(cardData) {
  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');
  const checkedList = [];
  checkedFeatures.forEach((input) => {
    checkedList.push(input.value);
  });
  if (checkedList.length <= 0) {
    return false;
  }
  const filterFeatures = cardData.offer.features.filter((feature)=>checkedList.includes(feature));
  return filterFeatures.length >= checkedList.length;
}

function onFiltersFormChange() {
  getHousingType();
  getHousingPrice();
  getHousingRooms();
  getHousingGuests();
  getHousingFeatures();
}

function getFiltersData(announcements){
  const ANNOUNCEMENTS_COUNT = 10;
  announcements.slice(0, ANNOUNCEMENTS_COUNT).forEach((announcement) => {
    createMarker(announcement);
  });
  /*
  announcements.filter((a)=>onFiltersFormChange(a));
  announcements.
    filter((a)=>getHousingType(a)).
    filter((a)=>getHousingPrice(a)).
    filter((a)=>getHousingRooms(a)).
    filter((a)=>getHousingGuests(a)).
    filter((a)=>getHousingFeatures(a))
    Конструкция возвращает false изначально, соответственно — пустой массив
    */

}

function initFilters() {
  filtersForm.addEventListener('change', onFiltersFormChange);
}

function resetFilters() {
  const selectFilters = filtersForm.querySelectorAll('select');
  const featuresFilters = housingFeatures.querySelectorAll('input');
  selectFilters.forEach((select) => {
    select.value = 'any';
  });
  featuresFilters.forEach((input) => {
    input.checked = false;
  });
}

export { initFilters,  getFiltersData, resetFilters};
