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

function fetchingChampions(){
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
    });
    
    
}