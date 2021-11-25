const matchHistoryGalleryDiv = document.getElementById("match-history-gallery");
fetch(localurl + "/matches")
    .then(response => response.json())
    .then(matches => {
        matches.map(createMatchCard)
    });
function createMatchCard(match) {
    const matchCardDiv = document.createElement("div");
    matchHistoryGalleryDiv.appendChild(matchCardDiv);
    constructAMatchCard(matchCardDiv, match);
}

function constructAMatchCard(matchesDiv, match) {
    matchesDiv.innerHTML = `
        <h1>${escapeHTML(match.id.toString())}</h1>
    `;
}
function updateMatchHistory(){
    const summonerSearchInput = document.getElementById("summoner-name").value;
    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuId + "/ids?start=0&count=1&api_key=" + riotKey)
        .then(response => response.json())
        .then(match => {
            saveNewestMatchHistory(match)
        })
};

function saveNewestMatchHistory(match) {
    let matchHistoryToSave = {
        matchId: match.id,
        gameResult: match.gameResult,
        kills: match.kills,
        deaths: match.name,
        assists: match.assists,
        ultCasts: match.ultCasts,
    };

    fetch(localurl + "/matches", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(matchHistoryToSave)
    }).then(response => {
        if (response.status === 200) {
            updateMatchtHistory(matchHistoryToSave);
        } else {
            console.log("summoner not created", response.status);
        }
    })
        .catch(error => console.log("network error" + error));
}