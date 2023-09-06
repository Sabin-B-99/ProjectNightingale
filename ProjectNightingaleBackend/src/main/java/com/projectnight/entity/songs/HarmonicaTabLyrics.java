package com.projectnight.entity.songs;

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

    @Column(name = "tab_cell_row_num")
    private int tabCellRowNum;

    @Column(name = "tab_cell_col_num")
    private int tabCellColNum;

    @Column(name = "tab_cell_value")
    private String tabCellValue;

    @ManyToOne
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

    public int getTabCellRowNum() {
        return tabCellRowNum;
    }

    public void setTabCellRowNum(int tabCellRowNum) {
        this.tabCellRowNum = tabCellRowNum;
    }

    public int getTabCellColNum() {
        return tabCellColNum;
    }

    public void setTabCellColNum(int tabCellColNum) {
        this.tabCellColNum = tabCellColNum;
    }

    public String getTabCellValue() {
        return tabCellValue;
    }

    public void setTabCellValue(String tabCellValue) {
        this.tabCellValue = tabCellValue;
    }

    public SongTabs getSongTab() {
        return songTab;
    }

    public void setSongTab(SongTabs songTab) {
        this.songTab = songTab;
    }
}
