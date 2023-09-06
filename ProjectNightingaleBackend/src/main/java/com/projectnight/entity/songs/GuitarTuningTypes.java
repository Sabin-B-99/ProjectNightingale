package com.projectnight.entity.songs;

import javax.persistence.*;

@Entity
@Table(name = "guitar_tuning_types")
public class GuitarTuningTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "tuning")
    private String tuning;

    public GuitarTuningTypes() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTuning() {
        return tuning;
    }

    public void setTuning(String tuning) {
        this.tuning = tuning;
    }
}
