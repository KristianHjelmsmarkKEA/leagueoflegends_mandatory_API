package riot.mandatory.leagueoflegends.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name="champions")
@Entity
public class Champion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String championId;

    @Column
    private String championName;

    @Column
    private String championImage;

}
