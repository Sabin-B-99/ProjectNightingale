package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.TabDifficultyLevels;
import com.projectnight.service.songs.TabDifficultyLevelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tabs")
public class TabDifficultyLevelsController {
    private final TabDifficultyLevelsService tabDifficultyLevelsService;


    @Autowired
    public TabDifficultyLevelsController(TabDifficultyLevelsService tabDifficultyLevelsService) {
        this.tabDifficultyLevelsService = tabDifficultyLevelsService;
    }

    @GetMapping(value = "/difficulties", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TabDifficultyLevels> getAllDifficultyLevels(){
        return tabDifficultyLevelsService.getAllDifficultyLevels();
    }
}
