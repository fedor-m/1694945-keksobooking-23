const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapCheckboxes = mapFilters.querySelectorAll('input');
const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const inputs = Array.from(mapSelects)
  .concat(Array.from(mapCheckboxes))
  .concat(Array.from(adFieldsets));

function toggleFormFields(isBlocked) {
  if (isBlocked) {
    mapFilters.classList.add('map-filters--disabled');
    adForm.classList.add('ad-form--disabled');
  } else {
    mapFilters.classList.remove('map-filters--disabled');
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelector('#capacity').value = 1;
    adForm
      .querySelector('#capacity')
      .querySelectorAll('option')
      .forEach((o) => {
        o.value !== '1' ? (o.disabled = true) : '';
      });
  }
  inputs.forEach((input) => {
    input.disabled = isBlocked;
  });
}

adForm.querySelector('#type').addEventListener('change', function () {
  const typeToMinPrice = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };
  adForm
    .querySelector('#price')
    .setAttribute('min', typeToMinPrice[this.value]);
  adForm
    .querySelector('#price')
    .setAttribute('placeholder', typeToMinPrice[this.value]);
});

adForm.querySelector('#room_number').addEventListener('change', function () {
  const roomsToCapacity = {
    1: '1',
    2: '2',
    3: '3',
    100: '0',
  };
  const valuesToDisable = {
    1: ['2', '3', '0'],
    2: ['3', '0'],
    3: ['0'],
    100: ['1', '2', '3'],
  };
  adForm.querySelector('#capacity').value = roomsToCapacity[this.value];
  const options = adForm.querySelector('#capacity').querySelectorAll('option');
  const optionsToDisable = valuesToDisable[this.value];
  for (let i = 0; i < options.length; i++) {
    options[i].disabled = false;
    for (let j = 0; j < optionsToDisable.length; j++) {
      if (options[i].value === optionsToDisable[j]) {
        options[i].disabled = true;
      }
    }
  }
});

/*adForm.addEventListener('submit', function(){}) */

export { toggleFormFields };
