const bootsList = ["berserker", "Movespeed","ionian", "mercury", "armor", "mpen","mobility"]

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

    while (finalBuild.length < 5){

        let theItem = items[Math.floor(Math.random() * items.length)];
        finalBuild.push(theItem)
        // console.log(theItem);
        //   if (!finalBuild.includes(theItem))
        //   {
        //       finalBuild.push(theItem);
        //       console.log(theItem);
        //       console.log(finalBuild);
        //   } 
        //   else
        //   {
        //       continue;
        //   }

    }
    let buildBoots = bootsList[Math.floor(Math.random() * bootsList.length)];
    finalBuild.push(buildBoots);
}

function clearBuild(){
    finalBuild.length = 0;
}
function filteringItems(){
    let htmlOutput = "";
    for (let key in itemArray) {
        $item = itemArray[key];
        
        if (itemArray.hasOwnProperty(key) &&
        $item.maps["11"] == true &&
        $item.gold.total > 2400 &&
        $item.gold.purchasable == true) 
        {
            items.push($item.name);
        }
    }
}
     //htmlOutput += `<h1>${$item.name}</h1>`;

     // htmlOutput += `<img style="width: 60px;" src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/item/${key}.png">`;

    //  const itemDiv = document.getElementById("testdiv");
    //     itemDiv.innerHTML = htmlOutput;