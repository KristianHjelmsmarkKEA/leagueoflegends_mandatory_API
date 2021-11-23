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
}
