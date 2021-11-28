
fetch("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json")
    .then(response => response.json())
    .then(champions => {
        for (const key in champions.data){
            saveChampion(`${key}`)
        }
        console.log(champions.data);
    })

const championGalleryDiv = document.getElementById("champion-gallery");

function addChampionInfoToDivList(champion){
    const championToDiv = document.createElement("div");
    championToDiv.setAttribute("class", "champion-div");
    championGalleryDiv.appendChild(championToDiv);
    createChampion(championToDiv, champion);
}

function createChampion(divElement, champion){
    championGalleryDiv.appendChild(divElement);
    divElement.innerHTML = `
    <ul> 
    <img src="https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/${champion.championName}.png")>
    <li>${escapeHTML(champion.championName.toString())}</li>
    </ul>
    `;
}

function deleteChampionDB() {
    fetch(localurl + "/champions/delete/all/", {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            console.log("Champions deleted");
        } else {
            console.log(response.status);
        }
    });
}

function saveChampion(champion) {
/*Vi kan fetche fra ddragon https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/Aatrox.json ny fetch
med det her linkså kan vi hente ID og alt muligt andet fra champions og billede osv. Det finder vi ud af.
 */
    deleteChampionDB()

    let championToSave = {
            championName: champion
    }
    fetch(localurl + "/champions", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(championToSave)
    }).then(response => {
        if (response.status === 200) {
            addChampionInfoToDivList(championToSave);
            console.log(championToSave)
        } else {
            console.log("Champion not created", response.status);
        }
    })
        .catch(error => console.log("network error" + error));
}



