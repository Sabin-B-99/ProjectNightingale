package com.projectnight.repository.songs;

import com.projectnight.entity.songs.SongTabs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SongTabsRepository extends JpaRepository<SongTabs, UUID> {
    List<SongTabs> findDistinctBySongTitleContainingIgnoreCase(String title);
    List<SongTabs> findSongTabsBySongTitleContainingIgnoreCase(String title);
}
