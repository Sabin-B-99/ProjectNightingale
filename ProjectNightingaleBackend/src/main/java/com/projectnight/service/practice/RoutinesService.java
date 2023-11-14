package com.projectnight.service.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;

import java.util.List;

public interface RoutinesService {
    Routines getRoutineById(int id);
    List<Routines> getAllRoutines();

    List<Topics> getRoutineTopicsByRoutineId(int routineId);

    Routines saveRoutineForUser(Routines routine, String username);

    void deleteRoutineById(int routineId);

    List<Routines> getAllRoutinesForUser(String username);
}
