import { map, CENTER, mainMarker, MIN_ZOOM} from './map.js';
import { sendAnnouncement } from './server.js';

const body = document.body;
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
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');
const reset = adForm.querySelector('.ad-form__reset');
const adFormElements = [...adForm.children];

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
}

function onChangeType() {
  const price = adForm.querySelector('#price');
  price.setAttribute('min', typeToMinPrice[this.value]);
  price.setAttribute('placeholder', typeToMinPrice[this.value]);
}
type.addEventListener('change', onChangeType);

function onSetCapacity() {
  const capacity = adForm.querySelector('#capacity');
  const options = capacity.querySelectorAll('option');
  const optionsToDisable = valuesToDisable[this.value];
  capacity.value = roomsToCapacity[this.value];
  for (let i = 0; i < options.length; i++) {
    options[i].disabled = false;
    options[i].removeAttribute('selected');
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

function resetForm() {
  adForm.reset();
  //initializeCapacity();
  map.setView(CENTER, MIN_ZOOM);
  mainMarker.setLatLng(CENTER);
}
reset.addEventListener('click', resetForm);

function closePopup() {
  const divSuccess = document.querySelector('div.success');
  const divError = document.querySelector('div.error');
  if(divSuccess)
  {
    divSuccess.remove();
  }
  else if(divError)
  {
    divError.remove();
  }
  document.removeEventListener('click', closePopup);
  document.removeEventListener('keyup', closePopup);
}

function pressButton(e) {
  e.key === 'Escape' ? closePopup() : '';
}

function onUploadSuccess()
{
  const templateSuccess = document.querySelector('#success').content;
  resetForm();
  body.appendChild(templateSuccess);
}

function onUploadError(){
  const templateError = document.querySelector('#error').content;
  body.appendChild(templateError);
}

function onUploadFinal(){
  document.addEventListener('click', closePopup);
  document.addEventListener('keyup', pressButton);
}

function submitForm(e) {
  e.preventDefault();
  const formData = new FormData(adForm);
  sendAnnouncement(onUploadSuccess, onUploadError, onUploadFinal, formData);
}

adForm.addEventListener('submit', submitForm);

export { onUploadFinal, disableFormElements, enableFormElements };
