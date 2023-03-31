package com.projectnight.services;

import com.projectnight.entity.practiceroutines.Chords;

import java.util.List;

public interface ChordsService {
    public List<Chords> getChords();
    public void saveChord(Chords chord);
    public Chords getChord(int chordId);
    public void deleteChord(int chordId);
}
