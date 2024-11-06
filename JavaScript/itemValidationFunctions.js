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
               // console.log(`Another item with Shield is already in the build: ${theItem.name}`);
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
            //console.log(`Another item with Jewel/Magic pen by % is already in the build: ${theItem.name}`);
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
           // console.log(`Another item with Bami's Cinder is already in the build: ${theItem.name}`);
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
            //console.log(`Another item with Tiamat is already in the build: ${theItem.name}`);
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
            //console.log(`Another item with Sheen is already in the build: ${theItem.name}`);
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
            //console.log(`Another item with Tear is already in the build: ${theItem.name}`);
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
            //console.log(`Another item with Last Whisper is already in the build: ${theItem.name}`);
            return false;
        }
    } else {
        // If 3077 is not involved, add the item directly.
        return true;
    }
}