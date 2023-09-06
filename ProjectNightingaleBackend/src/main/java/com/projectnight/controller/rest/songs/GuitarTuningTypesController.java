package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.GuitarTuningTypes;
import com.projectnight.service.songs.GuitarTuningTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tabs")
@CrossOrigin("http://localhost:4200/")
public class GuitarTuningTypesController {
    private final GuitarTuningTypesService guitarTuningTypesService;

    @Autowired
    public GuitarTuningTypesController(GuitarTuningTypesService guitarTuningTypesService) {
        this.guitarTuningTypesService = guitarTuningTypesService;
    }

    @GetMapping(value = "/guitar-tunings", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GuitarTuningTypes> getAllGuitarTunings(){
        return guitarTuningTypesService.getAllTunings();
    }
}
