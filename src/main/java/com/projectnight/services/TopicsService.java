package com.projectnight.services;

import com.projectnight.entity.practiceroutines.ChordChanges;
import com.projectnight.entity.practiceroutines.Chords;
import com.projectnight.entity.practiceroutines.Progressions;
import com.projectnight.entity.practiceroutines.Topics;

import java.util.List;

public interface TopicsService {
    public List<Topics> getTopics();
    public void saveTopic(Topics topic);
    public Topics getTopic(int topicId);
    public void deleteTopic(int topicId);

    public List<Topics> getTopicsByRoutineId(int routineId);
    public List<Progressions> getProgressionsByTopicId(int topicId);
    public List<ChordChanges> getChordChangesByTopicId(int topicId);
    public List<Chords> getChordsByTopicId(int topicId);
}
