package com.projectnight.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PracticeTopicItemsId implements Serializable {
    private int topicIdFk;
    private int chordChangesIdFk;
    private int chordProgressionsIdFk;
    private int chordsIdFk;

    public PracticeTopicItemsId() {
    }

    public PracticeTopicItemsId(int topicIdFk, int chordChangesIdFk, int chordProgressionsIdFk, int chordsIdFk) {
        this.topicIdFk = topicIdFk;
        this.chordChangesIdFk = chordChangesIdFk;
        this.chordProgressionsIdFk = chordProgressionsIdFk;
        this.chordsIdFk = chordsIdFk;
    }

    public int getTopicIdFk() {
        return topicIdFk;
    }

    public void setTopicIdFk(int topicIdFk) {
        this.topicIdFk = topicIdFk;
    }

    public int getChordChangesIdFk() {
        return chordChangesIdFk;
    }

    public void setChordChangesIdFk(int chordChangesIdFk) {
        this.chordChangesIdFk = chordChangesIdFk;
    }

    public int getChordProgressionsIdFk() {
        return chordProgressionsIdFk;
    }

    public void setChordProgressionsIdFk(int chordProgressionsIdFk) {
        this.chordProgressionsIdFk = chordProgressionsIdFk;
    }

    public int getChordsIdFk() {
        return chordsIdFk;
    }

    public void setChordsIdFk(int chordsIdFk) {
        this.chordsIdFk = chordsIdFk;
    }
}
