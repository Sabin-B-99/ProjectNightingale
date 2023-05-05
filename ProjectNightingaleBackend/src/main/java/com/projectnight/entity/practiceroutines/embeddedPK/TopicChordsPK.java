package com.projectnight.entity.practiceroutines.embeddedPK;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TopicChordsPK implements Serializable {

    @Column(name = "topic_id")
    private int topicId;

    @Column(name = "chords_id")
    private int chordsId;

    public TopicChordsPK() {
    }

    public TopicChordsPK(int topicId, int chordsId) {
        this.topicId = topicId;
        this.chordsId = chordsId;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public int getChordsId() {
        return chordsId;
    }

    public void setChordsId(int chordsId) {
        this.chordsId = chordsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TopicChordsPK that = (TopicChordsPK) o;
        return topicId == that.topicId && chordsId == that.chordsId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(topicId, chordsId);
    }
}
