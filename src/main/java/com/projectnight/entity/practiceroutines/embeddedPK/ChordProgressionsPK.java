package com.projectnight.entity.practiceroutines.embeddedPK;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChordProgressionsPK implements Serializable {

    @Column(name = "chord_id")
    private int chordId;

    @Column(name = "progression_id")
    private int progressionId;

    public ChordProgressionsPK() {
    }

    public ChordProgressionsPK(int chordId, int progressionId) {
        this.chordId = chordId;
        this.progressionId = progressionId;
    }

    public int getChordId() {
        return chordId;
    }

    public void setChordId(int chordId) {
        this.chordId = chordId;
    }

    public int getProgressionId() {
        return progressionId;
    }

    public void setProgressionId(int progressionId) {
        this.progressionId = progressionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChordProgressionsPK that = (ChordProgressionsPK) o;
        return chordId == that.chordId && progressionId == that.progressionId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(chordId, progressionId);
    }
}
