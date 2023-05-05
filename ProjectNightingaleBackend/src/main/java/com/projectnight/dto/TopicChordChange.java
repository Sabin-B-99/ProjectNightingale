package com.projectnight.dto;

import java.time.LocalTime;

public class TopicChordChange {
    private String chordFrom;
    private String chordTo;
    private LocalTime changeTime;

    public TopicChordChange(String chordFrom, String chordTo, LocalTime changeTime) {
        this.chordFrom = chordFrom;
        this.chordTo = chordTo;
        this.changeTime = changeTime;
    }

    public String getChordFrom() {
        return chordFrom;
    }

    public void setChordFrom(String chordFrom) {
        this.chordFrom = chordFrom;
    }

    public String getChordTo() {
        return chordTo;
    }

    public void setChordTo(String chordTo) {
        this.chordTo = chordTo;
    }

    public LocalTime getChangeTime() {
        return changeTime;
    }

    public void setChangeTime(LocalTime changeTime) {
        this.changeTime = changeTime;
    }
}
