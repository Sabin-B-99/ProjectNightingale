package com.projectnight.entity.practiceroutines;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "topic")
public class Topics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;


    @OneToMany(mappedBy = "topics")
    @JsonIgnore
    private List<TopicChords> chordsAssoc;

    @OneToMany(mappedBy = "topics")
    @JsonIgnore
    private List<TopicChordChanges> chordChangesAssoc;


    @OneToMany(mappedBy = "topics")
    @JsonIgnore
    private List<TopicProgressions> progressionsAssoc;

    @OneToMany(mappedBy = "topics")
    @JsonIgnore
    private List<RoutineTopic> routinesAssoc;

    public Topics() {
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

    public List<TopicChords> getChordsAssoc() {
        return chordsAssoc;
    }

    public void setChordsAssoc(List<TopicChords> chordsAssoc) {
        this.chordsAssoc = chordsAssoc;
    }

    public List<TopicChordChanges> getChordChangesAssoc() {
        return chordChangesAssoc;
    }

    public void setChordChangesAssoc(List<TopicChordChanges> chordChangesAssoc) {
        this.chordChangesAssoc = chordChangesAssoc;
    }

    public List<TopicProgressions> getProgressionsAssoc() {
        return progressionsAssoc;
    }

    public void setProgressionsAssoc(List<TopicProgressions> progressionsAssoc) {
        this.progressionsAssoc = progressionsAssoc;
    }

    public List<RoutineTopic> getRoutinesAssoc() {
        return routinesAssoc;
    }

    public void setRoutinesAssoc(List<RoutineTopic> routinesAssoc) {
        this.routinesAssoc = routinesAssoc;
    }
}
