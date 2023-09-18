package com.projectnight.repository.practice;

import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.Chords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TopicsRepository extends JpaRepository<Topics, Integer> {

    @Query("SELECT t.chords FROM Topics t where t.id = :topicId")
    List<Chords> getChordsByTopic(@Param("topicId") int topicId);
}
