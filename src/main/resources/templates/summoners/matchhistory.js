const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const puuId = URLParams.get("puuId");
console.log(puuId);
let dbMatches;
const matchHistoryGalleryDiv = document.getElementById("match-history-gallery");

fetch(localurl + "/matches/" + puuId)
    .then(response => response.json())
    .then(matches => {
        matches.map(createMatchCard);
        dbMatches = matches.matchId;
    });



document.getElementById("update-match-history").addEventListener("click", getMatchIds);

function deleteGallery() {
    fetch(localurl + "/matches/delete/all/", {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            console.log("Matches deleted");
        } else {
            console.log(response.status);
        }
    });
}

function getMatchIds(){
    deleteGallery()

    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuId + "/ids?start=0&count=5&api_key=" + riotKey)
        .then(response => response.json())
        .then(match => {
            match.map(getMatchInformation)
            console.log(match)
        })
};

function getMatchInformation(match) {
    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/" + match + "?api_key=" + riotKey)
        .then(response => response.json())
        .then(match => {
            saveMatchInformation(match);
            console.log(match);
        })
}

function saveMatchInformation(match) {
    let summonerFound;

    console.log(puuId);
    console.log(match.info.participants[7].puuid);
    match.info.participants.map(summoner => {
        if (summoner.puuid === puuId) {
            summonerFound = summoner;
            console.log(summonerFound);
        }
    });
    let matchHistoryToSave = {
        matchId: match.metadata.matchId,
        matchPuuId: summonerFound.puuid,
        gameResult: summonerFound.win,
        kills: summonerFound.kills,
        deaths: summonerFound.deaths,
        assists: summonerFound.assists,
        ultCasts: summonerFound.spell4Casts,
        champName: summonerFound.championName
    };

            console.log(matchHistoryToSave);

            fetch(localurl + "/matches", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(matchHistoryToSave)
            }).then(response => {
                if (response.status === 200) {
                    createMatchCard(matchHistoryToSave);
                    console.log(matchHistoryToSave);
                } else {
                    console.log("Match not created", response.status);
                }
            })
                .catch(error => console.log("network error" + error));


}

function createMatchCard(match) {
    const matchCardDiv = document.createElement("div");
    matchHistoryGalleryDiv.appendChild(matchCardDiv);
    constructAMatchCard(matchCardDiv, match);
}

function constructAMatchCard(matchesDiv, match) {
    let gameResultWinLoss;
    if (match.gameResult === true) {
        gameResultWinLoss = "Win";
    } else {
        gameResultWinLoss = "Loss";
    }

    matchHistoryGalleryDiv.appendChild(matchesDiv);
    matchesDiv.innerHTML = `
    <ul>
    <img src="https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/${match.champName}.png")>
    <li>${escapeHTML("Game Result: " + gameResultWinLoss.toString())}</li>
    <li>${escapeHTML("Kills: " + match.kills.toString())}</li>
    <li>${escapeHTML("Deaths: " + match.deaths.toString())}</li>
    <li>${escapeHTML("Assists: " + match.assists.toString())}</li>
    <li>${escapeHTML("Ultimate casts: " + match.ultCasts.toString())}</li>
    <li>${escapeHTML("Champion: " + match.champName.toString())}</li>
    `;
}
