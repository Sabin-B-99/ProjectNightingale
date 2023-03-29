package com.projectnight.entity.practiceroutines;

import com.projectnight.entity.practiceroutines.embeddedPK.TopicChordChangesPK;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "topic_chord_changes")
public class TopicChordChanges {

    @EmbeddedId
    private TopicChordChangesPK id;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    @MapsId("topicId")
    private Topics topics;

    @ManyToOne
    @JoinColumn(name = "changes_id")
    @MapsId("changesId")
    private ChordChanges chordChanges;

    @Column(name = "time")
    private LocalTime time;

    public TopicChordChanges() {
    }

    public TopicChordChangesPK getId() {
        return id;
    }

    public void setId(TopicChordChangesPK id) {
        this.id = id;
    }

    public Topics getTopics() {
        return topics;
    }

    public void setTopics(Topics topics) {
        this.topics = topics;
    }

    public ChordChanges getChordChanges() {
        return chordChanges;
    }

    public void setChordChanges(ChordChanges chordChanges) {
        this.chordChanges = chordChanges;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}
