package com.projectnight.repository.songs;

import com.projectnight.entity.songs.HarmonicaTabLyrics;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface HarmonicaTabLyricsRepository extends CrudRepository<HarmonicaTabLyrics, UUID> {
}
