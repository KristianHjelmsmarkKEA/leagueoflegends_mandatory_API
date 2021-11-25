const summonerDiv = document.getElementById("summoner-gallery");
const riotKey = 'RGAPI-476d9838-d954-4b2a-8a93-13ccdfeece30';
const summonerAccSearchLink = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key= " + (riotKey);
const summonerRankSearchLink = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + (riotKey);
let summonerToSave = summonerAccToSave + summonerRankToSave;


fetch(summonerAccSearchLink)
    .then(response => response.json())
    .then(summoner => {
        saveSummonerAccInfo(summoner)

    });
fetch(summonerRankSearchLink)
    .then(response => response.json())
    .then(summoner => {
        saveSummonerRankInfo(summoner)
    });

function saveSummonerAccInfo(summoner) {
    let summonerAccToSave = {
        summonerId: summoner.id,
        accountId: summoner.accountId,
        puuId: summoner.puuId,
        name: summoner.name,
    };
}

function saveSummonerRankInfo(summoner) {
    let summonerRankToSave = {
        tier: summoner.tier,
        queueType: summoner.queueType,
        leaguePoints: summoner.leaguePoints
    };
}

function addSummonerInfoToDiv(summoner){
    const selectSummonerToDiv = document.createElement("div");
    summonerDiv.appendChild(selectSummonerToDiv);
    createSummoner(selectSummonerToDiv, summoner);
}

function createSummoner(divElement, summoner){
    divElement.innerHTML = `
    <a href="./summonersMatches.html?summonerId=${summoner.id}">
    <h1>
    ${escapeHTML(summoner.name)}
    </h1>
    </a>
    `;
}

fetch(localurl + "/summoners", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(summonerToSave)
}).then(response => {
    if (response.status === 200) {
        addSummonerInfoToDiv(summonerToSave);
    } else {
        console.log("summoner not created", respone.status);
    }
})
    .catch(error => console.log("network error" + error));







