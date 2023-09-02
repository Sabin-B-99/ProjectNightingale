package com.projectnight.service.songs;

import com.projectnight.entity.songs.GuitarTabLyrics;

import java.util.List;
import java.util.UUID;

public interface GuitarTabLyricsService {
    List<GuitarTabLyrics> getAllGuitarTabLyrics();
    GuitarTabLyrics saveGuitarTabLyrics(UUID songTabId, GuitarTabLyrics guitarTabLyrics);
}
