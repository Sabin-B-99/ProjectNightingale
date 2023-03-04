package com.projectnight.entity;

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
    @JoinColumn(name = "from_chord_id_fk")
    private Chord from;

    @OneToOne
    @JoinColumn(name = "to_chord_id_fk")
    private Chord to;

    @Column(name = "time")
    private Time time;

    public ChordChanges() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Chord getFrom() {
        return from;
    }

    public void setFrom(Chord from) {
        this.from = from;
    }

    public Chord getTo() {
        return to;
    }

    public void setTo(Chord to) {
        this.to = to;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
