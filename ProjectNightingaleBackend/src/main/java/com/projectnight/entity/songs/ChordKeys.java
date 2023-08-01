package com.projectnight.entity.songs;

import javax.persistence.*;

@Entity
@Table(name = "chord_keys")
public class ChordKeys {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "key_name")
    private String keyName;

    public ChordKeys() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }
}
