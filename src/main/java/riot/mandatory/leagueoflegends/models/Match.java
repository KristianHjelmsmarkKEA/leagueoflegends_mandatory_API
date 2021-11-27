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
    private String summonerName;

    @Column
    private String matchPuuId;

    @Column
    private String matchId;

    @Column
    private boolean gameResult;

    @Column
    private int kills;

    @Column
    private int deaths;

    @Column
    private int assists;

    @Column
    private int ultCasts;

    @Column
    private String champName;

    @Column
    private int matchDur;
}
