// FUNCTION: Avoiding DRY - inheritance helper function
export function protypalInheritance(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

/**
 * FUNCTION constructor: Animal object
 * @constructor
 * @param {Object} animalObject
 */
function AnimalConstructor(animalObject) {
  Object.assign(this, animalObject);
}

/**
 * FUNCTION constructor: create dinosaur object
 * @constructor
 * @param {Object} dinosaurObject
 */
export function DinoConstructor(dinosaurObject) {
  AnimalConstructor.call(this, dinosaurObject);
}

/**
 * FUNCTION constructor: create human object
 * @constructor
 * @param {Object} humanObject
 */
export function HumanConstructor(humanObject) {
  AnimalConstructor.call(this, humanObject);
}

/**
 * FUNCTION constructor: create main tile object
 * @constructor
 * @param {Object} tileObject
 */
export class TileConstructor {
  constructor(animalObject) {
    if (animalObject.species !== 'human') {
      this.animalObject = animalObject;
      this.species = animalObject.species;
      this.image = `data/images/${animalObject.species.toLowerCase()}.png`;
      this.facts = [(this.fact = animalObject.fact)];
    } else {
      this.animalObject = animalObject;
      this.species = animalObject.species;
      this.image = `data/images/${animalObject.species.toLowerCase()}.png`;
      this.name = animalObject.name;
    }
  }

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareHeight(animalObject, humanObject) {
    return `${this.species} is a ${animalObject.height} inches while you're only ${humanObject.height} inches.`;
  }

  // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareWeight(animalObject, humanObject) {
    return `${this.species} is a ${animalObject.weight} lbs while you're a ${humanObject.weight} lbs.`;
  }

  // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareDiet(animalObject, humanObject) {
    return `${this.species} is a ${animalObject.diet} while you're a ${humanObject.diet}.`;
  }
}

protypalInheritance(DinoConstructor, AnimalConstructor);
protypalInheritance(HumanConstructor, AnimalConstructor);
