package com.projectnight.entity;

import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;

@Entity
@Table(name = "chords")
public class Chord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "chord_image_path")
    private String chordImagePath;

    @ManyToOne
    @JoinColumn(name = "chords_used_fk")
    private ChordsUsed chordsUsed;

    public Chord() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getChordImagePath() {
        return chordImagePath;
    }

    public void setChordImagePath(String chordImagePath) {
        this.chordImagePath = chordImagePath;
    }

    public ChordsUsed getChordsUsed() {
        return chordsUsed;
    }

    public void setChordsUsed(ChordsUsed chordsUsed) {
        this.chordsUsed = chordsUsed;
    }
}
