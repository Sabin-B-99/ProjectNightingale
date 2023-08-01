package com.projectnight.entity.songs.primarykeys;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChordsPK implements Serializable {

    @Column(name = "chord_root_order")
    private int chordRootOrder;

    @Column(name = "chord_key_id")
    private int chordKeyId;

    public ChordsPK() {
    }

    public int getChordRootOrder() {
        return chordRootOrder;
    }

    public void setChordRootOrder(int chordRootOrder) {
        this.chordRootOrder = chordRootOrder;
    }

    public int getChordKeyId() {
        return chordKeyId;
    }

    public void setChordKeyId(int chordKeyId) {
        this.chordKeyId = chordKeyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChordsPK chordsPK = (ChordsPK) o;
        return chordRootOrder == chordsPK.chordRootOrder && chordKeyId == chordsPK.chordKeyId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(chordRootOrder, chordKeyId);
    }
}
