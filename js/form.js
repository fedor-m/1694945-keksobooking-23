const mapFilters = document.querySelector('.map__filters');
const mapSelects = mapFilters.querySelectorAll('select');
const mapCheckboxes = mapFilters.querySelectorAll('input');
const adForm = document.querySelector('.ad-form');
const adFieldsets = adForm.querySelectorAll('fieldset');
const inputs = Array.from(mapSelects).concat(Array.from(mapCheckboxes)).concat(Array.from(adFieldsets));

function toggleFormFields(isBlocked) {
  if (isBlocked) {
    mapFilters.classList.add('map-filters--disabled');
    adForm.classList.add('ad-form--disabled');
  } else {
    mapFilters.classList.remove('map-filters--disabled');
    adForm.classList.remove('ad-form--disabled');
  }
  inputs.forEach((input) => {
    input.disabled = isBlocked;
  });
}

adForm.querySelector('#type').addEventListener('change', function () {
  const typeToMinPrice={
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000
  };
  adForm.querySelector('#price').setAttribute('min',typeToMinPrice[this.value]);
  adForm.querySelector('#price').setAttribute('placeholder',typeToMinPrice[this.value]);
});

export { toggleFormFields };
