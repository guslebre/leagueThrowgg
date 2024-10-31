// Function to filter valid items in SR (not boots)
function isValidItem(item) {
    return item.maps["11"] === true && // Item belongs to Summoner's Rift
           item.gold.purchasable === true && // Item is purchasable
           item.gold.total > 2400 && // Item costs more than 2400 gold
           !item.from.includes("3006"); // Exclude boots (ID 3006)
}

// Function to filter is the imte is a boot
function isBootItem(item) {
    return item.hasOwnProperty("from") &&
     item.from.includes("1001") &&
     item.maps["11"] === true && // Item belongs to Summoner's Rift
     item.gold.purchasable === true; // Boots typically have ID "1001"
}

// make sure stacking and wave clear items comes first. final build items goes last
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
        finalBuild[i].name == "Void Staff" ||
        finalBuild[i].name == "Lord Dominik's Regards"){
                removedItem = finalBuild.splice(i,1);
                finalBuild.push(removedItem[0]);
            }
    }
}

// Function to randomly select a champion from the RIOT API
function rollChampion() {
    championObject = leagueChampions[Math.floor(Math.random() * leagueChampions.length)];
    // console.log(championObject);
    // console.log(championName);
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
       // console.log(bootsList);
    }, $2seconds + $2seconds);  
}

