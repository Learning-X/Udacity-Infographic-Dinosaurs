import { fetchApiData, isDinosaur, getRandomFact } from './helpers';
import { DinoConstructor, HumanConstructor, TileConstructor } from './model';
// Create Dino Constructor

// FUNCTION: create dinosaurs Objects
const getDinoObjects = async () => {
  const { Dinos } = await fetchApiData();
  const dinosArrObjs = Dinos.map((dinosaur) => new DinoConstructor(dinosaur));
  // console.log(dinosArrObjs);
  return dinosArrObjs;
};

// FUNCTION: get data & create human object
const getHumanObject = () => {
  const form = new FormData(document.getElementById('dino-compare'));
  const species = 'human';
  const name = form.get('name');
  const height = parseInt(
    Number(form.get('inches')) + Number(form.get('feet')) * 12
  );
  const weight = parseInt(form.get('weight'));
  const diet = form.get('diet');

  const humanObject = new HumanConstructor({
    name,
    height,
    weight,
    diet,
    species,
  });
  // console.log(humanObject);
  return humanObject;
};

// FUNCTION: Generate Tiles
const generateTiles = async (dinosArrObjs, humanObject) => {
  const animalObjects = Object.values(dinosArrObjs);
  animalObjects.splice(4, 0, humanObject);

  // create tiles object
  const tilesArray = [];
  animalObjects.forEach((animalObject) => {
    tilesArray.push(new TileConstructor(animalObject));
  });

  // gatter all facts
  tilesArray.forEach((tile) => {
    const factsArray = [];
    if (isDinosaur(tile)) {
      factsArray.push(
        tile.fact,
        tile.compareDiet(tile.animalObject, humanObject),
        tile.compareHeight(tile.animalObject, humanObject),
        tile.compareWeight(tile.animalObject, humanObject)
      );
      tile.facts = factsArray;
    }
  });

  return tilesArray;
};

// Remove form from screen
const removeForm = () => {
  const form = document.getElementById('dino-compare');
  form.style.display = 'none';
};

// Add tiles to DOM
const displayTiles = (tilesArray) => {
  const grid = document.getElementById('grid');

  tilesArray.forEach((tile) => {
    if (tile.species !== 'human') {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      gridItem.innerHTML = `
      <h3>${tile.species}</h3>
      <img src="data/images/${tile.species}.png" 
      alt="${tile.species} image"/>
      <p>${getRandomFact(tile.facts)}</p>
      `;
      grid.appendChild(gridItem);
    } else {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      gridItem.innerHTML = `
      <h3>${tile.species}</h3>
      <img src="data/images/${tile.species}.png" 
      alt="${tile.species} image"/>
      <p>${tile.name}</p>
      `;
      grid.appendChild(gridItem);
    }
  });
};

// On button click, prepare and display infographic
function handleSubmitForm() {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', async () => {
    const dinosArrObjs = await getDinoObjects();
    const humanObject = getHumanObject();
    const tilesArray = await generateTiles(dinosArrObjs, humanObject);
    removeForm();
    displayTiles(tilesArray);
  });
}
handleSubmitForm();
