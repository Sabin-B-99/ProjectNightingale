package com.projectnight.service.songs;

import com.projectnight.entity.songs.HarmonicaTabLyrics;
import com.projectnight.entity.songs.SongTabs;
import com.projectnight.repository.songs.HarmonicaTabLyricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class HarmonicaTabLyricsServiceImpl implements HarmonicaTabLyricsService{

    private final HarmonicaTabLyricsRepository harmonicaTabLyricsRepository;
    private final SongTabsService songTabsService;

    @Autowired
    public HarmonicaTabLyricsServiceImpl(HarmonicaTabLyricsRepository harmonicaTabLyricsRepository, SongTabsService songTabsService) {
        this.harmonicaTabLyricsRepository = harmonicaTabLyricsRepository;
        this.songTabsService = songTabsService;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<HarmonicaTabLyrics> getAllHarmonicaTabLyrics() {
        return harmonicaTabLyricsRepository.findAll();
    }

    @Override
    @Transactional("songsTransactionManager")
    public HarmonicaTabLyrics saveHarmonicaTabLyrics(UUID songTabId, HarmonicaTabLyrics harmonicaTabLyrics) {
        SongTabs songTab = songTabsService.getSongTabById(songTabId);
        harmonicaTabLyrics.setSongTab(songTab);
        return harmonicaTabLyricsRepository.save(harmonicaTabLyrics);
    }
}