// Function to generate a random build consisting of 5 items and 1 boot for the champion.
function generateBuild() {
    clearBuild();  // Clear any previous builds.
   // FinalBuild 5 items and 1 boots // champion is NOT Cassipeia
     if(championObject.name != "Cassiopeia"){
        if(championObject.partype == "Mana"){
            generateregularBuild();
        }
        else {
            generateBuildNoManaItems();
        }
        
     }
     else { // Casiopeia was chosen
        generateCassiopeiaBuild();
     }
    
}
function generateBuildNoManaItems(){
    while (finalBuild.length < 5) {
        let itemNumber = Math.floor(Math.random() * items.length);  // Randomly select an item.
        let theItem = items[itemNumber];

        // First, check if the item is already in the build by name.
        // then check if item has any mana property;
        if (!finalBuild.some(item => item.name === theItem.name) &&
            !theItem.tags.includes("Mana") && 
            !theItem.tags.includes("ManaRegen")) {
            // Then, do not repeat items
            if(validateItemBeforeAdd(theItem))
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
}
function generateregularBuild(){
    let mainItem;
    let firstItemTags = [];
    numberOfCriticItems = 0;
    while (finalBuild.length < 5) {
        let itemNumber = Math.floor(Math.random() * items.length);  // Randomly select an item.
        let theItem = items[itemNumber];
        
        if( finalBuild.length < 1)
        {
            if(theItem.tags.length <=2)
            {
                continue;
            }
            mainItem = items[itemNumber];
            finalBuild.push(theItem);
            console.log(`${theItem.name} ADDED`);
            for (let i = 0; i < theItem.tags.length; i++)
            {
                if(theItem.tags[i] !="Active")
                {
                    firstItemTags.unshift(theItem.tags[i]);
                }
            }
            console.log(mainItem.name);
            console.log(firstItemTags);
        }
        else
        {
            // First, check if the item is already in the build by name.
            if (!finalBuild.some(item => item.name === theItem.name)) 
                {
                    if (isRelatedItem(firstItemTags, theItem))
                    {
                        if(validateItemBeforeAdd(theItem))
                            {
                                finalBuild.push(theItem);
                                console.log(`${theItem.name} IS related with ${mainItem.name}`);
                            }
                    }
                    else{
                        console.log(`${theItem.name} not related with ${mainItem.name}`);
                    }
                    
                } else {
                    console.log(`${theItem.name} ALREADY ADDED`);
                }
        }
        

        
    }
    sortFinalBuild(finalBuild);
    // Randomly select a boot from the `bootsList` and add it to the build.
    let buildBoots = bootsList[Math.floor(Math.random() * bootsList.length)];
    finalBuild.push(buildBoots);
 }
// script for generating build for Casiopeia // No boots
function generateCassiopeiaBuild(){
    while (finalBuild.length < 5) {
        let itemNumber = Math.floor(Math.random() * items.length);  // Randomly select an item.
        let theItem = items[itemNumber];

        // First, check if the item is already in the build by name.
        if (!finalBuild.some(item => item.name === theItem.name) &&
             theItem.name != "Rabadon's Deathcap" &&
             theItem.name != "Runaan's Hurricane") {
            // Then, check the special case for 3077.
            if(validateItemBeforeAdd(theItem))
            {
                finalBuild.push(theItem);
            }
            
        } else {
            console.log(`${theItem.name} ALREADY ADDED`);
        }
    }
     finalBuild.push(items[25]);// adding rabbaddon
     sortFinalBuild(finalBuild);
}

function isRelatedItem(itemTags, item)
{
    const commonTags = itemTags.filter(it => item.tags.includes(it));
    // priority for critic items
    if(itemTags.includes("CriticalStrike") && item.tags.includes("CriticalStrike"))
    {
        numberOfCriticItems++;
        if (numberOfCriticItems >= 3)
        {
            console.log("2 many critic items")
            return false;
            
        }
        else
        {
            return true;
        }
    }

    if(commonTags.length == item.tags.length)
    {
        return true;
    }


    if (commonTags.length >= 3)
    {
        return true;
    }
    return false;
}
function validateItemBeforeAdd(theItem){
    if(hasJewel(theItem) &&
        hasTiamat(theItem) &&
        hasSheen(theItem) &&
        hasTear(theItem) &&
        hasLW(theItem) &&
        hasBamiCinder(theItem) &&
        isValidRunan(theItem) &&
        hasShieldItem(theItem))
        {
            return true
        }
        else{
            return false
        }
}
function hasShieldItem(theItem){
    if(getItemID(theItem) == "3053" ||
        getItemID(theItem) == "6673" ||
        getItemID(theItem) == "3156" ||
        getItemID(theItem) == "3003")
        {
            if (!finalBuild.some(item => getItemID(theItem) == "3053" ||
                                            getItemID(theItem) == "6673" ||
                                            getItemID(theItem) == "3156") ||
                                            getItemID(theItem) == "3003") {
                return true  // Add the item.
            } else {
                console.log(`Another item with Shield is already in the build: ${theItem.name}`);
                return false;
            }
        }
    else {
        return true;
    }
}
function hasJewel(theItem){
    if (theItem.from.includes("4630") ) {
        // Ensure no other item in the finalBuild has 3077 in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("4630") ||
                                        getItemID(item) == "8020")) {
            return true  // Add the item.
        } else {
            console.log(`Another item with Jewel/Magic pen by % is already in the build: ${theItem.name}`);
            return false;
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
    
}
function hasBamiCinder(theItem){
    if (theItem.from.includes("6660")) {
        // Ensure no other item in the finalBuild has 3077 in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("6660"))) {
            return true  // Add the item.
        } else {
            console.log(`Another item with Bami's Cinder is already in the build: ${theItem.name}`);
            return false;
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}
function hasTiamat(theItem){
    if (theItem.from.includes("3077")) {
        // Ensure no other item in the finalBuild has 3077 in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("3077"))) {
            return true  // Add the item.
        } else {
            console.log(`Another item with Tiamat is already in the build: ${theItem.name}`);
            return false;
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}
function hasSheen(theItem){
    if (theItem.from.includes("3057")) {
        // Ensure no other item in the finalBuild has 3077 in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("3057"))) {
            return true  // Add the item.
        } else {
            console.log(`Another item with Sheen is already in the build: ${theItem.name}`);
            return false;
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}

function hasTear(theItem){
    if (theItem.from.includes("3070")) {
        // Ensure no other item in the finalBuild has 3077 in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("3070"))) {
            return true  // Add the item.
        } else {
            console.log(`Another item with Tear is already in the build: ${theItem.name}`);
            return false;
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}
function isValidRunan(theItem){
    if(theItem.name != "Runaan's Hurricane"){
        return true;
    }
    else{
        if (championObject.stats.attackrange > 400){
            return true;
        } else {
            return false;
        }
    } 
}
//     
function hasLW(theItem){
    if (theItem.from.includes("3035") ||
        getItemID(theItem) == "3302" ||
        getItemID(theItem) == "3071") {
        // Ensure no other item in the finalBuild has LW in its 'from' array.
        if (!finalBuild.some(item => item.from.includes("3035") ||
                                        getItemID(theItem) == "3302" ||
                                        getItemID(theItem) == "3071")) {
            return true;  // Add the item.
        } else {
            console.log(`Another item with Last Whisper is already in the build: ${theItem.name}`);
            return false;
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}

// Function to clear the current build by resetting the `finalBuild` array.
function clearBuild() {
    finalBuild.length = 0;
    shieldItemAdded == false;  // Reset the array length to 0 to remove all items.
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
