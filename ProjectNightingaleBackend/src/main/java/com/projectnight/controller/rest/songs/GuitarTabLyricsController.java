package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.GuitarTabLyrics;
import com.projectnight.entity.songs.GuitarTabOtherReqDetails;
import com.projectnight.service.songs.GuitarTabLyricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
public class GuitarTabLyricsController {

    private final GuitarTabLyricsService guitarTabLyricsService;

    @Autowired
    public GuitarTabLyricsController(GuitarTabLyricsService guitarTabLyricsService) {
        this.guitarTabLyricsService = guitarTabLyricsService;
    }

    @PostMapping(value = "/songs/{songTabId}/guitar-tab-lyrics",
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    private @ResponseBody GuitarTabLyrics saveGuitarTabLyrics(@PathVariable String songTabId,
                                                @RequestBody GuitarTabLyrics guitarTabLyrics){
        UUID id = UUID.fromString(songTabId);
        return guitarTabLyricsService.saveGuitarTabLyrics(id, guitarTabLyrics);
    }

    @GetMapping(value = "/songs/{songTabId}/guitar-tab-lyrics", produces = MediaType.APPLICATION_JSON_VALUE)
    private GuitarTabLyrics getGuitarTabLyricsByTabId(@PathVariable String songTabId){
        UUID id = UUID.fromString(songTabId);
        return guitarTabLyricsService.getGuitarTabLyricsFromTabId(id);
    }
}
