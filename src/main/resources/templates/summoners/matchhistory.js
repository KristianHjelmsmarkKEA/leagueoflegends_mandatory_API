const matchHistoryGalleryDiv = document.getElementById("match-history-gallery");

fetch(localurl + "/matchhistory")
    .then(response => response.json())
    .then(matches => matches.map(createMatchCard));

function createMatchCard(match) {
    const matchCardDiv = document.createElement("div");

    matchHistoryGalleryDiv.appendChild(matchCardDiv);
    constructAPaintingCard(matchCardDiv, match);
}

function createMatchCard(matchDiv, match) {
    matchDiv.innerHTML = `
        <h1>${escapeHTML(match.matchId)}</h1>
    `;
}