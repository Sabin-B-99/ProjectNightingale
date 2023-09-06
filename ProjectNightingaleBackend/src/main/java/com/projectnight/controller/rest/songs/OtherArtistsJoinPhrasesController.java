package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.OtherArtistsJoinPhrases;
import com.projectnight.service.songs.OtherArtistsJoinPhrasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tabs")
@CrossOrigin("http://localhost:4200/")
public class OtherArtistsJoinPhrasesController {
    private final OtherArtistsJoinPhrasesService otherArtistsJoinPhrasesService;

    @Autowired
    public OtherArtistsJoinPhrasesController(OtherArtistsJoinPhrasesService otherArtistsJoinPhrasesService) {
        this.otherArtistsJoinPhrasesService = otherArtistsJoinPhrasesService;
    }

    @GetMapping(value = "join-phrases", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OtherArtistsJoinPhrases> getAllJoinPhrases(){
        return otherArtistsJoinPhrasesService.getAllOtherArtistsJoinPhrases();
    }
}
