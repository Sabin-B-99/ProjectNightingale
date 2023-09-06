package com.projectnight.entity.songs;


import javax.persistence.*;

@Entity
@Table(name = "harmonica_types")
public class HarmonicaTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "harmonica_type")
    private String harmonicaType;

    public HarmonicaTypes() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHarmonicaType() {
        return harmonicaType;
    }

    public void setHarmonicaType(String harmonicaType) {
        this.harmonicaType = harmonicaType;
    }
}
