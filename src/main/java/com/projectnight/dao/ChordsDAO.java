package com.projectnight.dao;

import com.projectnight.entity.practiceroutines.Chords;

import java.util.List;

public interface ChordsDAO {
    public List<Chords> getChords();
    public void saveChord(Chords chord);
    public Chords getChord(int chordId);
    public void deleteChord(int chordId);
}
