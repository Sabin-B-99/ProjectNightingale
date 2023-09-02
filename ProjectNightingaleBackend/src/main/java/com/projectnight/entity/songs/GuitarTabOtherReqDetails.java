package com.projectnight.entity.songs;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "guitar_tab_other_req_details")
public class GuitarTabOtherReqDetails {

    @Id
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;

    @Column(name = "tuning_type")
    private String tuningType;

    @Column(name = "capo_position")
    private String capoPosition;

    @Column(name = "difficulty")
    private String difficulty;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_tab_id", referencedColumnName = "id")
    private SongTabs songTab;


    public GuitarTabOtherReqDetails() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTuningType() {
        return tuningType;
    }

    public void setTuningType(String tuningType) {
        this.tuningType = tuningType;
    }

    public String getCapoPosition() {
        return capoPosition;
    }

    public void setCapoPosition(String capoPosition) {
        this.capoPosition = capoPosition;
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
