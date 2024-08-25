function getMinMax(str) {
  let numbers = str
    .split(' ')
    .map(item => parseFloat(item))
    .filter(item => !isNaN(item));


  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}
