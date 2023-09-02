package com.projectnight.repository.songs;

import com.projectnight.entity.songs.LyricsOnlyTabLyrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LyricsOnlyTabLyricsRepository extends JpaRepository<LyricsOnlyTabLyrics, UUID> {
}
