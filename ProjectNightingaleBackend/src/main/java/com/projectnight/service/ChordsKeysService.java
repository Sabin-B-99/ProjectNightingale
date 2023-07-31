package com.projectnight.service;

import com.projectnight.entity.ChordKeys;

import java.util.List;

public interface ChordsKeysService {
    ChordKeys getChordKeyById(int id);
    List<ChordKeys> getAllChordKeys();
}
