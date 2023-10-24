package com.projectnight.service.songs;

import com.projectnight.entity.songs.ChordRoots;

import java.util.List;

public interface ChordRootsService {
    ChordRoots getChordRootById(int chordRootId);

    List<ChordRoots> getAllChordRoots();

    ChordRoots getChordRootByRootName(String rootName);
}
