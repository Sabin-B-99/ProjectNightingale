package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.*;
import com.projectnight.service.practice.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/practice")
public class PracticeController {

    private final MetronomesService metronomesService;

    private final StrumPatternService strumPatternService;


    @Autowired
    public PracticeController(MetronomesService metronomesService,
                              TopicsService topicsService, StrumPatternService strumPatternService) {
        this.metronomesService = metronomesService;
        this.strumPatternService = strumPatternService;
    }



    @GetMapping("/metronomes/{metronomeId}")
    public Metronomes getMetronomeById(@PathVariable int metronomeId){
        return metronomesService.getMetronomeById(metronomeId);
    }

    @GetMapping("/metronomes")
    public List<Metronomes> getAllMetronomes(){
        return metronomesService.getAllMetronomes();
    }


    @GetMapping("/strum-patterns/{strumPatternId}")
    public StrumPatterns getStrumPatternById(@PathVariable int strumPatternId){
        return strumPatternService.getStrumPatternById(strumPatternId);
    }

    @GetMapping("/strum-patterns")
    public List<StrumPatterns> getAllStrumPatterns(){
        return strumPatternService.getAllStrumPatterns();
    }
}
