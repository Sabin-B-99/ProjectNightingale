package com.projectnight.repository.songs;

import com.projectnight.entity.songs.HarmonicaTabLyrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HarmonicaTabLyricsRepository extends JpaRepository<HarmonicaTabLyrics, UUID> {
}
