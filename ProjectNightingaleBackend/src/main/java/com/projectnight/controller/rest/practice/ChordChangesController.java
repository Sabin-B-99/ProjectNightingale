package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.ChordChanges;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import com.projectnight.service.practice.ChordChangesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practice")
@CrossOrigin("http://localhost:4200")
public class ChordChangesController {

    private final ChordChangesService chordChangesService;

    @Autowired
    public ChordChangesController(ChordChangesService chordChangesService) {
        this.chordChangesService = chordChangesService;
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

    @PostMapping("/topics/{topicId}/chords-changes")
    public @ResponseBody ChordChanges addTopicChordChanges(@PathVariable int topicId, @RequestBody List<ChordsPK> changePrimaryKeys){
        return chordChangesService.addTopicChordChange(topicId, changePrimaryKeys);
    }

    @GetMapping("/topics/{topicId}/chord-changes")
    public List<ChordChanges> getChordChangesByTopicId(@PathVariable int topicId){
        return chordChangesService.getChordChangesByTopicId(topicId);
    }
}
