var number = 0;
const getNumber = () => {
  return number;
};
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
const genNumber = () => {
  number = getRandomInt(1, 100);
};

export { getNumber, genNumber };
