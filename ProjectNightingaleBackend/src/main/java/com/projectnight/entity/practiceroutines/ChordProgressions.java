package com.projectnight.entity.practiceroutines;

import com.projectnight.entity.practiceroutines.embeddedPK.ChordProgressionsPK;

import javax.persistence.*;

@Entity
@Table(name = "chord_progressions")
public class ChordProgressions {

    @EmbeddedId
    private ChordProgressionsPK id;


    @ManyToOne
    @MapsId("chordId")
    @JoinColumn(name = "chord_id")
    private Chords chords;

    @ManyToOne
    @MapsId("progressionId")
    @JoinColumn(name = "progression_id")
    private Progressions progressions;

    @Column(name = "order")
    private int order;

    public ChordProgressions() {
    }

    public ChordProgressionsPK getId() {
        return id;
    }

    public void setId(ChordProgressionsPK id) {
        this.id = id;
    }

    public Chords getChords() {
        return chords;
    }

    public void setChords(Chords chords) {
        this.chords = chords;
    }

    public Progressions getProgressions() {
        return progressions;
    }

    public void setProgressions(Progressions progressions) {
        this.progressions = progressions;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
