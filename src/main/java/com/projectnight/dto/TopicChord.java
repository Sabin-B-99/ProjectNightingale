package com.projectnight.dto;

import java.time.LocalTime;

public class TopicChord {
    private String chordName;
    LocalTime chordTime;

    public TopicChord(String chordName) {
        this.chordName = chordName;
    }

    public TopicChord(String chordName, LocalTime chordTime) {
        this.chordName = chordName;
        this.chordTime = chordTime;
    }

    public String getChordName() {
        return chordName;
    }

    public void setChordName(String chordName) {
        this.chordName = chordName;
    }

    public LocalTime getChordTime() {
        return chordTime;
    }

    public void setChordTime(LocalTime chordTime) {
        this.chordTime = chordTime;
    }
}
