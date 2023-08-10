package com.projectnight.entity.practice;

import com.projectnight.entity.songs.Chords;

import javax.persistence.*;

@Entity
@Table(name = "chord_changes")
public class ChordChanges {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "change_from_root_order", referencedColumnName = "chord_root_order"),
            @JoinColumn(name = "change_from_key_id", referencedColumnName = "chord_key_id")
    })
    private Chords changeFrom;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "change_to_root_order", referencedColumnName = "chord_root_order"),
            @JoinColumn(name = "change_to_key_id", referencedColumnName = "chord_key_id")
    })
    private Chords changeTo;


    @ManyToOne
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private Topics topic;

    public ChordChanges() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Chords getChangeFrom() {
        return changeFrom;
    }

    public void setChangeFrom(Chords changeFrom) {
        this.changeFrom = changeFrom;
    }

    public Chords getChangeTo() {
        return changeTo;
    }

    public void setChangeTo(Chords changeTo) {
        this.changeTo = changeTo;
    }

    public Topics getTopic() {
        return topic;
    }

    public void setTopic(Topics topic) {
        this.topic = topic;
    }
}
