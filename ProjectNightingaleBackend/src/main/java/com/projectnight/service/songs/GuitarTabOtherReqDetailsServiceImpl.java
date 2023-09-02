package com.projectnight.service.songs;

import com.projectnight.entity.songs.GuitarTabOtherReqDetails;
import com.projectnight.entity.songs.SongTabs;
import com.projectnight.repository.songs.GuitarTabOtherReqDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class GuitarTabOtherReqDetailsServiceImpl implements GuitarTabOtherReqDetailsService{

    private final SongTabsService songTabsService;
    private final GuitarTabOtherReqDetailsRepository guitarTabOtherReqDetailsRepository;

    @Autowired
    public GuitarTabOtherReqDetailsServiceImpl(SongTabsService songTabsService, GuitarTabOtherReqDetailsRepository guitarTabOtherReqDetailsRepository) {
        this.songTabsService = songTabsService;
        this.guitarTabOtherReqDetailsRepository = guitarTabOtherReqDetailsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<GuitarTabOtherReqDetails> getAllGuitarTabOtherReqDetails() {
        return guitarTabOtherReqDetailsRepository.findAll();
    }

    @Override
    @Transactional("songsTransactionManager")
    public GuitarTabOtherReqDetails saveGuitarTabOtherReqDetails(UUID songTabId, GuitarTabOtherReqDetails guitarTabOtherReqDetails) {
        SongTabs songTab = songTabsService.getSongTabById(songTabId);
        guitarTabOtherReqDetails.setSongTab(songTab);
        return guitarTabOtherReqDetailsRepository.save(guitarTabOtherReqDetails);
    }
}
