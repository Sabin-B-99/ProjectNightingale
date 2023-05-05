package com.projectnight.services;

import com.projectnight.dao.ChordsDAO;
import com.projectnight.entity.practiceroutines.Chords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ChordsServiceImpl implements ChordsService{

    @Autowired
    private ChordsDAO chordsDAO;

    @Override
    @Transactional
    public List<Chords> getChords() {
        return chordsDAO.getChords();
    }

    @Override
    @Transactional
    public void saveChord(Chords chord) {
        chordsDAO.saveChord(chord);
    }

    @Override
    @Transactional
    public Chords getChord(int chordId) {
        return chordsDAO.getChord(chordId);
    }

    @Override
    @Transactional
    public void deleteChord(int chordId) {
        chordsDAO.deleteChord(chordId);
    }
}
