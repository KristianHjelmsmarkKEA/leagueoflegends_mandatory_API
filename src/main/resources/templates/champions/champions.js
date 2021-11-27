
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
    championGalleryDiv.appendChild(championToDiv);
    createChampion(championToDiv, champion);
}

function createChampion(divElement, champion){
    championGalleryDiv.appendChild(divElement);
    divElement.innerHTML = `
    <ul> 
    <li>${escapeHTML(champion.championName.toString())}</li>
    </ul>
    `;
}

function saveChampion(champion) {
/*Vi kan fetche fra ddragon https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/Aatrox.json ny fetch
med det her linkså kan vi hente ID og alt muligt andet fra champions og billede osv. Det finder vi ud af.
 */

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




