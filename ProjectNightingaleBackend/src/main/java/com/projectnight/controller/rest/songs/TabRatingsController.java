package com.projectnight.controller.rest.songs;

import com.projectnight.dto.songs.TabRatingDTO;
import com.projectnight.dto.songs.UserRatingDTO;
import com.projectnight.service.songs.TabRatingsService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
public class TabRatingsController {

    private final TabRatingsService tabRatingsService;

    public TabRatingsController(TabRatingsService tabRatingsService) {
        this.tabRatingsService = tabRatingsService;
    }

    @PostMapping(value = "/songs/ratings", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody TabRatingDTO rateSongTab(@RequestBody UserRatingDTO userRating){
        return tabRatingsService.addUserRating(userRating);
    }

    @GetMapping(value = "/songs/{tabId}/ratings", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody TabRatingDTO getAverageRatingForTab(@PathVariable String tabId){
        UUID id = UUID.fromString(tabId);
        return tabRatingsService.getAverageRating(id);
    }

    @GetMapping(value = "/songs/{username}/{tabId}/ratings", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody TabRatingDTO getRatingByUserForTab(@PathVariable String username, @PathVariable String tabId){
        return tabRatingsService.getUserRatingForTab(username, tabId);
    }
}
