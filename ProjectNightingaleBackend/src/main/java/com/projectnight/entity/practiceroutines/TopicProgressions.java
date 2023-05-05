package com.projectnight.entity.practiceroutines;

import com.projectnight.entity.practiceroutines.embeddedPK.TopicProgressionsPK;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "topic_progressions")
public class TopicProgressions {

    @EmbeddedId
    private TopicProgressionsPK id;


    @ManyToOne
    @JoinColumn(name = "topic_id")
    @MapsId("topicId")
    private Topics topics;

    @ManyToOne
    @JoinColumn(name = "progressions_id")
    @MapsId("progressionsId")
    private Progressions progressions;

    @Column(name = "time")
    private LocalTime time;

    public TopicProgressions() {
    }

    public TopicProgressionsPK getId() {
        return id;
    }

    public void setId(TopicProgressionsPK id) {
        this.id = id;
    }

    public Topics getTopics() {
        return topics;
    }

    public void setTopics(Topics topics) {
        this.topics = topics;
    }

    public Progressions getProgressions() {
        return progressions;
    }

    public void setProgressions(Progressions progressions) {
        this.progressions = progressions;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}
