package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.Metronomes;
import com.projectnight.entity.practice.StrumPatterns;
import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import com.projectnight.service.practice.TopicsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/practice")
public class TopicController {

    private final TopicsService topicsService;

    @Autowired
    public TopicController(TopicsService topicsService) {
        this.topicsService = topicsService;
    }

    @GetMapping("/topics/{topicId}")
    public Topics getTopicById(@PathVariable int topicId){
        return topicsService.getTopicById(topicId);
    }

    @GetMapping("/topics")
    public List<Topics> getAllTopics(){
        return  topicsService.getAllTopics();
    }

    @PostMapping("/topics/{topicId}/chords")
    public @ResponseBody Topics addTopicChord(@PathVariable int topicId, @RequestBody ChordsPK topicChordPk){
        return topicsService.addTopicChord(topicId, topicChordPk);
    }

    @PostMapping("/topics/{topicId}/chords-changes")
    public @ResponseBody Topics addTopicChordChanges(@PathVariable int topicId, @RequestBody List<ChordsPK> changePrimaryKeys){
        return topicsService.addTopicChordChange(topicId, changePrimaryKeys);
    }

    @PostMapping("/topics/{topicId}/strum-patterns")
    public @ResponseBody Topics addTopicStrumPatterns(@PathVariable int topicId, @RequestBody StrumPatterns strumPattern){
        return topicsService.addTopicStrumPattern(topicId, strumPattern);
    }

    @PostMapping("/topics/{topicId}/metronomes")
    public @ResponseBody Metronomes addTopicMetronome(@PathVariable int topicId, @RequestBody Metronomes metronome){
        return topicsService.addTopicMetronome(topicId, metronome);
    }
}
