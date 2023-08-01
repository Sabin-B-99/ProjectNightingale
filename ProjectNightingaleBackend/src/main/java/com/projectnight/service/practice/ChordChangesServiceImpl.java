package com.projectnight.service.practice;

import com.projectnight.entity.practice.ChordChanges;
import com.projectnight.repository.practice.ChordChangesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChordChangesServiceImpl implements ChordChangesService {

    private final ChordChangesRepository chordChangesRepository;

    @Autowired
    public ChordChangesServiceImpl(ChordChangesRepository chordChangesRepository) {
        this.chordChangesRepository = chordChangesRepository;
    }

    @Override
    @Transactional
    public ChordChanges getChordChangeById(int id) {
        return this.chordChangesRepository.findById(id)
                .orElseThrow(
                        () -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chord change not found");
                        }
                );
    }

    @Override
    @Transactional
    public List<ChordChanges> getAllChordChanges() {
        return this.chordChangesRepository.findAll();
    }

    @Override
    @Transactional
    public void removeChordChangeById(int id){
        this.chordChangesRepository.deleteById(id);
    }

}
