window.onload = function() {
     fetchingChampions();
     fetchingItems();
     
};

championAndBuildGenButton.onclick = function() {
     championsRoulette();
     
     console.log(hasTiamat(items[18]));
     console.log(items);
     console.log(leagueChampions[0]);
};

