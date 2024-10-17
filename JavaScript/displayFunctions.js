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

// Function to display the selected champion on the webpage.
function displayChampion() {
    rollChampion();
    const champDisplay = document.getElementById("champIcon");  // Get the element where the champion will be displayed.
    championName = championObject.name;
    let htmlOutput = "";
    
    // Display the champion's name as a heading.
    htmlOutput += `<h1>${championName}</h1>`;
    
    // Display the champion's icon using a predefined image naming convention.
    htmlOutput += `<img loading="lazy" src="./images/championIcons/${championObject.name.toLowerCase()}.png" alt="championIcon">`; 
   // htmlOutput += `<img src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/${championObject.id}.png" alt="championIcon">`;

    // Update the webpage to display the champion's name and icon.
    champDisplay.innerHTML = htmlOutput;
    playRouletteSound();
}