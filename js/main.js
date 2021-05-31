function getRandomNumber(min, max) {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
    return -1;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max, exp) {
  if (isNaN(min) || isNaN(max) || isNaN(exp) || min < 0 || min >= max) {
    return -1;
  }
  return parseFloat(Math.random() * (max - min + Math.pow(10, -exp)).toFixed(exp)) + min;
}
getRandomNumber(1, 10);
getRandomFloat(1.1, 1.2, 4);
//Источник — https://www.w3schools.com/js/js_random.asp с небольшой правкой
