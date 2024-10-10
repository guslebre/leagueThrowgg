const championAndBuildGenButton = document.getElementById("genButton");
let championName = " ";
const finalBuild = [];
const items = [];

fetch("https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/item.json")
      .then(res => {
          return res.json();
      })
      .then(data => {
          itemArray = data.data;
          filteringItems()
      })
      .catch(error => console.log(error));

window.onload = function() {
     generateBuild();
     rollChampion();
     displayChampion(championName);
 };

championAndBuildGenButton.onclick = function() {
    generateBuild();
    rollChampion();
    displayChampion(championName);
};
console.log(items);
console.log(finalBuild);