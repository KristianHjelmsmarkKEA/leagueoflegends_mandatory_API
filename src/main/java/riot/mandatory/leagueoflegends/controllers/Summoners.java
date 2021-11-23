package riot.mandatory.leagueoflegends.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import riot.mandatory.leagueoflegends.models.Summoner;
import riot.mandatory.leagueoflegends.repositories.SummonerRepository;

@RestController
public class Summoners {

    @Autowired
    SummonerRepository summoners;

    @GetMapping("/summoners")
    public Iterable<Summoner> getSummoner() {
        return summoners.findAll();
    }

    @GetMapping("/summoners/{id}")
    public Summoner getSummoner(@PathVariable Long id) {
        return summoners.findById(id).get();
    }

    @PostMapping("/summoners")
    public Summoner addSummoner(@RequestBody Summoner newSummoner) {
        return summoners.save(newSummoner);
    }

    @PutMapping("/summoner/{id}")
    public String updateSummoner(@PathVariable Long id, @RequestBody Summoner summonerToUpdate){
        if(summoners.existsById(id)) {
            summonerToUpdate.setId(id);
            summoners.save(summonerToUpdate);
            return "Summoner was updated";
        } else {
            return "Summoner not found";
        }
    }

    @PatchMapping("/summoners/{id}")
    public String patchSummoner(@PathVariable Long id, @RequestBody Summoner summonerToUpdate) {
        return summoners.findById(id).map( foundSummoner -> {
            if(summonerToUpdate.getSummonerId() != null) foundSummoner.setSummonerId(summonerToUpdate.getName());
            if(summonerToUpdate.getPuuId() != null) foundSummoner.setPuuId(summonerToUpdate.getPuuId());
            if(summonerToUpdate.getName() != null) foundSummoner.setName(summonerToUpdate.getName());
            if(summonerToUpdate.getTier() != null) foundSummoner.setTier(summonerToUpdate.getTier());
            if(summonerToUpdate.getSoloRank() != null) foundSummoner.setSoloRank(summonerToUpdate.getSoloRank());
            if(summonerToUpdate.getLeaguePoints() != 0) foundSummoner.setLeaguePoints(summonerToUpdate.getLeaguePoints());
            summoners.save(foundSummoner);
            return "Summoner updated";
        }).orElse("Summoner not found");
    }

    @DeleteMapping("/summoner/{id}")
    public void deleteSummoner(@PathVariable Long id) {
        summoners.deleteById(id);
    }

}
