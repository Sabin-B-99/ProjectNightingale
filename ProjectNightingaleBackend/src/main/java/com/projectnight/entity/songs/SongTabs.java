package com.projectnight.entity.songs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "song_tabs")
public class SongTabs {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "uuid-char")
    @Column(name = "id")
    private UUID id;

    @Column(name = "song_title")
    private String songTitle;

    @Column(name = "artist_name")
    private String artistName;

    @OneToMany(mappedBy = "songTab", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SongTabOtherArtists> otherArtists;

    @OneToOne(mappedBy = "songTab", fetch = FetchType.LAZY)
    @JsonIgnore
    private HarmonicaTabOtherReqDetails harmonicaTabOtherReqDetails;

    @OneToOne(mappedBy = "songTab", fetch = FetchType.LAZY)
    @JsonIgnore
    private GuitarTabOtherReqDetails guitarTabOtherReqDetails;

    @OneToOne(mappedBy = "songTab", fetch = FetchType.LAZY)
    @JsonIgnore
    private GuitarTabLyrics guitarTabLyrics;

    @OneToOne(mappedBy = "songTab", fetch = FetchType.LAZY)
    @JsonIgnore
    private LyricsOnlyTabLyrics lyricsOnlyTabLyrics;

    @OneToMany(mappedBy = "songTab")
    @JsonIgnore
    private List<HarmonicaTabLyrics> harmonicaTabLyrics;

    public SongTabs() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSongTitle() {
        return songTitle;
    }

    public void setSongTitle(String songTitle) {
        this.songTitle = songTitle;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public List<SongTabOtherArtists> getOtherArtists() {
        return otherArtists;
    }

    public void setOtherArtists(List<SongTabOtherArtists> otherArtists) {
        this.otherArtists = otherArtists;
    }

    public HarmonicaTabOtherReqDetails getHarmonicaTabOtherReqDetails() {
        return harmonicaTabOtherReqDetails;
    }

    public void setHarmonicaTabOtherReqDetails(HarmonicaTabOtherReqDetails harmonicaTabOtherReqDetails) {
        this.harmonicaTabOtherReqDetails = harmonicaTabOtherReqDetails;
    }

    public GuitarTabOtherReqDetails getGuitarTabOtherReqDetails() {
        return guitarTabOtherReqDetails;
    }

    public void setGuitarTabOtherReqDetails(GuitarTabOtherReqDetails guitarTabOtherReqDetails) {
        this.guitarTabOtherReqDetails = guitarTabOtherReqDetails;
    }

    public GuitarTabLyrics getGuitarTabLyrics() {
        return guitarTabLyrics;
    }

    public void setGuitarTabLyrics(GuitarTabLyrics guitarTabLyrics) {
        this.guitarTabLyrics = guitarTabLyrics;
    }

    public LyricsOnlyTabLyrics getLyricsOnlyTabLyrics() {
        return lyricsOnlyTabLyrics;
    }

    public void setLyricsOnlyTabLyrics(LyricsOnlyTabLyrics lyricsOnlyTabLyrics) {
        this.lyricsOnlyTabLyrics = lyricsOnlyTabLyrics;
    }

    public List<HarmonicaTabLyrics> getHarmonicaTabLyrics() {
        return harmonicaTabLyrics;
    }

    public void setHarmonicaTabLyrics(List<HarmonicaTabLyrics> harmonicaTabLyrics) {
        this.harmonicaTabLyrics = harmonicaTabLyrics;
    }
}
