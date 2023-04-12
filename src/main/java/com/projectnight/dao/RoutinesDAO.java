package com.projectnight.dao;

import com.projectnight.dto.Routine;
import com.projectnight.entity.practiceroutines.Routines;

import java.util.List;

public interface RoutinesDAO {
    public List<Routines> getRoutines();
    public void saveRoutine(Routines routine);
    public Routine getRoutine(int routineId);
    public void deleteRoutine(int routineId);
}
