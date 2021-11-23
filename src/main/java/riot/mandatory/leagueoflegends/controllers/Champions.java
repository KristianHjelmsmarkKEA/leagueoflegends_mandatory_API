package riot.mandatory.leagueoflegends.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import riot.mandatory.leagueoflegends.models.Champion;
import riot.mandatory.leagueoflegends.models.Summoner;
import riot.mandatory.leagueoflegends.repositories.ChampionRepository;
import riot.mandatory.leagueoflegends.repositories.SummonerRepository;

public class Champions {

    @Autowired
    ChampionRepository champions;


    @GetMapping("/champions")
    public Iterable<Champion> getChampion() {
        return champions.findAll();
    }

    @GetMapping("/champions/{id}")
    public Champion getChampion(@PathVariable Long id) {
        return champions.findById(id).get();
    }

    @PostMapping("/champions")
    public Champion addChampion(@RequestBody Champion newChampion) {
        return champions.save(newChampion);
    }

    @PutMapping("/champions/{id}")
    public String updateChampion(@PathVariable Long id, @RequestBody Champion championToUpdate){
        if(champions.existsById(id)) {
            championToUpdate.setId(id);
            champions.save(championToUpdate);
            return "Champion was updated";
        } else {
            return "Champion not found";
        }
    }

    @PatchMapping("/champions/{id}")
    public String patchChampion(@PathVariable Long id, @RequestBody Champion championToUpdate) {
        return champions.findById(id).map( foundChampion -> {
            if(championToUpdate.getChampionId() != null) foundChampion.setChampionId(championToUpdate.getChampionId());
            if(championToUpdate.getChampionName() != null) foundChampion.setChampionName(championToUpdate.getChampionName());
            if(championToUpdate.getChampionImage() != null) foundChampion.setChampionImage(championToUpdate.getChampionImage());
            champions.save(foundChampion);
            return "Champion updated";
        }).orElse("Champion not found");
    }

    @DeleteMapping("/champion/{id}")
    public void deleteChampion(@PathVariable Long id) {
        champions.deleteById(id);
    }

}
