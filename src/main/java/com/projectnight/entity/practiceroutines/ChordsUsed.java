package com.projectnight.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name= "chords_used")
public class ChordsUsed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "chord_progressions_id_fk")
    private ChordProgressions progressions;

    @ManyToOne
    @JoinColumn(name = "topic_id_fk")
    private Topic topic;

    @OneToOne(mappedBy = "from")
    private ChordChanges from;

    @OneToOne(mappedBy = "to")
    private ChordChanges to;

    @OneToMany(mappedBy = "chordsUsed")
    private List<Chord> chords;

    public ChordsUsed() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ChordProgressions getProgressions() {
        return progressions;
    }

    public void setProgressions(ChordProgressions progressions) {
        this.progressions = progressions;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public ChordChanges getFrom() {
        return from;
    }

    public void setFrom(ChordChanges from) {
        this.from = from;
    }

    public ChordChanges getTo() {
        return to;
    }

    public void setTo(ChordChanges to) {
        this.to = to;
    }
}
