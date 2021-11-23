package riot.mandatory.leagueoflegends.models;

import lombok.Data;

import javax.persistence.*;


@Data
@Table(name="summoners")
@Entity
public class Summoner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String summonerId;

    @Column
    private String puuId;

    @Column
    private String name;

    @Column
    private String tier;

    @Column
    private String rank;

    @Column
    private int leaguePoints;
}
