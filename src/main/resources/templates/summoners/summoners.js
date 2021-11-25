const summonersDiv = document.getElementById("summoner-gallery");
const riotKey = RGAPI-476d9838-d954-4b2a-8a93-13ccdfeece30;
const summonerSearchLink = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key= " + (riotKey);
let summonerToSave = summonerAccToSave + summonerRankToSave;

fetch(summonerSearchLink)
    .then(response => response.json())
    .then(summoner => {
        saveSummonerAccInfo(summoner)
        saveSummonerRankInfo(summoner)
    });

function addSummonerInfoToDiv(summoner){
    const selectSummonerToDiv = document.createElement("div");
    summonerDiv.appendChild(selectSummonerToDiv);
    constructSummoner(selectSummonerToDiv, summoner);
}

function saveSummonerAccInfo(summoner) {
    let summonerAccToSave = {
        summonerId: summoner.id,
        accountId: summoner.accountId,
        puuId: summoner.puuId,
        name: summoner.name,
    }
}

function saveSummonerRankInfo(summoner) {
    let summonerRankToSave = {
        tier: summoner.tier,
        queueType: summoner.queueType,
        leaguePoints: summoner.leaguePoints
    }
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




