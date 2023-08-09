package com.projectnight.service.practice;

import com.projectnight.entity.practice.Topics;
import com.projectnight.repository.practice.TopicsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TopicsImpl implements TopicsService{

    private final TopicsRepository topicsRepository;

    @Autowired
    public TopicsImpl(TopicsRepository topicsRepository) {
        this.topicsRepository = topicsRepository;
    }

    @Override
    @Transactional
    public Topics getTopicById(int id) {
        return topicsRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found.");
                        }
                );
    }

    @Override
    @Transactional
    public List<Topics> getAllTopics() {
        return topicsRepository.findAll();
    }
}
