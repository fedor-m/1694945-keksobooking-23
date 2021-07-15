const typeToName = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

function createPhoto(photo) {
  const img = document.createElement('img');
  img.setAttribute('src', photo);
  img.classList.add('popup__photo');
  img.setAttribute('width', 45);
  img.setAttribute('height', 40);
  img.setAttribute('alt', 'Фотография жилья');
  return img;
}

function generateCardTemplate(cardData) {
  const card = document.querySelector('#card').content;
  const cardTemplate = card.cloneNode(true);
  const dataPhotos = cardData.offer.photos;
  const dataFeatures = cardData.offer.features;
  const avatar = cardTemplate.querySelector('.popup__avatar');
  const title = cardTemplate.querySelector('.popup__title');
  const address = cardTemplate.querySelector('.popup__text--address');
  const price = cardTemplate.querySelector('.popup__text--price');
  const type = cardTemplate.querySelector('.popup__type');
  const capacity = cardTemplate.querySelector('.popup__text--capacity');
  const time = cardTemplate.querySelector('.popup__text--time');
  const description = cardTemplate.querySelector('.popup__description');
  const features = cardTemplate.querySelector('.popup__features');
  const photos = cardTemplate.querySelector('.popup__photos');
  avatar.setAttribute('src', cardData.author.avatar);
  title.textContent = cardData.offer.title;
  address.textContent = cardData.offer.address;
  price.textContent = `${cardData.offer.price} ₽ за ночь`;
  type.textContent = typeToName[cardData.offer.type];
  capacity.textContent = ` ${cardData.offer.rooms} комната(ы) для размещения ${cardData.offer.guests} гостя(ей)`;
  time.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  description.textContent = cardData.offer.description;
  features.innerHTML = '';
  if (dataFeatures) {
    features.innerHTML = dataFeatures
      .map(
        (feature) =>
          `<li class='popup__feature popup__feature--${feature}'></li>`,
      )
      .join('');
  }
  photos.innerHTML = '';
  if (dataPhotos) {
    dataPhotos.forEach((photo) => {
      const image=createPhoto(photo);
      cardTemplate.querySelector('.popup__photos').appendChild(image);
    });
  }
  return cardTemplate;
}

export { generateCardTemplate };
