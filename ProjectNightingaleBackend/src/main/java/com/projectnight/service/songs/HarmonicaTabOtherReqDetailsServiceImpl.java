package com.projectnight.service.songs;

import com.projectnight.entity.songs.HarmonicaTabOtherReqDetails;
import com.projectnight.entity.songs.SongTabs;
import com.projectnight.repository.songs.HarmonicaTabOtherReqDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class HarmonicaTabOtherReqDetailsServiceImpl implements HarmonicaTabOtherReqDetailsService {

    private final SongTabsService songTabsService;
    private final HarmonicaTabOtherReqDetailsRepository harmonicaTabOtherReqDetailsRepository;

    @Autowired
    public HarmonicaTabOtherReqDetailsServiceImpl(SongTabsService songTabsService,
                                                  HarmonicaTabOtherReqDetailsRepository harmonicaTabOtherReqDetailsRepository) {
        this.songTabsService = songTabsService;
        this.harmonicaTabOtherReqDetailsRepository = harmonicaTabOtherReqDetailsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<HarmonicaTabOtherReqDetails> getAllOtherRequiredDetails() {
        return harmonicaTabOtherReqDetailsRepository.findAll();
    }

    @Override
    @Transactional("songsTransactionManager")
    public HarmonicaTabOtherReqDetails saveHarmonicaOtherReqDetails(UUID songTabId,
                                                                    HarmonicaTabOtherReqDetails harmonicaTabOtherReqDetails) {
        SongTabs songTab = songTabsService.getSongTabById(songTabId);
        harmonicaTabOtherReqDetails.setSongTab(songTab);
        return harmonicaTabOtherReqDetailsRepository.save(harmonicaTabOtherReqDetails);
    }
}
