package com.projectnight.service.songs;

import com.projectnight.entity.songs.SongTabs;
import com.projectnight.repository.songs.SongTabsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class SongTabsServiceImpl implements SongTabsService{

    private final SongTabsRepository songTabsRepository;

    @Autowired
    public SongTabsServiceImpl(SongTabsRepository songTabsRepository) {
        this.songTabsRepository = songTabsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<SongTabs> getAllTabs() {
        return songTabsRepository.findAll();
    }

    @Override
    @Transactional("songsTransactionManager")
    public SongTabs getSongTabById(UUID id) {
        return songTabsRepository.findById(id)
                .orElseThrow( () ->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tab not found.");
                });
    }

    @Override
    @Transactional("songsTransactionManager")
    public SongTabs saveSongTab(SongTabs songTab) {
        return songTabsRepository.save(songTab);
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<SongTabs> getDistinctTabsWithTitleLike(String title) {
        return songTabsRepository.findDistinctBySongTitleContainingIgnoreCase(title);
    }
    @Override
    @Transactional("songsTransactionManager")
    public List<SongTabs> getAllTabsWithTitleLike(String title) {
        return songTabsRepository.findSongTabsBySongTitleContainingIgnoreCase(title);
    }
}
