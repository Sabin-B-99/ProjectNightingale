package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.HarmonicaTypes;
import com.projectnight.service.songs.HarmonicaTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tabs")
public class HarmonicaTypesController {
    private final HarmonicaTypesService harmonicaTypesService;

    @Autowired
    public HarmonicaTypesController(HarmonicaTypesService harmonicaTypesService) {
        this.harmonicaTypesService = harmonicaTypesService;
    }

    @GetMapping(value = "/harmonica-types")
    public List<HarmonicaTypes> getAllHarmonicaTypes(){
        return harmonicaTypesService.getAllHarmonicaTypes();
    }
}
