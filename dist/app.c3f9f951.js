// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomFact = exports.isDinosaur = exports.fetchApiData = void 0;

// FUNCTION: fetching api data
const fetchApiData = async () => {
  const response = await fetch('data/dino.json'); // eslint-disable-next-line no-return-await

  return await response.json();
}; // FUNCTION: if it's a dinosaur


exports.fetchApiData = fetchApiData;

const isDinosaur = ({
  species
}) => species !== 'human' && species !== 'Pigeon'; // FUNCTION: get ramdom fact


exports.isDinosaur = isDinosaur;

const getRandomFact = factsArray => factsArray[Math.floor(Math.random() * factsArray.length)];

exports.getRandomFact = getRandomFact;
},{}],"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protypalInheritance = protypalInheritance;
exports.DinoConstructor = DinoConstructor;
exports.HumanConstructor = HumanConstructor;
exports.TileConstructor = void 0;

// FUNCTION: Avoiding DRY - inheritance helper function
function protypalInheritance(Child, Parent) {
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


function DinoConstructor(dinosaurObject) {
  AnimalConstructor.call(this, dinosaurObject);
}
/**
 * FUNCTION constructor: create human object
 * @constructor
 * @param {Object} humanObject
 */


function HumanConstructor(humanObject) {
  AnimalConstructor.call(this, humanObject);
}
/**
 * FUNCTION constructor: create main tile object
 * @constructor
 * @param {Object} tileObject
 */


class TileConstructor {
  constructor(animalObject) {
    if (animalObject.species !== 'human') {
      this.animalObject = animalObject;
      this.species = animalObject.species;
      this.image = `data/images/${animalObject.species.toLowerCase()}.png`;
      this.facts = [this.fact = animalObject.fact];
    } else {
      this.animalObject = animalObject;
      this.species = animalObject.species;
      this.image = `data/images/${animalObject.species.toLowerCase()}.png`;
      this.name = animalObject.name;
    }
  } // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.


  compareHeight(animalObject, humanObject) {
    return `${this.species} is a ${animalObject.height} inches while you're only ${humanObject.height} inches.`;
  } // Create Dino Compare Method 2
  // NOTE: Weight in JSON file is in lbs, height in inches.


  compareWeight(animalObject, humanObject) {
    return `${this.species} is a ${animalObject.weight} lbs while you're a ${humanObject.weight} lbs.`;
  } // Create Dino Compare Method 3
  // NOTE: Weight in JSON file is in lbs, height in inches.


  compareDiet(animalObject, humanObject) {
    return `${this.species} is a ${animalObject.diet} while you're a ${humanObject.diet}.`;
  }

}

exports.TileConstructor = TileConstructor;
protypalInheritance(DinoConstructor, AnimalConstructor);
protypalInheritance(HumanConstructor, AnimalConstructor);
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _helpers = require("./helpers");

var _model = require("./model");

// Create Dino Constructor
// FUNCTION: create dinosaurs Objects
const getDinoObjects = async () => {
  const {
    Dinos
  } = await (0, _helpers.fetchApiData)();
  const dinosArrObjs = Dinos.map(dinosaur => new _model.DinoConstructor(dinosaur)); // console.log(dinosArrObjs);

  return dinosArrObjs;
}; // FUNCTION: get data & create human object


const getHumanObject = () => {
  const form = new FormData(document.getElementById('dino-compare'));
  const species = 'human';
  const name = form.get('name');
  const height = parseInt(Number(form.get('inches')) + Number(form.get('feet')) * 12);
  const weight = parseInt(form.get('weight'));
  const diet = form.get('diet');
  const humanObject = new _model.HumanConstructor({
    name,
    height,
    weight,
    diet,
    species
  }); // console.log(humanObject);

  return humanObject;
}; // FUNCTION: Generate Tiles


const generateTiles = async (dinosArrObjs, humanObject) => {
  const animalObjects = Object.values(dinosArrObjs);
  animalObjects.splice(4, 0, humanObject); // create tiles object

  const tilesArray = [];
  animalObjects.forEach(animalObject => {
    tilesArray.push(new _model.TileConstructor(animalObject));
  }); // gatter all facts

  tilesArray.forEach(tile => {
    const factsArray = [];

    if ((0, _helpers.isDinosaur)(tile)) {
      factsArray.push(tile.fact, tile.compareDiet(tile.animalObject, humanObject), tile.compareHeight(tile.animalObject, humanObject), tile.compareWeight(tile.animalObject, humanObject));
      tile.facts = factsArray;
    }
  });
  return tilesArray;
}; // Remove form from screen


const removeForm = () => {
  const form = document.getElementById('dino-compare');
  form.style.display = 'none';
}; // Add tiles to DOM


const displayTiles = tilesArray => {
  const grid = document.getElementById('grid');
  tilesArray.forEach(tile => {
    if (tile.species !== 'human') {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      gridItem.innerHTML = `
      <h3>${tile.species}</h3>
      <img src="data/images/${tile.species}.png" 
      alt="${tile.species} image"/>
      <p>${(0, _helpers.getRandomFact)(tile.facts)}</p>
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
}; // On button click, prepare and display infographic


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
},{"./helpers":"js/helpers.js","./model":"js/model.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52348" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map