package riot.mandatory.leagueoflegends.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import riot.mandatory.leagueoflegends.repositories.ChampionRepository;

@RestController
public class Champions {

    @Autowired
    ChampionRepository champions;
}
