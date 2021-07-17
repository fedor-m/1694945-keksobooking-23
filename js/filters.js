const DEFAULT = 'any';
const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
//const housingFeatures=filtersForm.querySelector('#housing-features');
/*
  Нужно ли создавать большой объект?
  const filters = {
    type: '',
    price: 0,
    rooms: 0,
    guests: 0,
    features: {
      wifi: '',
      dishwasher: '',
      parking: '',
      washer: '',
      elevator: '',
      conditioner: '',
    }
  }
*/
function getHousingType(cardData) {
  return cardData.offer.type === DEFAULT ? true : (cardData.offer.type === housingType.value);
}

function getHousingPrice(cardData) {
  const priceLimit = {
    any: cardData.offer.type,
    middle: cardData.offer.price >= 10000 && cardData.offer.price <= 50000,
    low: cardData.offer.price < 10000,
    high: cardData.offer.price >= 50000,
  };
  return priceLimit[housingPrice.value];
}

function getHousingRooms(cardData) {
  return cardData.offer.rooms === DEFAULT ? true : (cardData.offer.rooms.toString() === housingRooms.value);
}

function getHousingGuests(cardData) {
  return cardData.offer.guests === DEFAULT ? true : (cardData.offer.guests.toString() === housingGuests.value);
}

/*function getHousingFeatures(cardData) {
  const checked = housingFeatures.querySelectorAll('input:checked');
  return checked.length === 0 ? true : '';
}*/

function onFiltersFormChange() {
  getHousingType();
  getHousingPrice();
  getHousingRooms();
  getHousingGuests();
  //getHousingFeatures();
  //return housingType.value
}

function getFiltersData(announcements){
  announcements.filter(onFiltersFormChange);
}

function initFilters() {
  filtersForm.addEventListener('change', onFiltersFormChange);
}

export { initFilters,  getFiltersData};
