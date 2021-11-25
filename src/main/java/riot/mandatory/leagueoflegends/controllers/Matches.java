package riot.mandatory.leagueoflegends.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import riot.mandatory.leagueoflegends.models.Match;
import riot.mandatory.leagueoflegends.repositories.MatchRepository;

@RestController
public class Matches {

    @Autowired
    MatchRepository matches;

    @GetMapping("/matches")
    public Iterable<Match> getMatches() {
        return matches.findAll();
    }

    @GetMapping("/matches/{id}")
    public Match getMatch(@PathVariable Long id) {
        return matches.findById(id).get();
    }

    @PostMapping("/matches")
    public Match addMatch(@RequestBody Match newMatch) {
        newMatch.setId(null);
        return matches.save(newMatch);
    }

    @PutMapping("/matches/{id}")
    public String updateMatchById(@PathVariable Long id, @RequestBody Match matchToUpdateWith) {
        if (matches.existsById(id)) {
            matchToUpdateWith.setId(id);
            matches.save(matchToUpdateWith);
            return "Match was created";
        } else {
            return "Match not found";
        }
    }

    @PatchMapping("/matches/{id}")
    public String patchMatchById(@PathVariable Long id, @RequestBody Match matchToUpdateWith) {
        return matches.findById(id).map(foundMatch -> {
            if (matchToUpdateWith.getGameResult() != null) foundMatch.setGameResult(matchToUpdateWith.getGameResult());
            if (matchToUpdateWith.getKills() != 0) foundMatch.setKills(matchToUpdateWith.getKills());
            if (matchToUpdateWith.getDeaths() != 0) foundMatch.setDeaths(matchToUpdateWith.getDeaths());
            if (matchToUpdateWith.getAssists() != 0) foundMatch.setAssists(matchToUpdateWith.getAssists());
            if (matchToUpdateWith.getUltCasts() != 0) foundMatch.setUltCasts(matchToUpdateWith.getUltCasts());
            matches.save(foundMatch);
            return "Match updated";
        }).orElse("Match not found");
    }

    @DeleteMapping("/matches/{id}")
    public void deleteMatchById(@PathVariable Long id) {
        matches.deleteById(id);
    }

}
