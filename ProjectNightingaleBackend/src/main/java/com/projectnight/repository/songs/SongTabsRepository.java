package com.projectnight.repository.songs;

import com.projectnight.entity.songs.SongTabs;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SongTabsRepository extends CrudRepository<SongTabs, UUID>{
}
