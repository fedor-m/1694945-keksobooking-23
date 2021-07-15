const addressToLoad = 'https://23.javascript.pages.academy/keksobooking/data';
const addressToSend = 'https://23.javascript.pages.academy/keksobooking';

function loadAnnouncements(onSuccess, onFail) {
  return fetch(addressToLoad, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((response) => {
      response.ok ? onSuccess(response.json()) : onFail();
    })
    .catch(() => {
      onFail();
    });
}

function sendAnnouncement(onSuccess, onFail, onFinal, announcement)
{
  return fetch(addressToSend, {
    method: 'POST',
    body: announcement,
  })
    .then((response) => {
      response.ok ? onSuccess() : onFail();
    })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      onFinal();
    });
}

export { loadAnnouncements, sendAnnouncement };
