package com.projectnight.service.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.repository.practice.RoutinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RoutinesServiceImpl implements RoutinesService{

    private final RoutinesRepository routinesRepository;

    @Autowired
    public RoutinesServiceImpl(RoutinesRepository routinesRepository) {
        this.routinesRepository = routinesRepository;
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
}
