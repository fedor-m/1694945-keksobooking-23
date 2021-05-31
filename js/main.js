const numbers = [];
function getRandomNumber(min, max) {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) { return false; }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min, max, exp) {
  if (min < 0 || isNaN(min) || isNaN(max) || isNaN(exp) || min < 0 || min >= max) { return false; }
  return parseFloat(Math.random() * (max - min + Math.pow(10, -exp)).toFixed(exp)) + min;
}
numbers.push(getRandomNumber(1, 10));
numbers.push(getRandomFloat(1.1, 1.2, 4));
//Источник — https://www.w3schools.com/js/js_random.asp с небольшой правкой
