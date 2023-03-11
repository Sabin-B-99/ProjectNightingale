package com.projectnight.entity.practiceroutines;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;

@Entity
@Table(name = "chord_progressions")
public class ChordProgressions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToMany(mappedBy = "progressions")
    private List<ChordsUsed> chordsUsed;

    @ManyToOne
    @JoinColumn(name = "topic_id_fk")
    private Topic topic;

    @Column(name = "time")
    private Time time;

    public ChordProgressions() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<ChordsUsed> getChordsUsed() {
        return chordsUsed;
    }

    public void setChordsUsed(List<ChordsUsed> chordsUsed) {
        this.chordsUsed = chordsUsed;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
