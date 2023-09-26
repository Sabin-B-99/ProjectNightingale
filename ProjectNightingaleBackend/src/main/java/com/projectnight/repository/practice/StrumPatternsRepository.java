package com.projectnight.repository.practice;

import com.projectnight.entity.practice.StrumPatterns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StrumPatternsRepository extends JpaRepository<StrumPatterns, Integer> {

    /*
        Could have just loaded by Topic without writing custom @Query, but did it anyway for learning purposes
        Felt smart, might delete it later idk, lol
    */
    @Query("FROM StrumPatterns WHERE topic.id = :topicId ORDER BY topic.id")
    List<StrumPatterns> getStrumPatternsByTopicId(@Param("topicId") int topicId);
}
