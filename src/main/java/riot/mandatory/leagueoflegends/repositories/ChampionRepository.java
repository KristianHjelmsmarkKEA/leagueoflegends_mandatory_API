package riot.mandatory.leagueoflegends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import riot.mandatory.leagueoflegends.models.Champion;

public interface ChampionRepository extends JpaRepository<Champion, Long> {
}
