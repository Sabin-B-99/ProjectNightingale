package com.projectnight.services;

import com.projectnight.entity.practiceroutines.Topics;

import java.util.List;

public interface TopicsService {
    public List<Topics> getTopics();
    public void saveTopic(Topics topic);
    public Topics getTopic(int topicId);
    public void deleteTopic(int topicId);

    public List<Topics> getTopicsByRoutineId(int routineId);
}
