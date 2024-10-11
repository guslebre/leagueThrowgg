//const bootsList = ["Berserker's Greaves", "Boots of Swiftness","Ionian Boots of Lucidity", "Mercury's Treads", "Plated Steelcaps", "Sorcerer's Shoes","Synchronized Souls"]
const bootsList = [];
const championAndBuildGenButton = document.getElementById("genButton");
let championName = " ";
const finalBuild = [];
const items = new Array();
const leagueChampions = [
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


 function fetching()
 {
     fetch("https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/item.json")
     .then(res => {
        return res.json();
    })
    .then(data => {
        itemArray = data.data;
        for (let key in itemArray) {
            let itemObject = itemArray[key];

            if (itemArray.hasOwnProperty(key) &&
            itemObject.maps["11"] == true &&
            itemObject.gold.total > 2400 &&
             itemObject.gold.purchasable == true &&
             !itemObject.from.includes("3006")) 
             {
                 items.push(itemObject);
             } 

             
         }
         generateBuild();
         console.log(items);
     })
     .catch(error =>  (error));
 }


function rollChampion (){
    championName = leagueChampions[Math.floor(Math.random() * leagueChampions.length)];
}
function displayChampion(championName){
    const champDisplay = document.getElementById("champIcon");
    let htmlOutput = "";
    htmlOutput += `<h1>${championName}</h1>`;
    //<img src="images/ZedSquare.webp" alt="khbdfsahbk">

    htmlOutput += `<img src="./images/championIcons/${championName.toLowerCase()}.png" alt="championIcon">`;
    champDisplay.innerHTML = htmlOutput;
}

function generateBuild(){
        clearBuild();
        while (finalBuild.length < 5){
            itemNumber = Math.floor(Math.random() * items.length);
            console.log(itemNumber);
            
            if (!finalBuild.includes(items[itemNumber]))
            {
                (`the array DOES NOT contains ${items[itemNumber]}`)
                finalBuild.push(items[itemNumber]);
            } 
            else
            {
                (`the array contains ${items[itemNumber]}`)
                continue;
            }

     }
        let buildBoots = bootsList[Math.floor(Math.random() * bootsList.length)];
        finalBuild.push(buildBoots);
        console.log(finalBuild);
}


function clearBuild(){
    finalBuild.length = 0;
}
