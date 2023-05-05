package com.projectnight.entity.practiceroutines;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "chord_changes")
public class ChordChanges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "from_chord_id")
    private Chords from;

    @ManyToOne
    @JoinColumn(name = "to_chord_id")
    private Chords to;


    @OneToMany(mappedBy = "chordChanges")
    @JsonIgnore
    private List<TopicChordChanges> topicAssoc;

    public ChordChanges() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Chords getFrom() {
        return from;
    }

    public void setFrom(Chords from) {
        this.from = from;
    }

    public Chords getTo() {
        return to;
    }

    public void setTo(Chords to) {
        this.to = to;
    }

    public List<TopicChordChanges> getTopicAssoc() {
        return topicAssoc;
    }

    public void setTopicAssoc(List<TopicChordChanges> topicAssoc) {
        this.topicAssoc = topicAssoc;
    }
}
