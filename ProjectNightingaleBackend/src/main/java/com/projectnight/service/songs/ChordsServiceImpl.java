package com.projectnight.service.songs;

import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import com.projectnight.repository.songs.ChordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChordsServiceImpl implements ChordsService{

    private final ChordsRepository chordsRepository;

    @Autowired
    public ChordsServiceImpl(ChordsRepository chordsRepository) {
        this.chordsRepository = chordsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public Chords getChordById(ChordsPK id) {
        return this.chordsRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chord not found.");
                        }
                );
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<Chords> getAllChords() {
        return this.chordsRepository.findAll();
    }
}
