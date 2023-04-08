package com.projectnight.services;

import com.projectnight.dao.RoutinesDAO;
import com.projectnight.entity.practiceroutines.Routines;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoutineServiceImpl implements RoutinesService{

    @Autowired
    private RoutinesDAO routinesDAO;

    @Override
    @Transactional
    public List<Routines> getRoutines() {
        return routinesDAO.getRoutines();
    }

    @Override
    @Transactional
    public void saveRoutine(Routines routine) {
        routinesDAO.saveRoutine(routine);
    }

    @Override
    @Transactional
    public Routines getRoutine(int routineId) {
        return routinesDAO.getRoutine(routineId);
    }

    @Override
    @Transactional
    public void deleteRoutine(int routineId) {
        routinesDAO.deleteRoutine(routineId);
    }
}
