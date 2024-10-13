// Function to filter valid items (not boots)
function isValidItem(item) {
    return item.maps["11"] === true && // Item belongs to Summoner's Rift
           item.gold.purchasable === true && // Item is purchasable
           item.gold.total > 2400 && // Item costs more than 2400 gold
           !item.from.includes("3006"); // Exclude boots (ID 3006)
}

// Function to filter valid boots
function isBootItem(item) {
    return item.hasOwnProperty("from") && item.from.includes("1001"); // Boots typically have ID "1001"
}

function sortFinalBuild(buildList){
    let removedItem;
    // Loop through the list == wave clear items, first but not priority
    for (let i = 0; i < buildList.length; i++){
        if((finalBuild[i].name == "Statikk Shiv") ||
            (finalBuild[i].hasOwnProperty("from") &&  // is from tear of goddess
            finalBuild[i].from.includes("3077"))){
                removedItem = finalBuild.splice(i,1);
                finalBuild.unshift(removedItem[0]);
            }
    }
    // Loop through the list == tear, first but not priority
    for (let i = 0; i < buildList.length; i++){
        if(finalBuild[i].hasOwnProperty("from") &&  // is from tear of goddess
            finalBuild[i].from.includes("3070")){
                removedItem = finalBuild.splice(i,1);
                finalBuild.unshift(removedItem[0]);
            }
    }
    // Loop through the list == full items that must be closed first e.g. ROA, Hearsteel
    for (let i = 0; i < buildList.length; i++){
        if(finalBuild[i].name == "Heartsteel" ||
            finalBuild[i].name == "Rod of Ages" ||
            finalBuild[i].name == "Hubris"){
                removedItem = finalBuild.splice(i,1);
                finalBuild.unshift(removedItem[0]);
            }
    }

    // Loop through the list == Rabbadon must be last
    for (let i = 0; i < buildList.length; i++){
        if(finalBuild[i].name == "Rabadon's Deathcap" ||
        finalBuild[i].name == "Void Staff"){
                removedItem = finalBuild.splice(i,1);
                finalBuild.push(removedItem[0]);
            }
    }
}

// Function to randomly select a champion from the `leagueChampionsNames` array.
function rollChampion() {
    championName = leagueChampionsNames[Math.floor(Math.random() * leagueChampionsNames.length)];
}


function championsRoulette(){
    let interval;
    // Randomly display images for 1-2 seconds
    let randomIndex;
    const $2seconds = 2000; // 2 seco

    // Start showing random images every 200ms
    interval = setInterval(displayChampion, 100);
    championAndBuildGenButton.disabled = true;

    // Stop showing random images after 2 seconds and display the chosen one
    setTimeout(() => {
        clearInterval(interval); // Stop fast shuffle
        interval = setInterval(displayChampion, 200); // Start slow shuffle
    }, $2seconds);

    setTimeout(() => {
        clearInterval(interval); // Stop fast shuffle
        displayChampion();
        playBoomSound();
        championAndBuildGenButton.disabled = false;
    }, $2seconds + $2seconds);  
}

// Function to generate a random build consisting of 5 items and 1 boot for the champion.
function generateBuild() {
    clearBuild();  // Clear any previous builds.

    // Add 5 unique random items to the `finalBuild` array.
    while (finalBuild.length < 5) {
        let itemNumber = Math.floor(Math.random() * items.length);  // Randomly select an item.


        // &&
        // !finalBuild.some(item => item.from.includes("3070")) &&
        // !finalBuild.some(item => item.from.includes("3077")) &&
        // !finalBuild.some(item => item.from.includes("3035"))
        // Check if the selected item is already in the build. If not, add it.
        if (!finalBuild.some(item => item.name === items[itemNumber].name)) {
            finalBuild.push(items[itemNumber]);
        } else {
            console.log(`${items[itemNumber].name} ALREADY ADDED`)
            // If the item is already in the build, skip to the next iteration.
            continue;
        }
    }
    sortFinalBuild(finalBuild);
    // Randomly select a boot from the `bootsList` and add it to the build.
    let buildBoots = bootsList[Math.floor(Math.random() * bootsList.length)];
    finalBuild.push(buildBoots);
    console.log(finalBuild);
    
}

// Function to clear the current build by resetting the `finalBuild` array.
function clearBuild() {
    finalBuild.length = 0;  // Reset the array length to 0 to remove all items.
}

function getItemID(item){
    const itemId = item.image.full.split('.')[0];
    return itemId;
}

function playRouletteSound() {
    var sound = document.getElementById("ticsound");
    sound.currentTime = 0;  
    sound.play();
}
function playBoomSound() {
    var sound = document.getElementById("bsound");
    sound.currentTime = 0; 
    sound.play();
}
