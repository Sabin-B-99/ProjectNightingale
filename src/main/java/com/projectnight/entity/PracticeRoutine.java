package com.projectnight.entity;

import javax.persistence.*;
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
    private List<PracticeTopicItems> practiceTopics;

    @OneToMany
    @JoinColumns(
            {
                    @JoinColumn(name = "topics_id_fk", referencedColumnName = "topics_id_fk"),
                    @JoinColumn(name = "chord_changes_id_fk", referencedColumnName = "chord_changes_id_fk"),
                    @JoinColumn(name = "chord_progressions_id_fk", referencedColumnName = "chord_progressions_id_fk"),
                    @JoinColumn(name = "chords_id_fk", referencedColumnName = "chords_id_fk")
            }
    )
    private List<PracticeTopicItems> practiceItems;


    public PracticeRoutine() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
