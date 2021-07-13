function loadAnnouncements() {
  return fetch('https://23.javascript.pages.academy/keksobooking/data', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((response) => response.json());
}
export { loadAnnouncements };
