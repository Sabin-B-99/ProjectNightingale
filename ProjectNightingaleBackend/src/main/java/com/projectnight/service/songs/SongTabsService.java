package com.projectnight.service.songs;

import com.projectnight.entity.songs.SongTabs;

import java.util.List;
import java.util.UUID;

public interface SongTabsService {
    List<SongTabs> getAllTabs();
    SongTabs getSongTabById(UUID id);
    SongTabs saveSongTabByUser(SongTabs songTab, String username);

    List<SongTabs> getDistinctTabsWithTitleLike(String title);

    List<SongTabs> getAllTabsWithTitleLike(String title);
}
