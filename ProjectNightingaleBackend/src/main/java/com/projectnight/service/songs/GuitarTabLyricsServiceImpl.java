package com.projectnight.service.songs;

import com.projectnight.entity.songs.GuitarTabLyrics;
import com.projectnight.entity.songs.SongTabs;
import com.projectnight.repository.songs.GuitarTabLyricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class GuitarTabLyricsServiceImpl implements GuitarTabLyricsService{

    private final SongTabsService songTabsService;
    private final GuitarTabLyricsRepository guitarTabLyricsRepository;

    @Autowired
    public GuitarTabLyricsServiceImpl(SongTabsService songTabsService, GuitarTabLyricsRepository guitarTabLyricsRepository) {
        this.songTabsService = songTabsService;
        this.guitarTabLyricsRepository = guitarTabLyricsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<GuitarTabLyrics> getAllGuitarTabLyrics() {
        return guitarTabLyricsRepository.findAll();
    }

    @Override
    @Transactional("songsTransactionManager")
    public GuitarTabLyrics saveGuitarTabLyrics(UUID songTabId, GuitarTabLyrics guitarTabLyrics) {
        SongTabs songTab = songTabsService.getSongTabById(songTabId);
        guitarTabLyrics.setSongTab(songTab);
        return guitarTabLyricsRepository.save(guitarTabLyrics);
    }
}
