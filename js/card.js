const TYPE_TO_NAME = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
function generateCardTemplate(cardData) {
  const card = document.querySelector('#card').content;
  const cardTemplate = card.cloneNode(true);
  const photos = cardData.offer.photos;
  const features = cardData.offer.features;
  //console.log(cardData);
  cardTemplate
    .querySelector('.popup__avatar')
    .setAttribute('src', cardData.author.avatar);
  cardTemplate.querySelector('.popup__title').textContent =
    cardData.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent =
    cardData.offer.address;
  cardTemplate.querySelector(
    '.popup__text--price',
  ).textContent = `${cardData.offer.price} ₽ за ночь`;
  cardTemplate.querySelector('.popup__type').textContent =
    TYPE_TO_NAME[cardData.offer.type];
  cardTemplate.querySelector(
    '.popup__text--capacity',
  ).textContent = ` ${cardData.offer.rooms} комната(ы) для размещения ${cardData.offer.guests} гостя(ей)`;
  cardTemplate.querySelector(
    '.popup__text--time',
  ).textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  cardTemplate.querySelector('.popup__description').textContent =
    cardData.offer.description;
  cardTemplate.querySelector('.popup__features').innerHTML = '';
  if (features) {
    cardTemplate.querySelector('.popup__features').innerHTML = features
      .map(
        (feature) =>
          `<li class='popup__feature popup__feature--${feature}'></li>`,
      )
      .join('');
  }
  cardTemplate.querySelector('.popup__photos').innerHTML = '';
  if (photos) {
    photos.forEach((photo) => {
      const img = document.createElement('img');
      img.setAttribute('src', photo);
      img.classList.add('popup__photo');
      img.setAttribute('width', 45);
      img.setAttribute('height', 40);
      img.setAttribute('alt', 'Фотография жилья');
      cardTemplate.querySelector('.popup__photos').appendChild(img);
    });
  }
  return cardTemplate;
}
export { generateCardTemplate };
