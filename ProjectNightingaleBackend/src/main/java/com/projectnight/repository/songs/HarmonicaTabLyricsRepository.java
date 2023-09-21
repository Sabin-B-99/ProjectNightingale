package com.projectnight.repository.songs;

import com.projectnight.entity.songs.HarmonicaTabLyrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface HarmonicaTabLyricsRepository extends JpaRepository<HarmonicaTabLyrics, UUID> {
    @Query("FROM HarmonicaTabLyrics WHERE songTab.id = :id")
    List<HarmonicaTabLyrics> getHarmonicaTabLyricsByTabId(@Param("id") UUID id);
}
