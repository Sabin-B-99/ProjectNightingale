package com.projectnight.service.practice;

import com.projectnight.entity.practice.Metronomes;
import com.projectnight.entity.practice.Topics;
import com.projectnight.repository.practice.MetronomesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MetronomesServiceImpl implements MetronomesService {

    private final MetronomesRepository metronomesRepository;
    private final TopicsService topicsService;

    @Autowired
    public MetronomesServiceImpl(MetronomesRepository metronomesRepository, TopicsService topicsService) {
        this.metronomesRepository = metronomesRepository;
        this.topicsService = topicsService;
    }

    @Override
    @Transactional
    public Metronomes getMetronomeById(int id) {
        return this.metronomesRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Metronome not found.");
                        }
                );
    }

    @Override
    @Transactional
    public List<Metronomes> getAllMetronomes() {
        return this.metronomesRepository.findAll();
    }

    @Override
    @Transactional
    public Metronomes addTopicMetronome(int topicId, Metronomes metronome) {
        Topics topic = topicsService.getTopicById(topicId);
        metronome.setTopics(topic);
        return metronomesRepository.save(metronome);
    }


    @Override
    @Transactional
    public Metronomes getMetronomeByTopicId(int topicId) {
        Topics topic = topicsService.getTopicById(topicId);
        return metronomesRepository.getMetronomesByTopics(topic);
    }
}
