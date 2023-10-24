package com.projectnight.service.songs;

import com.projectnight.entity.songs.ChordKeys;

import java.util.List;

public interface ChordsKeysService {
    ChordKeys getChordKeyById(int id);
    List<ChordKeys> getAllChordKeys();

    ChordKeys getChordKeyByKeyName(String keyName);
}
