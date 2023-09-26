package com.projectnight.repository.practice;

import com.projectnight.entity.practice.Metronomes;
import com.projectnight.entity.practice.Topics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetronomesRepository extends JpaRepository<Metronomes, Integer> {

    Metronomes getMetronomesByTopics(Topics topics);
}
