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

        if( finalBuild.length < 1)
            {
                if(theItem.tags.length <=3 && !theItem.tags.includes("CriticalStrike"))
                {
                    continue;
                }
                mainItem = items[itemNumber];
                TagsCheckAndCreation(mainItem,theItem);
            }
        else{
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
        

        
    }
    sortFinalBuild(finalBuild);
    // Randomly select a boot from the `bootsList` and add it to the build.
    let buildBoots = bootsList[Math.floor(Math.random() * bootsList.length)];
    finalBuild.push(buildBoots);
}

function TagsCheckAndCreation(mainItem, theItem){
        finalBuild.push(theItem);
        console.log(`${theItem.name} ADDED`);
        for (let i = 0; i < theItem.tags.length; i++)
        {
            if(theItem.tags[i] !="Active" || theItem.tags[i] !="Tenacity" ||
                theItem.tags[i] !="SpellBlock" || theItem.tags[i] !="Aura" ||
                theItem.tags[i] !="GoldPer" || theItem.tags[i] !="CooldownReduction")
            {
                firstItemTags.unshift(theItem.tags[i]);
                if(theItem.tags[i] == "OnHit")
                {
                    firstItemTags.unshift("Damage");
                }
            }
        }
        console.log(mainItem.name);
        console.log(firstItemTags);
}
function generateregularBuild(){
    
    firstItemTags = [];
    numberOfCriticItems = 0;
    while (finalBuild.length < 5) {
        let itemNumber = Math.floor(Math.random() * items.length);  // Randomly select an item.
        let theItem = items[itemNumber];
        
        if( finalBuild.length < 1)
        {
            if(theItem.tags.length <=3 && !theItem.tags.includes("CriticalStrike"))
            {
                continue;
            }
            mainItem = items[itemNumber];
            TagsCheckAndCreation(mainItem,theItem);
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

        if( finalBuild.length < 1)
            {
                if(theItem.tags.length <=3 && !theItem.tags.includes("CriticalStrike"))
                {
                    continue;
                }
                mainItem = items[itemNumber];
                TagsCheckAndCreation(mainItem,theItem);
            }
        else{
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
        firstItemTags = [];
        firstItemTags.unshift("Damage");
            firstItemTags.unshift("AttackSpeed");
            firstItemTags.unshift("CriticalStrike");
            firstItemTags.unshift("NonbootsMovement");
            firstItemTags.unshift("OnHit");
        numberOfCriticItems++;
        if (numberOfCriticItems >= 4)
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
    if(item.tags.length == 3 && commonTags.length >= 2)
    {
        firstItemTags.unshift("AbilityHaste");
        return true;
        
    }


    if (commonTags.length >= 3)
    {
        return true;
    }
    return false;
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
