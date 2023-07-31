package com.projectnight.service;

import com.projectnight.entity.ChordRoots;

import java.util.List;

public interface ChordRootsService {
    ChordRoots getChordRootById(int chordRootId);

    List<ChordRoots> getAllChordRoots();
}
