package com.projectnight.repository.songs;

import com.projectnight.entity.songs.LyricsOnlyTabLyrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface LyricsOnlyTabLyricsRepository extends JpaRepository<LyricsOnlyTabLyrics, UUID> {
    @Query("FROM LyricsOnlyTabLyrics WHERE songTab.id = :songTabId")
    LyricsOnlyTabLyrics getLyricsByTabId(@Param("songTabId") UUID songTabId);
}
