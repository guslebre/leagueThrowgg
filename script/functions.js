// List of available boots in the game. Initially empty, will be populated with specific boots later.
const bootsList = [];
// puid HzZUFJ7dzs4c_Y-_fc7osdL5TONnOXZzjMHkzfXH9AYZYZMhVQw5IRWLldaq02NdRouWAcuovL0Fzg

// Reference to the button in the HTML that triggers the generation of a champion and build.
const championAndBuildGenButton = document.getElementById("genButton");

// Variable to store the name of the randomly selected champion. Initially set to an empty string.
let championName = " ";

// Array to store the final build of items and boots for the champion. Will hold 5 items + 1 boot.
let finalBuild = [];

// Array to store all valid items fetched from the API.
const items = new Array();
const champions = [];

// List of League of Legends champions to randomly select from.
const leagueChampionsNames = [
    "Aatrox","Aurora", "Ahri", "Akali", "Akshan", "Alistar", "Amumu", "Anivia", "Annie", 
    "Aphelios", "Ashe", "Aurelion Sol", "Azir", "Bard", "Bel'Veth", "Blitzcrank", 
    "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki", 
    "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", 
    "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", 
    "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", 
    "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "Kai'Sa", 
    "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", 
    "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc", "Lee Sin", 
    "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", 
    "Maokai", "Master Yi", "Milio", "Miss Fortune", "Mordekaiser", "Morgana", 
    "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", 
    "Nunu & Willump", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", 
    "Qiyana", "Quinn", "Rakan", "Rammus", "Rek'Sai", "Rell", "Renata Glasc", 
    "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", 
    "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", 
    "Sivir", "Skarner","Smolder", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", 
    "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", 
    "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", 
    "Veigar", "Vel'Koz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", 
    "Warwick", "Wukong", "Xayah", "Xerath", "Xin Zhao", "Yasuo", "Yone", "Yorick", 
    "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra", 
    "Milio", "Naafiri", "Briar"
];

// Function to fetch items from the League of Legends API and populate the `items` array.
// Function to fetch data from the API
function fetchData(url) {
    return fetch(url)
        .then(res => res.json()) // Return the parsed JSON data
        .catch(error => console.error("Error fetching data:", error));
}

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

// Function to display the selected champion on the webpage.
function displayChampion() {
    rollChampion();
    const champDisplay = document.getElementById("champIcon");  // Get the element where the champion will be displayed.
    let htmlOutput = "";
    
    // Display the champion's name as a heading.
    htmlOutput += `<h1>${championName}</h1>`;
    
    // Display the champion's icon using a predefined image naming convention.
    htmlOutput += `<img src="./images/championIcons/${championName.toLowerCase()}.png" alt="championIcon">`;
    
    // Update the webpage to display the champion's name and icon.
    champDisplay.innerHTML = htmlOutput;
}
function testingDisplay(){
    let interval;
    // Randomly display images for 1-2 seconds
    let randomIndex;
    const $2seconds = 2000; // 2 seco

    // Start showing random images every 200ms
    interval = setInterval(displayChampion, 100);

    // Stop showing random images after 2 seconds and display the chosen one
    setTimeout(() => {
        clearInterval(interval); // Stop fast shuffle
        interval = setInterval(displayChampion, 200); // Start slow shuffle
    }, $2seconds);

    setTimeout(() => {
        clearInterval(interval); // Stop fast shuffle
        interval = setInterval(displayChampion, 400); // Start slow shuffle
    }, $2seconds + $2seconds);

    setTimeout(() => {
        clearInterval(interval); // Stop fast shuffle
        displayChampion(); // Start slow shuffle
    }, $2seconds + $2seconds + $2seconds);
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


function displayBuild(){
        const elements = document.querySelectorAll('[id^="item"]');
        let i = 0;
        
            // Iterate over each element with forEach
            elements.forEach(element => {
                let item = finalBuild[i];
                let imagePath = `https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/${getItemID(item)}.png `;
                let htmlOutput = "";
                htmlOutput += `<img src="${imagePath}" alt="itemPic"></img>`;  
                htmlOutput += `<div class="info-box">`; // adding div
                htmlOutput += `<h2 style="color: orange">${item.name}</h2>`; // adding item name
             //   htmlOutput += `<img class ="item-icon" src="${imagePath}" alt="${item.name}"`;
                htmlOutput += `<span>${item.description} ${item.plaintext}</span>`;
                htmlOutput += "</div>"
                
                i++
                element.innerHTML = htmlOutput;
            });
}

function getItemID(item){
    const itemId = item.image.full.split('.')[0];
    return itemId;
}