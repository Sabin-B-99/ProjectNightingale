package com.projectnight.service.songs;

import com.projectnight.entity.songs.SongTabOtherArtists;
import com.projectnight.entity.songs.SongTabs;
import com.projectnight.repository.songs.SongTabOtherArtistsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class SongTabOtherArtistsServiceImpl implements SongTabOtherArtistsService{
    private final SongTabsService songTabsService;
    private final SongTabOtherArtistsRepository songTabOtherArtistsRepository;


    @Autowired
    public SongTabOtherArtistsServiceImpl(SongTabsService songTabsService, SongTabOtherArtistsRepository songTabOtherArtistsRepository) {
        this.songTabsService = songTabsService;
        this.songTabOtherArtistsRepository = songTabOtherArtistsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<SongTabOtherArtists> getAllContributingArtists() {
        return songTabOtherArtistsRepository.findAll();
    }

    @Override
    @Transactional("songsTransactionManager")
    public SongTabOtherArtists saveOtherContributingArtists(UUID songTabId, SongTabOtherArtists otherArtist) {
        SongTabs songTab = songTabsService.getSongTabById(songTabId);
        otherArtist.setSongTab(songTab);
        return songTabOtherArtistsRepository.save(otherArtist);
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<SongTabOtherArtists> getOtherContributingArtistsByTabId(UUID songTabId) {
        return songTabOtherArtistsRepository.findOtherContributingArtistsBySongTabId(songTabId);
    }
}
