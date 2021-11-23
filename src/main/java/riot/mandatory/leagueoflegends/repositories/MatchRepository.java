package riot.mandatory.leagueoflegends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import riot.mandatory.leagueoflegends.models.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
