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

    private static final String CHORD_IMAGE_FILE_EXTENSION = ".png";

    private static final String CHORD_IMAGE_FILE_NAME_DEFAULT =  "Empty diagram";
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

    @Override
    @Transactional("songsTransactionManager")
    public String getChordImagePathById(ChordsPK id) {
        String fileName = chordsRepository.findChordImageByChordOrderAndKey(id);
        String path = getClass().getResource("/static/images/chords-images").getPath();
        if(fileName == null){
            return path + CHORD_IMAGE_FILE_NAME_DEFAULT + CHORD_IMAGE_FILE_EXTENSION;
        }
        return path + fileName + CHORD_IMAGE_FILE_EXTENSION;
    }
}
