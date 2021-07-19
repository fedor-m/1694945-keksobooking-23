const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];
const headerPreview = document.querySelector('.ad-form-header__preview')
  .children[0];
const housingPreview = document.querySelector('.ad-form__photo');
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

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

function readAvatar(e) {
  const file = e.target.files[0];
  const preview = headerPreview;
  loadPreview(file, preview);
}

function readPhoto(e) {
  const file = e.target.files[0];
  let preview;
  if (housingPreview.children.length === 0) {
    preview = document.createElement('img');
    preview.setAttribute('width', 70);
    preview.setAttribute('height', 70);
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

export { readAvatar, readPhoto, resetAvatar, resetPhoto };
