package riot.mandatory.leagueoflegends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import riot.mandatory.leagueoflegends.models.Summoner;

public interface SummonerRepository extends JpaRepository<Summoner, Long> {
}
