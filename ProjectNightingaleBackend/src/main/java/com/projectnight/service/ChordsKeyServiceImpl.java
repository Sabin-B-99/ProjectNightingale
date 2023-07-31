package com.projectnight.service;

import com.projectnight.entity.ChordKeys;
import com.projectnight.repository.ChordKeysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ChordsKeyServiceImpl implements ChordsKeysService {

    private final ChordKeysRepository chordKeysRepository;

    @Autowired
    public ChordsKeyServiceImpl(ChordKeysRepository chordKeysRepository) {
        this.chordKeysRepository = chordKeysRepository;
    }

    @Override
    @Transactional
    public ChordKeys getChordKeyById(int id){
        return this.chordKeysRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chord key not found.");
                        }
                );
    }

    @Override
    @Transactional
    public List<ChordKeys> getAllChordKeys(){
        return this.chordKeysRepository.findAll();
    }
}
