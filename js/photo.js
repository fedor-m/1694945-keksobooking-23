const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];
const headerPreview = document.querySelector('.ad-form-header__preview')
  .children[0];
const housingPreview = document.querySelector('.ad-form__photo');
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const PHOTO_SIZE = 70;


function loadPreview(file, preview) {
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
}

function onReadAvatar(e) {
  const file = e.target.files[0];
  const preview = headerPreview;
  loadPreview(file, preview);
}

function onReadPhoto(e) {
  const file = e.target.files[0];
  let preview;
  if (housingPreview.children.length === 0) {
    preview = document.createElement('img');
    preview.setAttribute('width', PHOTO_SIZE);
    preview.setAttribute('height', PHOTO_SIZE);
    housingPreview.appendChild(preview);
  } else {
    preview = housingPreview.children[0];
  }
  loadPreview(file, preview);
}

function resetAvatar() {
  headerPreview.setAttribute('src', DEFAULT_AVATAR);
}

function resetPhoto() {
  const img = housingPreview.querySelector('img');
  if (img) {
    img.remove();
  }
}

export { onReadAvatar, onReadPhoto, resetAvatar, resetPhoto };
