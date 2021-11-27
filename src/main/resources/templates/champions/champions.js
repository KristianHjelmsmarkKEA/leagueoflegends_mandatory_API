const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const puuId = URLParams.get("puuId");
const championGalleryDiv = document.getElementById("champion-gallery");
let summonerId;

function getSummonerId() {
    if ()

}



fetch(localurl + "/champions/")
    .then(response => response.json())
    .then(matches => {
        matches.map(createMatchCard);
        dbMatches = matches.matchId;
    });

fetch("https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summmonerid + "?api_key=" + apikey)
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });

function createChampionCard(champion) {
    const cardElement = document.createElement("div");

    cardElement.innerHTML = `
        <p>${escapeHTML(champion.data)}<p/>
        <p>${escapeHTML(champion.key)}<p/>
    `;

    championGalleryDiv.appendChild(cardElement);

}