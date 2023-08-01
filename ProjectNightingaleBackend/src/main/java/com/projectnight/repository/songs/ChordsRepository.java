package com.projectnight.repository.songs;

import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChordsRepository extends JpaRepository<Chords, ChordsPK> {
}
