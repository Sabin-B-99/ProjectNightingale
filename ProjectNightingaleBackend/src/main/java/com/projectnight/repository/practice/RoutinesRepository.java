package com.projectnight.repository.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoutinesRepository extends JpaRepository<Routines, Integer> {
    @Query("SELECT r.topics FROM Routines r WHERE r.id = ?1")
    List<Topics> getRoutineTopicsByRoutineId(int routineId);
}
