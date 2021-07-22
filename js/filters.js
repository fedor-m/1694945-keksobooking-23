import { renderMarkers } from './map.js';

const MAX_ANNOUNCEMENTS = 10;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const ANY = 'any';
const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = [...filtersForm.querySelectorAll('[type="checkbox"]')];
const filtersFormElements = [...filtersForm.children];
let defaultMarkers = [];

function getMarkers(markers) {
  defaultMarkers = markers;
}

function filterByHousingType(sortItem) {
  const type = sortItem.offer.type;
  const value = housingType.value;
  return value === ANY ? type : type === value;
}

function filterByPrice(sortItem) {
  const price = sortItem.offer.price;
  const value = housingPrice.value;
  const priceLimit = {
    any: price,
    middle: price >= MIN_PRICE && price <= MAX_PRICE,
    low: price < MIN_PRICE,
    high: price >= MAX_PRICE,
  };
  return priceLimit[value];
}

function filterByRooms(sortItem) {
  const rooms = sortItem.offer.rooms;
  const value = housingRooms.value;
  return value === ANY ? rooms : rooms.toString() === value;
}

function filterByGuests(sortItem) {
  const guests = sortItem.offer.guests;
  const value = housingGuests.value;
  return value === ANY ? guests : guests.toString() === value;
}

function filterByFeatures(sortItem) {
  const features = sortItem.offer.features;
  const selectedFeatures = housingFeatures.filter((input) => input.checked);
  return selectedFeatures.every(
    (feature) => features && features.includes(feature.value),
  );
}

function getFiltersData(announcements) {
  const filteredData = [];
  for (let i = 0; i < announcements.length; i++) {
    const announcement = announcements[i];
    const filteredByType = filterByHousingType(announcement);
    const filteredByPrice = filterByPrice(announcement);
    const filteredByRooms = filterByRooms(announcement);
    const filteredByGuests = filterByGuests(announcement);
    const filteredByFeatures = filterByFeatures(announcement);
    if (
      filteredByType &&
      filteredByPrice &&
      filteredByRooms &&
      filteredByGuests &&
      filteredByFeatures
    ) {
      filteredData.push(announcement);
    }
    if (filteredData.length === MAX_ANNOUNCEMENTS) {
      break;
    }
  }
  return filteredData;
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
  filtersForm.reset();
  renderMarkers(defaultMarkers);
}

export {
  getMarkers,
  getFiltersData,
  filtersForm,
  disableFilters,
  enableFilters,
  resetFilters
};
