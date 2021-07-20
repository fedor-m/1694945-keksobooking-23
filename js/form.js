import { map, CENTER, mainMarker, MIN_ZOOM } from './map.js';
import { sendAnnouncement } from './server.js';
import { resetFilters } from './filters.js';
import { onReadAvatar, onReadPhoto, resetAvatar, resetPhoto } from './photo.js';

const body = document.body;
const MIN_GUESTS = 1;
const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
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

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = [...capacity.children];
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');
const submit = adForm.querySelector('.ad-form__submit');
const reset = adForm.querySelector('.ad-form__reset');
const avatar = adForm.querySelector('#avatar');
const photo = adForm.querySelector('#images');
const required = adForm.querySelectorAll('input:required');
const adFormElements = [...adForm.children];

function initializeCapacity() {
  capacity.value = String(MIN_GUESTS);
  capacityOptions.forEach((option) => {
    option.removeAttribute('selected');
    option.value !== capacity.value
      ? (option.disabled = true)
      : (option.disabled = false);
  });
}

function disableFormElements() {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.disabled = true;
  });
}

function enableFormElements() {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((element) => {
    element.disabled = false;
  });
  initializeCapacity();
}

function onChangeType() {
  const price = adForm.querySelector('#price');
  price.setAttribute('min', typeToMinPrice[this.value]);
  price.setAttribute('placeholder', typeToMinPrice[this.value]);
}
type.addEventListener('change', onChangeType);

function onSetCapacity() {
  const optionsToDisable = valuesToDisable[this.value];
  capacity.value = roomsToCapacity[this.value];
  for (let i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = false;
    capacityOptions[i].removeAttribute('selected');
    for (let j = 0; j < optionsToDisable.length; j++) {
      if (capacityOptions[i].value === optionsToDisable[j]) {
        capacityOptions[i].disabled = true;
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

function onCheckRequiredInputs() {
  adForm.classList.add('ad-form--validated');
}

function onResetForm() {
  adForm.reset();
  adForm.classList.remove('ad-form--validated');
  resetAvatar();
  resetPhoto();
  initializeCapacity();
  required.forEach((input) => {
    input.removeEventListener('change', onCheckRequiredInputs);
  });
  map.setView(CENTER, MIN_ZOOM);
  mainMarker.setLatLng(CENTER);
  resetFilters();
}
reset.addEventListener('click', onResetForm);

function onClosePopup() {
  const divSuccess = document.querySelector('div.success');
  const divError = document.querySelector('div.error');
  if (divSuccess) {
    divSuccess.remove();
  } else if (divError) {
    divError.remove();
  }
  document.removeEventListener('click', onClosePopup);
  document.removeEventListener('keyup', onClosePopup);
}

function onPressButton(e) {
  e.key === 'Escape' ? onClosePopup() : '';
}

function onUploadSuccess() {
  const templateSuccess = document.querySelector('#success').content.cloneNode(true);
  onResetForm();
  body.appendChild(templateSuccess);
}

function onUploadError() {
  const templateError = document.querySelector('#error').content.cloneNode(true);
  body.appendChild(templateError);
}

function onUploadFinal() {
  document.addEventListener('click', onClosePopup);
  document.addEventListener('keyup', onPressButton);
}

avatar.addEventListener('change', onReadAvatar);
photo.addEventListener('change', onReadPhoto);

function onSubmitForm(e) {
  e.preventDefault();
  const formData = new FormData(adForm);
  sendAnnouncement(onUploadSuccess, onUploadError, onUploadFinal, formData);
}

submit.addEventListener('click', onCheckRequiredInputs);
adForm.addEventListener('submit', onSubmitForm);

export { onUploadFinal, disableFormElements, enableFormElements };
