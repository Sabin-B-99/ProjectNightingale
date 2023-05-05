package com.projectnight.entity.practiceroutines;

import com.projectnight.entity.practiceroutines.embeddedPK.TopicChordsPK;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "topic_chords")
public class TopicChords {
    @EmbeddedId
    private TopicChordsPK id;

    @ManyToOne
    @MapsId("topicId")
    @JoinColumn(name = "topic_id")
    private Topics topics;

    @ManyToOne
    @MapsId("chordsId")
    @JoinColumn(name = "chords_id")
    private Chords chords;

    @Column(name = "time")
    private LocalTime time;

    public TopicChords() {
    }

    public TopicChordsPK getId() {
        return id;
    }

    public void setId(TopicChordsPK id) {
        this.id = id;
    }

    public Topics getTopics() {
        return topics;
    }

    public void setTopics(Topics topics) {
        this.topics = topics;
    }

    public Chords getChords() {
        return chords;
    }

    public void setChords(Chords chords) {
        this.chords = chords;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}
