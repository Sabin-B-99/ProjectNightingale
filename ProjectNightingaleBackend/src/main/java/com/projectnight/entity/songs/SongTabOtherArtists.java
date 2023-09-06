package com.projectnight.entity.songs;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "song_tab_other_artists")
public class SongTabOtherArtists {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "uuid-char")
    @Column(name = "id")
    private UUID id;

    @Column(name = "join_word")
    private String joinWord;

    @Column(name = "other_artist_name")
    private String otherArtistName;


    @ManyToOne
    @JoinColumn(name = "song_tab_id", referencedColumnName = "id")
    private SongTabs songTab;

    public SongTabOtherArtists() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getJoinWord() {
        return joinWord;
    }

    public void setJoinWord(String joinWord) {
        this.joinWord = joinWord;
    }

    public String getOtherArtistName() {
        return otherArtistName;
    }

    public void setOtherArtistName(String otherArtistName) {
        this.otherArtistName = otherArtistName;
    }

    public SongTabs getSongTab() {
        return songTab;
    }

    public void setSongTab(SongTabs songTab) {
        this.songTab = songTab;
    }
}
