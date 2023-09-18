package com.projectnight.entity.songs;

import com.projectnight.entity.songs.primarykeys.ChordsPK;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "chords")
public class Chords {

    @EmbeddedId
    private ChordsPK id;

    @Column(name = "image_file_name")
    private String imageFileName;

    @Column(name = "chord_root_name")
    private String chordRootName;

    @Column(name = "chord_key_name")
    private String chordKeyName;

    public Chords() {
    }

    public ChordsPK getId() {
        return id;
    }

    public void setId(ChordsPK id) {
        this.id = id;
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }

    public String getChordRootName() {
        return chordRootName;
    }

    public void setChordRootName(String chordRootName) {
        this.chordRootName = chordRootName;
    }

    public String getChordKeyName() {
        return chordKeyName;
    }

    public void setChordKeyName(String chordKeyName) {
        this.chordKeyName = chordKeyName;
    }
}
