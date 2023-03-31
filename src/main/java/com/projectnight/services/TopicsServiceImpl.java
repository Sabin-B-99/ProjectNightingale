package com.projectnight.services;

import com.projectnight.dao.TopicsDAO;
import com.projectnight.entity.practiceroutines.Topics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicsServiceImpl implements TopicsService {
    @Autowired
    TopicsDAO topicsDAO;

    @Override
    public List<Topics> getTopics() {
        return topicsDAO.getTopics();
    }

    @Override
    public void saveTopic(Topics topic) {
        topicsDAO.saveTopic(topic);
    }

    @Override
    public Topics getTopic(int topicId) {
        return topicsDAO.getTopic(topicId);
    }

    @Override
    public void deleteTopic(int topicId) {
        topicsDAO.deleteTopic(topicId);
    }
}
