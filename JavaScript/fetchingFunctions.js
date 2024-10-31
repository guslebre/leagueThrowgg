// Function to fetch items from the League of Legends API and populate the `items` array.
// Function to fetch data from the API
// function fetchData(url) {
//     return fetch(url)
//         .then(res => res.json()) // Return the parsed JSON data
//         .catch(error => console.error("Error fetching data:", error));
// }

// Main fetching function Items
function fetchingItems() {
    const url = "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/item.json";
    
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



// Function to fetch all champions
async function fetchingChampions() {
    const url = "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json";

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
    const baseURL = 'https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion/';
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


