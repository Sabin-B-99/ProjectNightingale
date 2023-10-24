package com.projectnight.repository.songs;

import com.projectnight.entity.songs.ChordKeys;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChordKeysRepository extends JpaRepository<ChordKeys, Integer> {
    ChordKeys findChordKeysByKeyName(String keyName);
}
