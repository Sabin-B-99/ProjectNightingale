package com.projectnight.repository.songs;

import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChordsRepository extends JpaRepository<Chords, ChordsPK> {
    @Query("SELECT c.imageFileName FROM Chords c WHERE c.id = ?1")
    String findChordImageByChordOrderAndKey(ChordsPK id);
}
