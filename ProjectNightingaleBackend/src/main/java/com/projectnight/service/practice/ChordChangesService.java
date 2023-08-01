package com.projectnight.service.practice;

import com.projectnight.entity.practice.ChordChanges;

import java.util.List;

public interface ChordChangesService {
    ChordChanges getChordChangeById(int id);
    List<ChordChanges> getAllChordChanges();
    void removeChordChangeById(int id);
}
