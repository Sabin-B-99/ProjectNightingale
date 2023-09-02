package com.projectnight.repository.songs;

import com.projectnight.entity.songs.GuitarTabLyrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GuitarTabLyricsRepository extends JpaRepository<GuitarTabLyrics, UUID> {
}
