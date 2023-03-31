package com.projectnight.dao;

import com.projectnight.entity.practiceroutines.Topics;

import java.util.List;

public interface TopicsDAO {
    public List<Topics> getTopics();
    public void saveTopic(Topics topic);
    public Topics getTopic(int topicId);
    public void deleteTopic(int topiId);
}
