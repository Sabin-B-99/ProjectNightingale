package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.*;
import com.projectnight.service.practice.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/practice")
public class PracticeController {

    private final ChordChangesService chordChangesService;
    private final MetronomesService metronomesService;

    private final TopicsService topicsService;
    private final StrumPatternService strumPatternService;

    private final RoutinesService routinesService;

    @Autowired
    public PracticeController(ChordChangesService chordChangesService, MetronomesService metronomesService,
                              TopicsService topicsService, StrumPatternService strumPatternService,
                              RoutinesService routinesService) {
        this.chordChangesService = chordChangesService;
        this.metronomesService = metronomesService;
        this.topicsService = topicsService;
        this.strumPatternService = strumPatternService;
        this.routinesService = routinesService;
    }

    @GetMapping("/topics/{topicId}")
    public Topics getTopicById(@PathVariable int topicId){
        return topicsService.getTopicById(topicId);
    }

    @GetMapping("/topics")
    public List<Topics> getAllTopics(){
        return  topicsService.getAllTopics();
    }

    @GetMapping("/chord-changes/{chordChangeId}")
    public ChordChanges getChordChangesById(@PathVariable int chordChangeId){
        return chordChangesService.getChordChangeById(chordChangeId);
    }

    @DeleteMapping("/chord-changes/{chordChangeId}/delete")
    public void removeChordChangeById(@PathVariable int chordChangeId){
        this.chordChangesService.removeChordChangeById(chordChangeId);
    }

    @GetMapping("/chord-changes")
    public List<ChordChanges> getAllChordChanges(){
        return chordChangesService.getAllChordChanges();
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


    @GetMapping("/routines/{routineId}")
    public Routines getRoutineById(@PathVariable int routineId){
        return routinesService.getRoutineById(routineId);
    }
    @GetMapping("/routines")
    public List<Routines> getAllRoutines(){
        return routinesService.getAllRoutines();
    }

    @GetMapping("/routines/{routineId}/topics")
    public List<Topics> getRoutineTopicsByRoutineId(@PathVariable int routineId){
        return routinesService.getRoutineTopicsByRoutineId(routineId);
    }
}
