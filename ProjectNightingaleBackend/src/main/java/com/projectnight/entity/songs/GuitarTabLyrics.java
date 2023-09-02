package com.projectnight.entity.songs;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "guitar_tab_lyrics")
public class GuitarTabLyrics {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;


    @Column(name = "lyrics")
    private String lyrics;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_tab_id", referencedColumnName = "id")
    private SongTabs songTab;

    public GuitarTabLyrics() {
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
