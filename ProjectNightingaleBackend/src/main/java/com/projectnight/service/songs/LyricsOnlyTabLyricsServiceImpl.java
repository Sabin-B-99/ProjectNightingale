package com.projectnight.service.songs;

import com.projectnight.entity.songs.LyricsOnlyTabLyrics;
import com.projectnight.entity.songs.SongTabs;
import com.projectnight.repository.songs.LyricsOnlyTabLyricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class LyricsOnlyTabLyricsServiceImpl implements LyricsOnlyTabLyricsService {

    private final SongTabsService songTabsService;
    private final LyricsOnlyTabLyricsRepository lyricsOnlyTabLyricsRepository;

    @Autowired
    public LyricsOnlyTabLyricsServiceImpl(SongTabsService songTabsService, LyricsOnlyTabLyricsRepository lyricsOnlyTabLyricsRepository) {
        this.songTabsService = songTabsService;
        this.lyricsOnlyTabLyricsRepository = lyricsOnlyTabLyricsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<LyricsOnlyTabLyrics> getAllLyrics() {
        return lyricsOnlyTabLyricsRepository.findAll();
    }

    @Override
    @Transactional("songsTransactionManager")
    public LyricsOnlyTabLyrics saveLyrics(UUID songTabId, LyricsOnlyTabLyrics lyricsOnlyTabLyrics) {
        SongTabs songTab = songTabsService.getSongTabById(songTabId);
        lyricsOnlyTabLyrics.setSongTab(songTab);
        return lyricsOnlyTabLyricsRepository.save(lyricsOnlyTabLyrics);
    }

    @Override
    @Transactional("songsTransactionManager")
    public LyricsOnlyTabLyrics getLyricsByTabId(UUID songTabId) {
        return lyricsOnlyTabLyricsRepository.getLyricsByTabId(songTabId);
    }
}
