const DEFAULT = 'any';
const filtersForm=document.querySelector('.map__filters');
const housingType=filtersForm.querySelector('#housing-type');
const housingPrice=filtersForm.querySelector('#housing-price');
const housingRooms=filtersForm.querySelector('#housing-rooms');
const housingGuests=filtersForm.querySelector('#housing-guests');
const housingFeatures=filtersForm.querySelector('#housing-features');
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
function getHousingType(cardData){
  return !cardData.offer.type ? DEFAULT : cardData.offer.type;
}

function getHousingPrice(cardData){
  return !cardData.offer.price ? DEFAULT : cardData.offer.price;
}

function getHousingRooms(cardData)
{
  return !cardData.offer.rooms ? DEFAULT : cardData.offer.price;
}

function getHousingGuests(cardData)
{
  return !cardData.offer.guests ? DEFAULT : cardData.offer.price;
}

function getHousingFeatures(e)
{
  return (e.target.value);
}

function onFiltersFormChange(){
  getHousingType();
  getHousingPrice();
  getHousingRooms();
  getHousingGuests();
  getHousingFeatures();
  //return housingType.value
}

function getFiltersData(announcements){
  //announcements.filter((announcement)=>{})
}

function initFilters(){
  filtersForm.addEventListener('change',onFiltersFormChange);
}

export { initFilters };
