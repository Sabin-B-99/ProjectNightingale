package com.projectnight.service.practice;

import com.projectnight.entity.practice.Topics;

import java.util.List;

public interface TopicsService {
    Topics getTopicById(int id);
    List<Topics> getAllTopics();
}
