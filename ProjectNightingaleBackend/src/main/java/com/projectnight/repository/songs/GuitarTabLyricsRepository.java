package com.projectnight.repository.songs;

import com.projectnight.entity.songs.GuitarTabLyrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface GuitarTabLyricsRepository extends JpaRepository<GuitarTabLyrics, UUID> {
    @Query("FROM GuitarTabLyrics WHERE songTab.id = :id")
    GuitarTabLyrics findGuitarTabLyricsByTabId(@Param("id") UUID id);
}
