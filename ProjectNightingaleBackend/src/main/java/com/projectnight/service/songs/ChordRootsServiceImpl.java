package com.projectnight.service.songs;

import com.projectnight.entity.songs.ChordRoots;
import com.projectnight.repository.songs.ChordRootsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChordRootsServiceImpl implements ChordRootsService{
    private final ChordRootsRepository chordRootsRepository;

    @Autowired
    public ChordRootsServiceImpl(ChordRootsRepository chordRootsRepository) {
        this.chordRootsRepository = chordRootsRepository;
    }


    @Override
    @Transactional("songsTransactionManager")
    public ChordRoots getChordRootById(int chordRootId) {
        return this.chordRootsRepository.findById(chordRootId)
                .orElseThrow(
                        () ->{
                         throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chord root not found.");
                        }
                );
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<ChordRoots> getAllChordRoots(){
        return this.chordRootsRepository.findAll();
    }
}
