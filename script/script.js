window.onload = function() {
     rollChampion();
     displayChampion(championName);
     fetching();
     
};

championAndBuildGenButton.onclick = function() {
    rollChampion();
    displayChampion(championName);
    generateBuild();
};

