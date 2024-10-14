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
            (finalBuild[i].hasOwnProperty("from") && 
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
    championObject = leagueChampions[Math.floor(Math.random() * leagueChampions.length)];
    championName = leagueChampionsNames[Math.floor(Math.random() * leagueChampionsNames.length)];
    console.log(championObject.name)
}


function championsRoulette(){
    let interval;
    // Randomly display images for 1-2 seconds
    let randomIndex;
    const $2seconds = 2000; // 2 seco

    // Start showing random images every 200ms
    interval = setInterval(displayChampion, 100);
    let anInterval = setInterval(generateBuild, 100);
    let newInterval = setInterval(displayBuild, 100);
    championAndBuildGenButton.disabled = true;

    // Stop showing random images after 2 seconds and display the chosen one
    setTimeout(() => {
        clearInterval(interval); 
        clearInterval(newInterval);
        clearInterval(anInterval);// Stop fast shuffle
        interval = setInterval(displayChampion, 200);
        anInterval = setInterval(generateBuild, 200);
        newInterval = setInterval(displayBuild, 200); // Start slow shuffle
    }, $2seconds);

    setTimeout(() => {
        clearInterval(interval);
        clearInterval(newInterval)
        clearInterval(anInterval) // Stop fast shuffle
        displayChampion();
        generateBuild();
        displayBuild();
        playBoomSound();
        championAndBuildGenButton.disabled = false;
    }, $2seconds + $2seconds);  
}

// Function to generate a random build consisting of 5 items and 1 boot for the champion.
function generateBuild() {
    clearBuild();  // Clear any previous builds.
   // finalBuild.push(items[5]);  // Assuming this is always added.

    // Add 5 unique random items to the `finalBuild` array.
    while (finalBuild.length < 5) {
        let itemNumber = Math.floor(Math.random() * items.length);  // Randomly select an item.
        let theItem = items[itemNumber];

        // First, check if the item is already in the build by name.
        if (!finalBuild.some(item => item.name === theItem.name)) {
            // Then, check the special case for 3077.
            if(hasTiamat(theItem) && hasTear(theItem) && hasLW(theItem))
            {
                finalBuild.push(theItem);
            }
            
        } else {
            console.log(`${theItem.name} ALREADY ADDED`);
        }
    }


    sortFinalBuild(finalBuild);
    // Randomly select a boot from the `bootsList` and add it to the build.
    let buildBoots = bootsList[Math.floor(Math.random() * bootsList.length)];
    finalBuild.push(buildBoots);
    // console.log(finalBuild);
    // console.log(items);
    
}

function hasTiamat(theItem){
    if (theItem.from.includes("3077")) {
        // Ensure no other item in the finalBuild has 3077 in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("3077"))) {
            finalBuild.push(theItem);  // Add the item.
        } else {
            console.log(`Another item with Tiamat is already in the build: ${theItem.name}`);
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}
function hasTear(theItem){
    if (theItem.from.includes("3070")) {
        // Ensure no other item in the finalBuild has 3070 in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("3070"))) {
            finalBuild.push(theItem);  // Add the item.
        } else {
            console.log(`Another item with tear of goddes is already in the build: ${theItem.name}`);
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}

function hasLW(theItem){
    if (theItem.from.includes("3035")) {
        // Ensure no other item in the finalBuild has LW in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("3035"))) {
            finalBuild.push(theItem);  // Add the item.
        } else {
            console.log(`Another item with Last Whisper is already in the build: ${theItem.name}`);
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
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
