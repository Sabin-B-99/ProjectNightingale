package com.projectnight.entity.songs;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "harmonica_tab_other_req_details")
public class HarmonicaTabOtherReqDetails {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type = "uuid-char")
    @Column(name = "id")
    private UUID id;


    @Column(name = "harmonica_type")
    private String harmonicaType;

    @Column(name = "harmonica_key")
    private String harmonicaKey;

    @Column(name = "difficulty")
    private String difficulty;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_tab_id", referencedColumnName = "id")
    private SongTabs songTab;

    public HarmonicaTabOtherReqDetails() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getHarmonicaType() {
        return harmonicaType;
    }

    public void setHarmonicaType(String harmonicaType) {
        this.harmonicaType = harmonicaType;
    }

    public String getHarmonicaKey() {
        return harmonicaKey;
    }

    public void setHarmonicaKey(String harmonicaKey) {
        this.harmonicaKey = harmonicaKey;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public SongTabs getSongTab() {
        return songTab;
    }

    public void setSongTab(SongTabs songTab) {
        this.songTab = songTab;
    }
}
