
/*Функции*/

/*Получение числа*/
function getRandomNumber(min, max) {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
    return 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, exp) {
  if (isNaN(min) || isNaN(max) || isNaN(exp) || min < 0 || min >= max) {
    return 0;
  }
  return parseFloat(Math.random() * (max - min + Math.pow(10, -exp)).toFixed(exp)) + min;
}
//Источник — https://www.w3schools.com/js/js_random.asp с небольшой правкой

//Получение случайного элемента массива
function getRandomIndex(array) {
  return getRandomNumber(0, array.length - 1);
}

//Перемешивание элементов массива
function shuffle(array) {
  const arrNew=array.slice();
  for (let i = arrNew.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrNew[i], arrNew[j]] = [arrNew[j], arrNew[i]];
  }
  arrNew.length = getRandomNumber(1, arrNew.length);
  return arrNew;
}
//Источник — https://learn.javascript.ru/task/shuffle с небольшой правкой
export {getRandomNumber, getRandomFloat, getRandomIndex, shuffle};

