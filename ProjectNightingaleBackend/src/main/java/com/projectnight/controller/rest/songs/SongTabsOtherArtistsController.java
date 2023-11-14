package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.SongTabOtherArtists;
import com.projectnight.service.songs.SongTabOtherArtistsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
public class SongTabsOtherArtistsController {
    private final SongTabOtherArtistsService songTabOtherArtistsService;

    @Autowired
    public SongTabsOtherArtistsController(SongTabOtherArtistsService songTabOtherArtistsService) {
        this.songTabOtherArtistsService = songTabOtherArtistsService;
    }


    @PostMapping(value = "/songs/{songTabId}/other-artists",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public @ResponseBody SongTabOtherArtists saveOtherArtists(@PathVariable String songTabId,
                                                              @RequestBody SongTabOtherArtists otherArtists){
        UUID id = UUID.fromString(songTabId);
        return songTabOtherArtistsService.saveOtherContributingArtists(id, otherArtists);
    }

    @GetMapping(value = "/songs/{songTabId}/other-artists", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SongTabOtherArtists> getOtherContributingArtists(@PathVariable String songTabId){
        UUID id = UUID.fromString(songTabId);
        return songTabOtherArtistsService.getOtherContributingArtistsByTabId(id);
    }
}
