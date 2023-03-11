package com.projectnight.entity.practiceroutines;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;

@Entity
@Table(name = "topic")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "time")
    private Time time;

    @OneToMany(mappedBy = "topic")
    private List<ChordsUsed> chordsUsed;

    @OneToMany(mappedBy = "topic")
    private List<ChordProgressions> chordProgressions;

    @OneToMany(mappedBy = "topic")
    private List<ChordChanges> chordChanges;

    @ManyToOne
    @JoinColumn(name = "routine_id_fk")
    private Routine routine;

    public Topic() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public List<ChordsUsed> getChordsUsed() {
        return chordsUsed;
    }

    public void setChordsUsed(List<ChordsUsed> chordsUsed) {
        this.chordsUsed = chordsUsed;
    }

    public List<ChordProgressions> getChordProgressions() {
        return chordProgressions;
    }

    public void setChordProgressions(List<ChordProgressions> chordProgressions) {
        this.chordProgressions = chordProgressions;
    }

    public List<ChordChanges> getChordChanges() {
        return chordChanges;
    }

    public void setChordChanges(List<ChordChanges> chordChanges) {
        this.chordChanges = chordChanges;
    }

    public Routine getRoutine() {
        return routine;
    }

    public void setRoutine(Routine routine) {
        this.routine = routine;
    }
}
