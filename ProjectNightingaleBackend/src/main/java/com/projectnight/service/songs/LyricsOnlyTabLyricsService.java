package com.projectnight.service.songs;

import com.projectnight.entity.songs.LyricsOnlyTabLyrics;

import java.util.List;
import java.util.UUID;

public interface LyricsOnlyTabLyricsService {
    List<LyricsOnlyTabLyrics> getAllLyrics();
    LyricsOnlyTabLyrics saveLyrics(UUID songTabId, LyricsOnlyTabLyrics lyricsOnlyTabLyrics);

    LyricsOnlyTabLyrics getLyricsByTabId(UUID songTabId);
}
