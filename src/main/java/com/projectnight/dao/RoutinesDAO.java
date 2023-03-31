package com.projectnight.dao;

import com.projectnight.entity.practiceroutines.Routines;

import java.util.List;

public interface RoutinesDAO {
    public List<Routines> getRoutines();
    public void saveRoutine(Routines routine);
    public Routines getRoutine(int routineId);
    public void deleteRoutine(int routineId);
}
