package riot.mandatory.leagueoflegends.models;


import lombok.Data;

import javax.persistence.*;

@Data
@Table(name="matches")
@Entity
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String matchId;

    @Column
    @Enumerated(value = EnumType.STRING)
    private GameResult gameResult;

    @Column
    private int kills;

    @Column
    private int deaths;

    @Column
    private int assists;

    @Column
    private int ultCasts;
}
