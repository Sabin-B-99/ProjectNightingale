package com.projectnight.service.practice;

import com.projectnight.entity.practice.ChordChanges;
import com.projectnight.entity.songs.primarykeys.ChordsPK;

import java.util.List;

public interface ChordChangesService {
    ChordChanges getChordChangeById(int id);
    List<ChordChanges> getAllChordChanges();
    void removeChordChangeById(int id);
    ChordChanges addTopicChordChange(int topicId, List<ChordsPK> changesPrimaryKeys);

    List<ChordChanges> getChordChangesByTopicId(int topicId);
}
