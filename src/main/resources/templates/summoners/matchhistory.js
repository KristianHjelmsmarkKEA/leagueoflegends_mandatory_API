const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const puuId = URLParams.get("puuId");
let dbMatches;

const matchHistoryGalleryDiv = document.getElementById("match-history-gallery");
fetch(localurl + "/matches")
    .then(response => response.json())
    .then(matches => {
        matches.map(createMatchCard)
        dbMatches = matches.matchId;
    });

function createMatchCard(match) {
    const matchCardDiv = document.createElement("div");
    matchHistoryGalleryDiv.appendChild(matchCardDiv);
    constructAMatchCard(matchCardDiv, match);
}

function constructAMatchCard(matchesDiv, match) {
        <h1>${escapeHTML(match.id.toString())}</h1>

}

document.getElementById("update-match-history").addEventListener("click", getMatchIds);

function getMatchIds(){
    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuId + "/ids?start=0&count=1&api_key=" + riotKey)
        .then(response => response.json())
        .then(match => {
            getMatchInformation(match)
        })
};

function getMatchInformation(match) {
    let matchHistoryToSave = {
        matchId: match.matchId,
        gameResult: match.gameResult,
        kills: match.kills,
        deaths: match.name,
        assists: match.assists,
        ultCasts: match.ultCasts,
    };

    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/" + match.matchId + "?api_key=" + riotKey, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(matchHistoryToSave)
    }).then(response => {
        if (response.status === 200) {
           console.log("Match information fetched")
        } else {
            console.log("match information not fetched", response.status);
        }
    })
        .catch(error => console.log("network error" + error));
}
