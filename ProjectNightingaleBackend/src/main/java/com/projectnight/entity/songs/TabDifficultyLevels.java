package com.projectnight.entity.songs;


import javax.persistence.*;

@Entity
@Table(name = "tab_difficulty_levels")
public class TabDifficultyLevels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "difficulty")
    private String difficulty;

    public TabDifficultyLevels() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}
