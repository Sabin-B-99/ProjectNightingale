package com.projectnight.services;

import com.projectnight.dao.RoutinesDAO;
import com.projectnight.entity.practiceroutines.Routines;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutineServiceImpl implements RoutinesService{

    @Autowired
    RoutinesDAO routinesDAO;

    @Override
    public List<Routines> getRoutines() {
        return routinesDAO.getRoutines();
    }

    @Override
    public void saveRoutine(Routines routine) {
        routinesDAO.saveRoutine(routine);
    }

    @Override
    public Routines getRoutine(int routineId) {
        return routinesDAO.getRoutine(routineId);
    }

    @Override
    public void deleteRoutine(int routineId) {
        routinesDAO.deleteRoutine(routineId);
    }
}
