package com.projectnight.repository.songs;

import com.projectnight.entity.songs.ChordRoots;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChordRootsRepository extends JpaRepository<ChordRoots, Integer> {

    ChordRoots findChordRootsByRootName(String rootName);
}
