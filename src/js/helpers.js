// FUNCTION: fetching api data
export const fetchApiData = async () => {
  const response = await fetch('data/dino.json');
  // eslint-disable-next-line no-return-await
  return await response.json();
};

// FUNCTION: if it's a dinosaur
export const isDinosaur = ({ species }) =>
  species !== 'human' && species !== 'Pigeon';

// FUNCTION: get ramdom fact
export const getRandomFact = (factsArray) =>
  factsArray[Math.floor(Math.random() * factsArray.length)];
