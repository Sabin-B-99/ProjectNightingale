package com.projectnight.repository.songs;

import com.projectnight.entity.songs.SongTabs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SongTabsRepository extends JpaRepository<SongTabs, UUID> {
}
