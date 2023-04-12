package com.projectnight.services;

import com.projectnight.dto.Topic;
import com.projectnight.dto.TopicChord;
import com.projectnight.dto.TopicChordChange;
import com.projectnight.dto.TopicChordProgression;
import com.projectnight.entity.practiceroutines.ChordChanges;
import com.projectnight.entity.practiceroutines.Chords;
import com.projectnight.entity.practiceroutines.Progressions;
import com.projectnight.entity.practiceroutines.Topics;

import java.util.List;

public interface TopicsService {
    public List<Topics> getTopics();
    public void saveTopic(Topics topic);
    public Topic getTopic(int topicId);
    public void deleteTopic(int topicId);

    public List<Topic> getTopicsByRoutineId(int routineId);
    public TopicChordProgression getProgressionByTopicId(int topicId);
    public List<TopicChordChange> getChordChangesByTopicId(int topicId);
    public List<TopicChord> getChordsByTopicId(int topicId);
}
