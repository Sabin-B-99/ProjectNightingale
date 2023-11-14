package com.projectnight.repository.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface RoutinesRepository extends JpaRepository<Routines, Integer> {
    @Query("SELECT r.topics FROM Routines r WHERE r.id = ?1 ORDER BY r.id")
    List<Topics> getRoutineTopicsByRoutineId(int routineId);

    @Query("FROM Routines r WHERE r.users.id= :id")
    List<Routines> findRoutinesByUserId(@Param("id") UUID id);
}
