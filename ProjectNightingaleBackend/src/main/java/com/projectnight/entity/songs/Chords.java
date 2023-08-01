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
}
