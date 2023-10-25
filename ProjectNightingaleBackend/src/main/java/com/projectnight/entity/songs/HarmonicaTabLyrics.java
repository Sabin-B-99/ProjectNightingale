package com.projectnight.entity.songs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "harmonica_tab_lyrics")
public class HarmonicaTabLyrics {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator",strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "uuid-char")
    @Column(name = "id")
    private UUID id;

    @Column(name = "lyrics")
    private String lyrics;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "song_tab_id", referencedColumnName = "id")
    private SongTabs songTab;

    public HarmonicaTabLyrics() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }


    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public SongTabs getSongTab() {
        return songTab;
    }

    public void setSongTab(SongTabs songTab) {
        this.songTab = songTab;
    }
}
