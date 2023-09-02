package com.projectnight.service.songs;

import com.projectnight.entity.songs.HarmonicaTabLyrics;

import java.util.List;
import java.util.UUID;

public interface HarmonicaTabLyricsService {
    List<HarmonicaTabLyrics> getAllHarmonicaTabLyrics();
    HarmonicaTabLyrics saveHarmonicaTabLyrics(UUID songTabId, HarmonicaTabLyrics harmonicaTabLyrics);
}
