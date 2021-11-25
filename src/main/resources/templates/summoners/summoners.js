const summonerDiv = document.getElementById("summoner-gallery");
const riotKey = 'RGAPI-affcec8b-e850-4ebc-91b5-0ee691fd276f';
const summonerAccSearchLink = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key= " + (riotKey);



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

function saveSummonerAccInfo(summoner) {
    let summonerAccToSave = {
        summonerId: summoner.id,
        accountId: summoner.accountId,
        puuId: summoner.puuId,
        name: summoner.name,
    };

    fetch(summonerAccSearchLink, {
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


document.getElementById("search-for-summoner")
    .addEventListener("click", saveSummonerAccInfo);





