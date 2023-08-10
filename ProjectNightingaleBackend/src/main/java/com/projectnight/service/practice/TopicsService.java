package com.projectnight.service.practice;

import com.projectnight.entity.practice.Metronomes;
import com.projectnight.entity.practice.StrumPatterns;
import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.primarykeys.ChordsPK;

import java.util.List;

public interface TopicsService {
    Topics getTopicById(int id);
    List<Topics> getAllTopics();
    Topics addTopicChord(int topicId, ChordsPK topicChordPK);

    Topics addTopicChordChange(int topicId, List<ChordsPK> changesPrimaryKeys);

    Topics addTopicStrumPattern(int topicId, StrumPatterns strumPattern);

    Metronomes addTopicMetronome(int topicId, Metronomes metronome);
}
