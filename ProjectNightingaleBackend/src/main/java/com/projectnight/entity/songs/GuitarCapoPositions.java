package com.projectnight.entity.songs.primarykeys;

import javax.persistence.*;

@Entity
@Table(name = "guitar_capo_positions")
public class GuitarCapoPositions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "capo_position")
    private String capoPosition;

    public GuitarCapoPositions() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCapoPosition() {
        return capoPosition;
    }

    public void setCapoPosition(String capoPosition) {
        this.capoPosition = capoPosition;
    }
}
