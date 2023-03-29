package com.projectnight.entity.practiceroutines;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "chords")
public class Chords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;


    @OneToMany(mappedBy = "from")
    private List<ChordChanges> from;

    @OneToMany(mappedBy = "to")
    private List<ChordChanges> to;

    @OneToMany(mappedBy = "chords")
    private List<ChordProgressions> progressionsAssoc;

    @OneToMany(mappedBy = "chords")
    private List<TopicChords> topicAssoc;

    public Chords() {
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

    public List<ChordChanges> getFrom() {
        return from;
    }

    public void setFrom(List<ChordChanges> from) {
        this.from = from;
    }

    public List<ChordChanges> getTo() {
        return to;
    }

    public void setTo(List<ChordChanges> to) {
        this.to = to;
    }

    public List<ChordProgressions> getProgressionsAssoc() {
        return progressionsAssoc;
    }

    public void setProgressionsAssoc(List<ChordProgressions> progressionsAssoc) {
        this.progressionsAssoc = progressionsAssoc;
    }

    public List<TopicChords> getTopicAssoc() {
        return topicAssoc;
    }

    public void setTopicAssoc(List<TopicChords> topicAssoc) {
        this.topicAssoc = topicAssoc;
    }
}
