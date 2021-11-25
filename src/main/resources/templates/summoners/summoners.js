const summonerDiv = document.getElementById("summoner-gallery");
const riotKey = 'RGAPI-476d9838-d954-4b2a-8a93-13ccdfeece30';
const summonerSearchInput = document.getElementById("summoner-name");
const summonerAccSearchLink = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerSearchInput + "?api_key= " + (riotKey);
const localurl = "http://localhost:9191";


fetch(localurl + "/summoners")
    .then(response => response.json())
    .then(summoners => {
        summoners.map(createSummonerList);
    })

const summonerListWrapper = document.getElementById("summoner-list");

function createSummonerList(summoner) {
    const summonerElement = document.createElement("div");
    summonerElement.innerText = summoner.name;

    summonerListWrapper.appendChild(summonerElement);
}

function addSummonerInfoToDiv(summoner){
    const summonerToDiv = document.createElement("div");
    summonerDiv.appendChild(summonerToDiv);
    createSummoner(summonerToDiv, summoner);
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

document.getElementById("search-summoner-name").addEventListener("click", searchForSummoner);

function searchForSummoner(){
    fetch(summonerAccSearchLink)
        .then(response => response.json())
        .then(summoner => {
            saveSummonerAccInfo(summoner)
        })
};

function saveSummonerAccInfo(summoner) {
    let summonerAccToSave = {
        summonerId: summoner.id,
        accountId: summoner.accountId,
        puuId: summoner.puuId,
        name: summoner.name,
    };

    fetch(localurl + "/summoners", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(summonerAccToSave)
    }).then(response => {
        if (response.status === 200) {
            addSummonerInfoToDiv(summonerAccToSave);
        } else {
            console.log("summoner not created", response.status);
        }
    })
        .catch(error => console.log("network error" + error));
}






