package com.projectnight.service;

import com.projectnight.entity.Chords;
import com.projectnight.entity.primarykeys.ChordsPK;

import java.util.List;

public interface ChordsService {

    Chords getChordById(ChordsPK id);
    List<Chords> getAllChords();
}
