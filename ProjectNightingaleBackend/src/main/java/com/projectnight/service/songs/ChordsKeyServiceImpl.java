package com.projectnight.service.songs;

import com.projectnight.entity.songs.ChordKeys;
import com.projectnight.repository.songs.ChordKeysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChordsKeyServiceImpl implements ChordsKeysService {

    private final ChordKeysRepository chordKeysRepository;

    @Autowired
    public ChordsKeyServiceImpl(ChordKeysRepository chordKeysRepository) {
        this.chordKeysRepository = chordKeysRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public ChordKeys getChordKeyById(int id){
        return this.chordKeysRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chord key not found.");
                        }
                );
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<ChordKeys> getAllChordKeys(){
        return this.chordKeysRepository.findAll();
    }
}
