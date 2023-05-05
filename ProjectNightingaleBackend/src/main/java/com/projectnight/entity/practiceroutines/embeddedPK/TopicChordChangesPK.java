package com.projectnight.entity.practiceroutines.embeddedPK;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TopicChordChangesPK implements Serializable {

    @Column(name = "topic_id")
    private int topicId;

    @Column(name = "changes_id")
    private int changesId;

    public TopicChordChangesPK() {
    }

    public TopicChordChangesPK(int topicId, int changesId) {
        this.topicId = topicId;
        this.changesId = changesId;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public int getChangesId() {
        return changesId;
    }

    public void setChangesId(int changesId) {
        this.changesId = changesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TopicChordChangesPK that = (TopicChordChangesPK) o;
        return topicId == that.topicId && changesId == that.changesId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(topicId, changesId);
    }
}
