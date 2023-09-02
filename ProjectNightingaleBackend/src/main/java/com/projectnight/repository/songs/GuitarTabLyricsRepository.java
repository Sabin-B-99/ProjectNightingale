package com.projectnight.repository.songs;

import com.projectnight.entity.songs.GuitarTabLyrics;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface GuitarTabLyricsRepository extends CrudRepository<GuitarTabLyrics, UUID> {
}
