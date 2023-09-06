package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.HarmonicaKeys;
import com.projectnight.service.songs.HarmonicaKeysService;
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
public class HarmonicaKeysController {

    private final HarmonicaKeysService harmonicaKeysService;

    @Autowired
    public HarmonicaKeysController(HarmonicaKeysService harmonicaKeysService) {
        this.harmonicaKeysService = harmonicaKeysService;
    }

    @GetMapping(value = "/harmonica-keys", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<HarmonicaKeys> getAllHarmonicaKeys(){
        return harmonicaKeysService.getAllHarmonicaKeys();
    }
}
