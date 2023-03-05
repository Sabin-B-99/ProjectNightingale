package com.projectnight.entity;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;

@Entity
@Table(name = "practice_routine")
public class PracticeRoutine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToMany
    @Column(name = "topics")
    @JoinColumn(name = "practice_topic_id_fk")
    private List<PracticeTopic> practiceTopics;

    @Column(name = "time")
    private Time time;

    public PracticeRoutine() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<PracticeTopic> getPracticeTopics() {
        return practiceTopics;
    }

    public void setPracticeTopics(List<PracticeTopic> practiceTopics) {
        this.practiceTopics = practiceTopics;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
