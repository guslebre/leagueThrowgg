
// Main fetching function Items
function fetchingItems() {
    const url = "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/item.json";
    
    fetchData(url).then(data => {
        const itemArray = data.data;
        // Loop through the items
        for (let key in itemArray) {
            if (itemArray.hasOwnProperty(key)) {
                let itemObject = itemArray[key];

                // Add valid items and boots to their respective lists
                if (isValidItem(itemObject)) {
                    items.push(itemObject);
                }
                if (isBootItem(itemObject)) {
                    bootsList.push(itemObject);
                }
            }
        }
        
        // // After processing items, generate the build
         generateBuild();
         displayBuild();
    });
}

function sortingRunesToTheirObjects(object, runeObject){
    mainRunes = [];
    for(let rune in runeObject.slots[0].runes){
        mainRunes.push(runeObject.slots[0].runes[rune]);
    }
    object.mainRow = mainRunes;
    mainRunes = [];
    for(let rune in runeObject.slots[1].runes){
        //  console.log(runeObject.slots[1].runes[rune]);
        mainRunes.push(runeObject.slots[1].runes[rune]);
    }
    object.secondRow = mainRunes;
    mainRunes = [];
    for(let rune in runeObject.slots[2].runes){
        //  console.log(runeObject.slots[1].runes[rune]);
        mainRunes.push(runeObject.slots[2].runes[rune]);
    }
    object.thridRow = mainRunes;
    mainRunes = [];
    for(let rune in runeObject.slots[3].runes){
        //  console.log(runeObject.slots[1].runes[rune]);
        mainRunes.push(runeObject.slots[3].runes[rune]);
    }
    object.fourthRow = mainRunes;
}

function fetchingRunes() {
    const url = "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/runesReforged.json";
    
    fetchData(url).then(data => {
        const allRunesArray = data;
        console.log(allRunesArray);
        // Loop through the items
        for (let key in allRunesArray) {
            let mainRunes = [];
            if (allRunesArray.hasOwnProperty(key)) {
                let runeObject = allRunesArray[key];
              //console.log(runeObject.slots[1].runes);
                switch (runeObject.key) {
                    case "Domination":
                        sortingRunesToTheirObjects(dominationTree,runeObject);
                      break;
                    case "Inspiration":
                        sortingRunesToTheirObjects(inspirationTree,runeObject);
                      break;
                    case "Precision":
                        sortingRunesToTheirObjects(precisionTree,runeObject);
                        break;
                    case "Resolve":
                        sortingRunesToTheirObjects(resolveTree,runeObject);
                        break;
                    case "Sorcery":
                        sortingRunesToTheirObjects(sorceryTree,runeObject);
                        break;
                    default:
                      console.log(`Error: key is ${runeObject.key}`);
                      break;
                  }
                

            }
        }
        console.log(precisionTree);
        console.log(inspirationTree);
        console.log(dominationTree);
        console.log(resolveTree);
        console.log(sorceryTree);
    });
}



// Function to fetch all champions
async function fetchingChampions() {
    const url = "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion.json";

    try {
        const data = await fetchData(url);
        const allChampions = data.data;
        

        for (let key in allChampions) {
            if (allChampions.hasOwnProperty(key)) {
                let champObject = allChampions[key];
                leagueChampions.push(champObject); // Add to champion list
            }
        }
        // Populate leagueChampionsNames with the IDs of each champion
        for (let i = 0; i < leagueChampions.length; i++) {
            leagueChampionsNames.push(leagueChampions[i].id);
        }

        // Any additional logic you want to run after champions are fetched
        rollChampion(); // Example function call after champions are fetched
        displayChampion(); // Example function call after champions are fetched

    } catch (error) {
        console.error('Error fetching champions:', error);
    }
}

// Function to fetch individual champion data
async function fetchChampionData() {
    const baseURL = 'https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/champion/';
    let championDataList = [];

    // Wait until fetchingChampions is complete
    await fetchingChampions();

    // Fetch data for each champion based on their name in leagueChampionsNames
    for (let champion of leagueChampionsNames) {
        try {
            const response = await fetch(`${baseURL}${champion}.json`);
            let data = await response.json();
            data = data.data[champion];
            championDataList.push(data); // Store each champion's data
        } catch (error) {
            console.error(`Error fetching data for ${champion}:`, error);
        }
    }

    return championDataList;
}

// Function to trigger the entire flow
async function fetchAllChampionData() {
    const allChampionData = await fetchChampionData();
    // console.log(allChampionData);
    // console.log(leagueChampionsNames)
}

// Helper function to fetch data from a URL (since you mentioned fetchData is used)
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

// Start fetching all the champion data


