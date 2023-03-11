package com.projectnight.entity.practiceroutines;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "chord_changes")
public class ChordChanges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToOne
    @JoinColumn(name = "from_chords_used_fk")
    private ChordsUsed from;

    @OneToOne
    @JoinColumn(name = "to_chords_used_fk")
    private ChordsUsed to;

    @Column(name = "time")
    private Time time;

    @ManyToOne
    @JoinColumn(name = "topic_id_fk")
    private Topic topic;
    public ChordChanges() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ChordsUsed getFrom() {
        return from;
    }

    public void setFrom(ChordsUsed from) {
        this.from = from;
    }

    public ChordsUsed getTo() {
        return to;
    }

    public void setTo(ChordsUsed to) {
        this.to = to;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}
