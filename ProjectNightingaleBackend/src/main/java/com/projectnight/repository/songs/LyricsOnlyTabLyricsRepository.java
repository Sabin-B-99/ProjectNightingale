package com.projectnight.repository.songs;

import com.projectnight.entity.songs.LyricsOnlyTabLyrics;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface LyricsOnlyTabLyricsRepository extends CrudRepository<LyricsOnlyTabLyrics, UUID> {
}
