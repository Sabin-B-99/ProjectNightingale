package com.projectnight.service.practice;

import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;

import java.util.List;

public interface TopicsService {
    Topics getTopicById(int id);
    List<Topics> getAllTopics();
    Topics addTopicChord(int topicId, ChordsPK topicChordPK);

    List<Chords> getChordsByTopicId(int topicId);

    Topics saveTopic(int routineId, Topics topic);
}
