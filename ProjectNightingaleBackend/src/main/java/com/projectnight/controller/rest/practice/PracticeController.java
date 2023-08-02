package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.ChordChanges;
import com.projectnight.entity.practice.Metronomes;
import com.projectnight.entity.practice.StrumPatterns;
import com.projectnight.entity.practice.Topics;
import com.projectnight.service.practice.ChordChangesService;
import com.projectnight.service.practice.MetronomeService;
import com.projectnight.service.practice.StrumPatternService;
import com.projectnight.service.practice.TopicsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practice")
public class PracticeController {

    private final ChordChangesService chordChangesService;
    private final MetronomeService metronomeService;

    private final TopicsService topicsService;
    private final StrumPatternService strumPatternService;

    @Autowired
    public PracticeController(ChordChangesService chordChangesService, MetronomeService metronomeService,
                              TopicsService topicsService, StrumPatternService strumPatternService) {
        this.chordChangesService = chordChangesService;
        this.metronomeService = metronomeService;
        this.topicsService = topicsService;
        this.strumPatternService = strumPatternService;
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
        return metronomeService.getMetronomeById(metronomeId);
    }

    @GetMapping("/metronomes")
    public List<Metronomes> getAllMetronomes(){
        return metronomeService.getAllMetronomes();
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
