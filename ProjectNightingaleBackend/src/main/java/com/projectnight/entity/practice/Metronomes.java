package com.projectnight.entity.practice;


import javax.persistence.*;

@Entity
@Table(name = "metronomes")
public class Metronomes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "bpm")
    private int bpm;

    @Column(name = "beats_per_measure")
    private int beatsPerMeasure;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private Topics topics;

    public Metronomes() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBpm() {
        return bpm;
    }

    public void setBpm(int bpm) {
        this.bpm = bpm;
    }

    public int getBeatsPerMeasure() {
        return beatsPerMeasure;
    }

    public void setBeatsPerMeasure(int beatsPerMeasure) {
        this.beatsPerMeasure = beatsPerMeasure;
    }
}
