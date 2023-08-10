package com.projectnight.service.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;
import com.projectnight.repository.practice.RoutinesRepository;
import com.projectnight.repository.practice.TopicsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RoutinesServiceImpl implements RoutinesService{

    private final RoutinesRepository routinesRepository;
    private final TopicsRepository topicsRepository;

    @Autowired
    public RoutinesServiceImpl(RoutinesRepository routinesRepository,
                               TopicsRepository topicsRepository) {
        this.routinesRepository = routinesRepository;
        this.topicsRepository = topicsRepository;
    }

    @Override
    @Transactional
    public Routines getRoutineById(int id) {
        return this.routinesRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Routine not found.");
                        }
                );
    }

    @Override
    @Transactional
    public List<Routines> getAllRoutines() {
        return this.routinesRepository.findAll();
    }

    @Override
    @Transactional
    public List<Topics> getRoutineTopicsByRoutineId(int routineId) {
        return this.routinesRepository.getRoutineTopicsByRoutineId(routineId);
    }

    @Override
    @Transactional
    public Routines saveRoutine(Routines routine) {
        return this.routinesRepository.save(routine);
    }

    @Override
    @Transactional
    public Topics saveTopic(int routineId, Topics topic) {
        Routines routine = this.routinesRepository.findById(routineId)
                .orElseThrow(() ->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Routine with the given id not found");
                });
        topic.setRoutine(routine);
        return this.topicsRepository.save(topic);
    }
}
