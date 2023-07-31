package com.projectnight.service.songs;

import com.projectnight.entity.ChordRoots;

import java.util.List;

public interface ChordRootsService {
    ChordRoots getChordRootById(int chordRootId);

    List<ChordRoots> getAllChordRoots();
}
