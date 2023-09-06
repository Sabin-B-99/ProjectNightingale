package com.projectnight.service.songs;

import com.projectnight.entity.songs.OtherArtistsJoinPhrases;
import com.projectnight.repository.songs.OtherArtistsJoinPhrasesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OtherArtistsJoinPhrasesImpl implements OtherArtistsJoinPhrasesService {

    private final OtherArtistsJoinPhrasesRepository otherArtistsJoinPhrasesRepository;

    @Autowired
    public OtherArtistsJoinPhrasesImpl(OtherArtistsJoinPhrasesRepository otherArtistsJoinPhrasesRepository) {
        this.otherArtistsJoinPhrasesRepository = otherArtistsJoinPhrasesRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<OtherArtistsJoinPhrases> getAllOtherArtistsJoinPhrases() {
        return otherArtistsJoinPhrasesRepository.findAll();
    }
}
