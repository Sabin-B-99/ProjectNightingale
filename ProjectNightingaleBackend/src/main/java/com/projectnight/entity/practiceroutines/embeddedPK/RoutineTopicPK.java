package com.projectnight.entity.practiceroutines.embeddedPK;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class RoutineTopicPK implements Serializable {

    @Column(name = "routine_id")
    private int routineId;

    @Column(name = "topic_id")
    private int topicId;

    public RoutineTopicPK() {
    }

    public RoutineTopicPK(int routineId, int topicId) {
        this.routineId = routineId;
        this.topicId = topicId;
    }

    public int getRoutineId() {
        return routineId;
    }

    public void setRoutineId(int routineId) {
        this.routineId = routineId;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }
}
