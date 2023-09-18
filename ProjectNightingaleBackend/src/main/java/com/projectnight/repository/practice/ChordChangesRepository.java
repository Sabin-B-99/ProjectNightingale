package com.projectnight.repository.practice;

import com.projectnight.entity.practice.ChordChanges;
import com.projectnight.entity.practice.Topics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChordChangesRepository extends JpaRepository<ChordChanges, Integer> {

    List<ChordChanges> getChordChangesByTopic(Topics topic);
}
