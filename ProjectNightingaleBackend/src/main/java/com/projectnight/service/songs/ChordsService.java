package com.projectnight.service.songs;

import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;

import java.util.List;

public interface ChordsService {

    Chords getChordById(ChordsPK id);
    List<Chords> getAllChords();

    String getChordImagePathById(ChordsPK id);

    String getChordRootNameById(ChordsPK id);

    String gerChordKeyNameById(ChordsPK id);
}
