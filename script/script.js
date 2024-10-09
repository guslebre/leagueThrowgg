const items = [
    "Abyssal Mask", "Anathema's Chains", "Archangel's Staff", "Ardent Censer", 
    "Atma's Reckoning", "Axiom Arc", "Banshee's Veil", "Black Cleaver", 
    "Blackfire Torch", "Blade of the Ruined King", "Bloodletter's Curse", 
    "Bloodsong", "Bloodthirster", "Bounty of Worlds", "Celestial Opposition", 
    "Chempunk Chainsword", "Chemtech Putrifier", "Cosmic Drive", "Cryptbloom", 
    "Dawncore", "Dead Man's Plate", "Death's Dance", "Dream Maker", 
    "Echoes of Helia", "Eclipse", "Edge of Night", "Essence Reaver", 
    "Experimental Hexplate", "Fimbulwinter", "Force of Nature", 
    "Frozen Heart", "Guardian Angel", "Guinsoo's Rageblade", "Heartsteel", 
    "Hellfire Hatchet", "Hextech Gunblade", "Hextech Rocketbelt", 
    "Hollow Radiance", "Horizon Focus", "Hubris", "Hullbreaker", 
    "Iceborn Gauntlet", "Immortal Shieldbow", "Imperial Mandate", 
    "Infinity Edge", "Jak'Sho, The Protean", "Kaenic Rookern", 
    "Knight's Vow", "Kraken Slayer", "Liandry's Torment", "Lich Bane", 
    "Locket of the Iron Solari", "Lord Dominik's Regards", "Luden's Companion", 
    "Malignance", "Manamune", "Maw of Malmortius", 
    "Mercurial Scimitar", "Mikael's Blessing", "Moonstone Renewer", 
    "Morellonomicon", "Mortal Reminder", "Muramana", "Nashor's Tooth", 
    "Navori Flickerblade", "Opportunity", "Overlord's Bloodmail", 
    "Perplexity", "Phantom Dancer", "Profane Hydra", "Rabadon's Deathcap", 
    "Randuin's Omen", "Rapid Firecannon", "Ravenous Hydra", "Redemption", 
    "Riftmaker", "Rite of Ruin", "Rod of Ages", "Runaan's Hurricane", 
    "Rylai's Crystal Scepter", "Seraph's Embrace", "Serpent's Fang", 
    "Serylda's Grudge", "Shadowflame", "Shurelya's Battlesong", 
    "Solstice Sleigh", "Spear of Shojin", "Spectral Cutlass", 
    "Spirit Visage", "Staff of Flowing Water", "Statikk Shiv", 
    "Sterak's Gage", "Stormrazor", "Stormsurge", "Stridebreaker", 
    "Sundered Sky", "Sunfire Aegis", "Sword of Blossoming Dawn", 
    "Terminus", "The Collector", "Thornmail", "Titanic Hydra", 
    "Trailblazer", "Trinity Force", "Umbral Glaive", "Unending Despair", 
    "Vigilant Wardstone", "Void Staff", "Voltaic Cyclosword", 
    "Warmog's Armor", "Winter's Approach", "Wit's End", "Wordless Promise", 
    "Youmuu's Ghostblade", "Yun Tal Wildarrows", "Zaz'Zak's Realmspike", 
    "Zeke's Convergence", "Zhonya's Hourglass"
];

const bootsList = ["berserker", "Movespeed","ionian", "mercury", "armor", "mpen","mobility"]

const leagueChampions = [
    "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Amumu", "Anivia", "Annie", 
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
    "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", 
    "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", 
    "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", 
    "Veigar", "Vel'Koz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", 
    "Warwick", "Wukong", "Xayah", "Xerath", "Xin Zhao", "Yasuo", "Yone", "Yorick", 
    "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra", 
    "Milio", "Naafiri", "Briar", "Ambessa Medarda"
];

let champNumber = Math.floor(Math.random() * leagueChampions.length);
let champion = leagueChampions[champNumber];
//items[Math.floor(Math.random() * items.length)];
const finalBuild = [];
function generateBuild(){

    while (finalBuild.length < 5){

        let theItem = items[Math.floor(Math.random() * items.length)];

        // ROA test
        // if (theItem == "Rod of Ages" &&
        //     finalBuild.length == 0)
        // {
        //         finalBuild.push(theItem);
        // }
        if (!finalBuild.includes(theItem))
        {
            finalBuild.push(theItem);
        } 
        else
        {
            continue;
        }

    }
    let buildBoots = bootsList[Math.floor(Math.random() * bootsList.length)];
    finalBuild.push(buildBoots);
}

function clearBuild(){
    finalBuild.length = 0;
}


generateBuild();
console.log(finalBuild);
clearBuild()
console.log(finalBuild);
generateBuild();
console.log(finalBuild);
console.log(champion)
console.log(items.length)
console.log(leagueChampions.length)
