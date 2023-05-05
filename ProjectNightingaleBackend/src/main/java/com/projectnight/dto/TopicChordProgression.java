package com.projectnight.dto;


import java.time.LocalTime;
import java.util.List;

public class TopicChordProgression {
    private List<String> chords;
    private LocalTime progressionTime;

    public TopicChordProgression(List<String> chords, LocalTime progressionTime) {
        this.chords = chords;
        this.progressionTime = progressionTime;
    }

    public List<String> getChords() {
        return chords;
    }

    public void setChords(List<String> chords) {
        this.chords = chords;
    }

    public LocalTime getProgressionTime() {
        return progressionTime;
    }

    public void setProgressionTime(LocalTime progressionTime) {
        this.progressionTime = progressionTime;
    }
}
