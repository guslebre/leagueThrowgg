const championAndBuildGenButton = document.getElementById("genButton");
let championName = " ";
const finalBuild = [];

// window.onload = function() {
//     generateBuild();
//     rollChampion();
//     displayChampion(championName);
// };
let i = 80;
championAndBuildGenButton.onclick = function() {
    // generateBuild();
    // rollChampion();
    
    displayChampion(leagueChampions[i]);
    i++;
};