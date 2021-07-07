const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapCheckboxes = mapFilters.querySelectorAll('input');
const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const inputs = Array.from(mapSelects)
  .concat(Array.from(mapCheckboxes))
  .concat(Array.from(adFieldsets));
const TYPE_TO_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const ROOMS_TO_CAPACITY = {
  1: '1',
  2: '2',
  3: '3',
  100: '0',
};
const VALUES_TO_DISABLE = {
  1: ['2', '3', '0'],
  2: ['3', '0'],
  3: ['0'],
  100: ['1', '2', '3'],
};
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');

function toggleFormFields(isBlocked) {
  if (isBlocked) {
    mapFilters.classList.add('map-filters--disabled');
    adForm.classList.add('ad-form--disabled');
  } else {
    mapFilters.classList.remove('map-filters--disabled');
    adForm.classList.remove('ad-form--disabled');
    capacity.value = 1;
    capacity.querySelectorAll('option').forEach((o) => {
      o.value !== '1' ? (o.disabled = true) : '';
    });
  }
  inputs.forEach((input) => {
    input.disabled = isBlocked;
  });
}

function onChangeType() {
  const price = adForm.querySelector('#price');
  price.setAttribute('min', TYPE_TO_MIN_PRICE[this.value]);
  price.setAttribute('placeholder', TYPE_TO_MIN_PRICE[this.value]);
}
type.addEventListener('change', onChangeType);

function onSetCapacity() {
  const options = capacity.querySelectorAll('option');
  const optionsToDisable = VALUES_TO_DISABLE[this.value];
  capacity.value = ROOMS_TO_CAPACITY[this.value];
  for (let i = 0; i < options.length; i++) {
    options[i].disabled = false;
    for (let j = 0; j < optionsToDisable.length; j++) {
      if (options[i].value === optionsToDisable[j]) {
        options[i].disabled = true;
      }
    }
  }
}
roomNumber.addEventListener('change', onSetCapacity);

function onSetTime(e) {
  const id = e.target.id;
  const value = e.target.value;
  id === 'timein' ? (checkOut.value = value) : (checkIn.value = value);
}
checkIn.addEventListener('change', onSetTime);
checkOut.addEventListener('change', onSetTime);
/*adForm.addEventListener('submit', function(){}) */

export { toggleFormFields };
