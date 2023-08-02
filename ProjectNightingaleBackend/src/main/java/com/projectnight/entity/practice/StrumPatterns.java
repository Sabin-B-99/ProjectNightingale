package com.projectnight.entity.practice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "strum_patterns")
public class StrumPatterns {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "pattern")
    private String pattern;

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
}
