package com.projectnight.entity.practiceroutines;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectnight.entity.practiceroutines.embeddedPK.RoutineTopicPK;

import javax.persistence.*;

@Entity
@Table(name = "routine_topic")
public class RoutineTopic {
    @EmbeddedId
    private RoutineTopicPK id;

    @ManyToOne
    @JoinColumn(name = "routine_id")
    @MapsId("routineId")
    private Routines routines;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    @MapsId("topicId")
    private Topics topics;


    public RoutineTopic() {
    }

    public RoutineTopicPK getId() {
        return id;
    }

    public void setId(RoutineTopicPK id) {
        this.id = id;
    }

    public Routines getRoutines() {
        return routines;
    }

    public void setRoutines(Routines routines) {
        this.routines = routines;
    }

    public Topics getTopics() {
        return topics;
    }

    public void setTopics(Topics topics) {
        this.topics = topics;
    }
}
