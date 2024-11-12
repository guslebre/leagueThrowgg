// List of available boots in the game. Initially empty, will be populated with specific boots later.
const bootsList = [];
// puid HzZUFJ7dzs4c_Y-_fc7osdL5TONnOXZzjMHkzfXH9AYZYZMhVQw5IRWLldaq02NdRouWAcuovL0Fzg

// Reference to the button in the HTML that triggers the generation of a champion and build.
const championAndBuildGenButton = document.getElementById("genButton");

// Variable to store the name of the randomly selected champion. Initially set to an empty string.
let championName = " ";

let championObject;

// Array to store the final build of items and boots for the champion. Will hold 5 items + 1 boot.
let finalBuild = [];

// Array to store all valid items fetched from the API.
const items = new Array();
const leagueChampions = [];
const championList = [];
const runesList = [];
let shieldItemAdded = false;
let numberOfCriticItems = 0;
let firstItemTags = [];
let mainItem;
// const dominationTree = [];
// const precisionTree = [];
// const inspirationTree = [];
// const resolveTree = [];
// const sorceryTree = [];

class Runetree {
    constructor(name) {
      this.key = name;
      this.mainRow = [];
      this.secondRow = [];
      this.thridRow = [];
      this.fourthRow = [];
    }
  }
const precisionTree = new Runetree("Precision");
const dominationTree = new Runetree("Domination");
const inspirationTree = new Runetree("Inspiration");
const resolveTree = new Runetree("Resolve");
const sorceryTree = new Runetree("Sorcery");

// List of League of Legends champions to randomly select from.
const leagueChampionsNames = [];

for(let i = 0; i < leagueChampionsNames.length;i++){
    leagueChampionsNames.push(leagueChampions.id);
}

let allBuildItemsTags = [];