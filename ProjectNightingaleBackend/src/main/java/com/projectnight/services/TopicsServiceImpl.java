package com.projectnight.services;

import com.projectnight.dao.TopicsDAO;
import com.projectnight.dto.Topic;
import com.projectnight.dto.TopicChord;
import com.projectnight.dto.TopicChordChange;
import com.projectnight.dto.TopicChordProgression;
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
    public Topic getTopic(int topicId) {
        return topicsDAO.getTopic(topicId);
    }

    @Override
    @Transactional
    public void deleteTopic(int topicId) {
        topicsDAO.deleteTopic(topicId);
    }

    @Override
    @Transactional
    public List<Topic> getTopicsByRoutineId(int routineId) {
        return topicsDAO.getTopicsByRoutineId(routineId);
    }

    @Override
    @Transactional
    public TopicChordProgression getProgressionByTopicId(int topicId) {
        return topicsDAO.getProgressionByTopicId(topicId);
    }

    @Override
    @Transactional
    public List<TopicChordChange> getChordChangesByTopicId(int topicId) {
        return topicsDAO.getChordChangesByTopicId(topicId);
    }

    @Override
    @Transactional
    public List<TopicChord> getChordsByTopicId(int topicId) {
        return topicsDAO.getChordsByTopicId(topicId);
    }
}
