package com.projectnight.service.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;

import java.util.List;

public interface RoutinesService {
    Routines getRoutineById(int id);
    List<Routines> getAllRoutines();

    List<Topics> getRoutineTopicsByRoutineId(int routineId);

    Routines saveRoutine(Routines routine);

    Topics saveTopic(int routineId, Topics topic);
}
