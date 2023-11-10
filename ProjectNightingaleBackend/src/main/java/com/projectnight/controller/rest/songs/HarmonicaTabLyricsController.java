package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.HarmonicaTabLyrics;
import com.projectnight.service.songs.HarmonicaTabLyricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
public class HarmonicaTabLyricsController {

    private final HarmonicaTabLyricsService harmonicaTabLyricsService;

    @Autowired
    public HarmonicaTabLyricsController(HarmonicaTabLyricsService harmonicaTabLyricsService) {
        this.harmonicaTabLyricsService = harmonicaTabLyricsService;
    }

    @PostMapping("/songs/{songTabId}/harmonica-tab-lyrics")
    public @ResponseBody HarmonicaTabLyrics saveHarmonicaTabLyrics(@PathVariable String songTabId,
                                                                   @RequestBody HarmonicaTabLyrics harmonicaTabLyrics){
        UUID id = UUID.fromString(songTabId);
        return harmonicaTabLyricsService.saveHarmonicaTabLyrics(id, harmonicaTabLyrics);
    }


    @GetMapping("/songs/{songTabId}/harmonica-tab-lyrics")
    public HarmonicaTabLyrics getHarmonicaTabLyricsByTabId(@PathVariable String songTabId){
        UUID id = UUID.fromString(songTabId);
        return harmonicaTabLyricsService.getHarmonicaTabLyricsByTabId(id);
    }
}
