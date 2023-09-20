package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.LyricsOnlyTabLyrics;
import com.projectnight.service.songs.LyricsOnlyTabLyricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
@CrossOrigin("http://localhost:4200/")
public class LyricsOnlyTabLyricsController {
    private final LyricsOnlyTabLyricsService lyricsOnlyTabLyricsService;

    @Autowired
    public LyricsOnlyTabLyricsController(LyricsOnlyTabLyricsService lyricsOnlyTabLyricsService) {
        this.lyricsOnlyTabLyricsService = lyricsOnlyTabLyricsService;
    }

    @PostMapping(value = "/songs/{songTabId}/lyrics-only-tab-lyrics",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody LyricsOnlyTabLyrics saveLyricsForLyricsOnlyTab(@PathVariable String songTabId,
                                                          @RequestBody LyricsOnlyTabLyrics lyricsOnlyTabLyrics){
        UUID id = UUID.fromString(songTabId);
        return lyricsOnlyTabLyricsService.saveLyrics(id, lyricsOnlyTabLyrics);
    }
}