window.onload = function() {
     displayChampion(championName);
     fetchingItems();
     fetchingChampions();
};

championAndBuildGenButton.onclick = function() {
    displayChampion();
    championsRoulette()
    fetchingItems();
    
};

