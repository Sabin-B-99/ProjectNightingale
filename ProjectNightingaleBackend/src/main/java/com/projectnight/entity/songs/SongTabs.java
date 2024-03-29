package com.projectnight.entity.songs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectnight.entity.users.Users;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @Column(name = "tab_type")
    private String tabType;

    @Column(name = "creator_username")
    private String username;

    @Column(name = "date_created")
    private LocalDateTime creationDateTime;

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

    @OneToOne(mappedBy = "songTab", fetch = FetchType.LAZY)
    @JsonIgnore
    private HarmonicaTabLyrics harmonicaTabLyrics;

    @OneToMany(mappedBy = "songTab", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TabRatings> rating;

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

    public HarmonicaTabLyrics getHarmonicaTabLyrics() {
        return harmonicaTabLyrics;
    }

    public void setHarmonicaTabLyrics(HarmonicaTabLyrics harmonicaTabLyrics) {
        this.harmonicaTabLyrics = harmonicaTabLyrics;
    }

    public String getTabType() {
        return tabType;
    }

    public void setTabType(String tabType) {
        this.tabType = tabType;
    }

    public List<TabRatings> getRating() {
        return rating;
    }

    public void setRating(List<TabRatings> rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
