package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.SongTabs;
import com.projectnight.service.songs.SongTabsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/tabs")
@CrossOrigin("http://localhost:4200/")
public class SongTabsController {
    private final SongTabsService songTabsService;

    @Autowired
    public SongTabsController(SongTabsService songTabsService) {
        this.songTabsService = songTabsService;
    }

    @PostMapping(value = "/songs",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody SongTabs saveSongTab(@RequestBody SongTabs songTab){
        SongTabs savedTab = songTabsService.saveSongTab(songTab);
        if(savedTab == null){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while saving tab");
        }
        return savedTab;
    }
}
