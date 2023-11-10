package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.SongTabs;
import com.projectnight.service.songs.SongTabsService;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
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

    @GetMapping(value = "/songs", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SongTabs> getSongTabs(){
        return this.songTabsService.getAllTabs();
    }

    @GetMapping(value = "/songs/{title}/suggestions", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SongTabs> getDistinctSongTabsWithTitleLike(@PathVariable String title){
        return this.songTabsService.getDistinctTabsWithTitleLike(title);
    }

    @GetMapping(value="/songs/{title}/results", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SongTabs> getAllSongSongTabsWithTitleLike(@PathVariable String title){
        return this.songTabsService.getAllTabsWithTitleLike(title);
    }

    @GetMapping(value = "/songs/{tabId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public SongTabs getTabById(@PathVariable String tabId){
        UUID id = UUID.fromString(tabId);
        return this.songTabsService.getSongTabById(id);
    }
}
