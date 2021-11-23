const championGalleryDiv = document.getElementById("champion-gallery");
let champions;
let filteredChampions;

fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
    .then(response => response.json())
    .then(result => {
        champions= result.results;
        filteredChampions = champions;
        champions.map(champion => createChampionCard(champion));
    });

function createChampionCard(champion) {
    const cardElement = document.createElement("div");

    cardElement.innerHTML = `
        <p>${escapeHTML(champion.key)}<p/>
        <p>${escapeHTML(champion.name)}<p/>
        
    `;
    championGalleryDiv.appendChild(cardElement);


}