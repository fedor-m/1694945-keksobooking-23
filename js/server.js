const addressToSend = 'https://23.javascript.pages.academy/keksobooking';
const addressToLoad = `${addressToSend}/data`;

function loadAnnouncements(onSuccess, onFail) {
  return fetch(addressToLoad, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail();
      }
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      onFail();
    });
}

function sendAnnouncement(onSuccess, onFail, onFinal, announcement) {
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
