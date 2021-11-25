const championGalleryDiv = document.getElementById("champion-gallery");
let champions;

fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
    .then(response => response.json())
    .then(result => {
        champions= result.results;
        champions.map(champion => createChampionCard(champion));
    });

function createChampionCard(champion) {
    const cardElement = document.createElement("div");

    cardElement.innerHTML = `
        <p>${escapeHTML(champion.data)}<p/>
        <p>${escapeHTML(champion.key)}<p/>
    `;

    championGalleryDiv.appendChild(cardElement);


}