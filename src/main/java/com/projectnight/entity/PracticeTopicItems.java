package com.projectnight.entity;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "practice_topic_items")
public class PracticeTopicItems {

    @EmbeddedId
    private PracticeTopicItemsId id;


    @Column(name = "related_link")
    private String relatedLink;

    @Column(name = "time")
    private Time time;

    public PracticeTopicItems() {
    }

    public PracticeTopicItemsId getId() {
        return id;
    }

    public void setId(PracticeTopicItemsId id) {
        this.id = id;
    }

    public String getRelatedLink() {
        return relatedLink;
    }

    public void setRelatedLink(String relatedLink) {
        this.relatedLink = relatedLink;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
