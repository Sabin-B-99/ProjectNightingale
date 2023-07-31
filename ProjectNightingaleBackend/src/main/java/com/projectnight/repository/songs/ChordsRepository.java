package com.projectnight.repository.songs;

import com.projectnight.entity.Chords;
import com.projectnight.entity.primarykeys.ChordsPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChordsRepository extends JpaRepository<Chords, ChordsPK> {
}
