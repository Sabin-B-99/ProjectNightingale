package com.projectnight.entity;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;

@Entity
@Table(name = "chord_progressions")
public class ChordProgressions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToMany
    @Column(name = "chord")
    private List<Chord> chords;

    @Column(name = "time")
    private Time time;

    public ChordProgressions() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Chord> getChords() {
        return chords;
    }

    public void setChords(List<Chord> chords) {
        this.chords = chords;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
