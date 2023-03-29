package com.projectnight.entity.practiceroutines;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "progressions")
public class Progressions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "no_of_chords")
    private int noOfChords;

    @OneToMany(mappedBy = "progressions")
    private List<ChordProgressions> chordsAssoc;

    @OneToMany(mappedBy = "progressions")
    private List<TopicProgressions> topicsAssoc;

    public Progressions() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNoOfChords() {
        return noOfChords;
    }

    public void setNoOfChords(int noOfChords) {
        this.noOfChords = noOfChords;
    }

    public List<ChordProgressions> getChordsAssoc() {
        return chordsAssoc;
    }

    public void setChordsAssoc(List<ChordProgressions> chordsAssoc) {
        this.chordsAssoc = chordsAssoc;
    }

    public List<TopicProgressions> getTopicsAssoc() {
        return topicsAssoc;
    }

    public void setTopicsAssoc(List<TopicProgressions> topicsAssoc) {
        this.topicsAssoc = topicsAssoc;
    }
}

