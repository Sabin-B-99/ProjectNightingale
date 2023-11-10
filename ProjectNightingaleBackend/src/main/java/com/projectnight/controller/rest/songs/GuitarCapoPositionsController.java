package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.GuitarCapoPositions;
import com.projectnight.service.songs.GuitarCapoPositionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tabs")
public class GuitarCapoPositionsController {

    private final GuitarCapoPositionsService guitarCapoPositionsService;

    @Autowired
    public GuitarCapoPositionsController(GuitarCapoPositionsService guitarCapoPositionsService) {
        this.guitarCapoPositionsService = guitarCapoPositionsService;
    }

    @GetMapping(value = "/capo-positions", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GuitarCapoPositions> getAllCapoPositions(){
        return guitarCapoPositionsService.getAllCapoPositions();
    }
}
