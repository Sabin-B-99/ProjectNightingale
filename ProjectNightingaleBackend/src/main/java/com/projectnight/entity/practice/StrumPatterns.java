package com.projectnight.entity.practice;

import javax.persistence.*;

@Entity
@Table(name = "strum_patterns")
public class StrumPatterns {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "pattern")
    private String pattern;

    @ManyToOne
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private Topics topic;

    public StrumPatterns() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public Topics getTopic() {
        return topic;
    }

    public void setTopic(Topics topic) {
        this.topic = topic;
    }
}
