package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.Metronomes;
import com.projectnight.service.practice.MetronomesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practice")
public class MetronomeController {
    private final MetronomesService metronomesService;

    @Autowired
    public MetronomeController(MetronomesService metronomesService) {
        this.metronomesService = metronomesService;
    }


    @GetMapping("/metronomes/{metronomeId}")
    public Metronomes getMetronomeById(@PathVariable int metronomeId){
        return metronomesService.getMetronomeById(metronomeId);
    }

    @GetMapping("/metronomes")
    public List<Metronomes> getAllMetronomes(){
        return metronomesService.getAllMetronomes();
    }

    @PostMapping("/topics/{topicId}/metronomes")
    public @ResponseBody Metronomes addTopicMetronome(@PathVariable int topicId, @RequestBody Metronomes metronome){
        return metronomesService.addTopicMetronome(topicId, metronome);
    }

    @GetMapping("/topics/{topicId}/metronomes")
    public Metronomes getMetronomeByTopicId(@PathVariable int topicId){
        return metronomesService.getMetronomeByTopicId(topicId);
    }
}
