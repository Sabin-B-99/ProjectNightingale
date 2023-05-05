package com.projectnight.entity.practiceroutines.embeddedPK;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TopicProgressionsPK implements Serializable {

    @Column(name = "topic_id")
    private int topicId;

    @Column(name = "progressions_id")
    private int progressionsId;

    public TopicProgressionsPK() {
    }

    public TopicProgressionsPK(int topicId, int progressionsId) {
        this.topicId = topicId;
        this.progressionsId = progressionsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TopicProgressionsPK that = (TopicProgressionsPK) o;
        return topicId == that.topicId && progressionsId == that.progressionsId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(topicId, progressionsId);
    }
}
