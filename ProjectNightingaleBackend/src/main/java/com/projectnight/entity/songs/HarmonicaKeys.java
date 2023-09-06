package com.projectnight.entity.songs;

import javax.persistence.*;

@Entity
@Table(name = "harmonica_keys")
public class HarmonicaKeys {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "harmonica_key")
    private String harmonicaKey;

    public HarmonicaKeys() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHarmonicaKey() {
        return harmonicaKey;
    }

    public void setHarmonicaKey(String harmonicaKey) {
        this.harmonicaKey = harmonicaKey;
    }
}
