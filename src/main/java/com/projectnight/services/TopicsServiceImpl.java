package com.projectnight.services;

import com.projectnight.dao.TopicsDAO;
import com.projectnight.entity.practiceroutines.Topics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TopicsServiceImpl implements TopicsService {
    @Autowired
    TopicsDAO topicsDAO;

    @Override
    @Transactional
    public List<Topics> getTopics() {
        return topicsDAO.getTopics();
    }

    @Override
    @Transactional
    public void saveTopic(Topics topic) {
        topicsDAO.saveTopic(topic);
    }

    @Override
    @Transactional
    public Topics getTopic(int topicId) {
        return topicsDAO.getTopic(topicId);
    }

    @Override
    @Transactional
    public void deleteTopic(int topicId) {
        topicsDAO.deleteTopic(topicId);
    }

    @Override
    @Transactional
    public List<Topics> getTopicsByRoutineId(int routineId) {
        return topicsDAO.getTopicsByRoutineId(routineId);
    }
}
