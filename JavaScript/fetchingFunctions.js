// Function to fetch items from the League of Legends API and populate the `items` array.
// Function to fetch data from the API
function fetchData(url) {
    return fetch(url)
        .then(res => res.json()) // Return the parsed JSON data
        .catch(error => console.error("Error fetching data:", error));
}

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

        // After processing items, generate the build
        generateBuild();
        displayBuild();
    });
}

async function fetchingChampions(){
    const url = "https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion.json";

    fetchData(url).then(data => {
        const allChampions = data.data;
        for (let key in allChampions) {
            if (allChampions.hasOwnProperty(key)) {
                let champObject = allChampions[key];
                leagueChampions.push(champObject);
            }
        }
        
        displayChampion();
        console.log(leagueChampions);
        console.log(leagueChampions[0]);
        for(let i = 0; i < leagueChampions.length;i++){
            leagueChampionsNames.push(leagueChampions[i].id);
        }
        console.log(leagueChampionsNames);
        
    });
    
// Base URL for the API
const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/champion/';

// Function to fetch data for each champion and return the result
async function fetchChampionData(champion) {
  const response = await fetch(`${baseUrl}${champion}.json`);
  if (!response.ok) {
    throw new Error(`Error fetching data for ${champion}`);
  }
  return response.json(); // Return the JSON data
}

// Function to fetch data for all champions and add them to a list
async function fetchAllChampions() {
  const championList = [];

  for (let champion of leagueChampionsNames) {
    try {
      const championData = await fetchChampionData(champion);
      championList.push(championData);
    } catch (error) {
      console.error(`Failed to fetch data for ${champion}: ${error.message}`);
    }
  }

  return championList;
}

// Run the function and log the result
fetchAllChampions().then((championList) => {
  console.log(championList); // This will contain all the fetched champion data
});

}