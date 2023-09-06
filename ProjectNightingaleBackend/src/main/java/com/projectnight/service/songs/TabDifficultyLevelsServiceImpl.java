package com.projectnight.service.songs;

import com.projectnight.entity.songs.TabDifficultyLevels;
import com.projectnight.repository.songs.TabDifficultyLevelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TabDifficultyLevelsServiceImpl implements TabDifficultyLevelsService{

    private final TabDifficultyLevelsRepository tabDifficultyLevelsRepository;

    @Autowired
    public TabDifficultyLevelsServiceImpl(TabDifficultyLevelsRepository tabDifficultyLevelsRepository) {
        this.tabDifficultyLevelsRepository = tabDifficultyLevelsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<TabDifficultyLevels> getAllDifficultyLevels() {
        return tabDifficultyLevelsRepository.findAll();
    }
}
