package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.Metronomes;
import com.projectnight.entity.practice.StrumPatterns;
import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.Chords;
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


    @GetMapping("/topics/{topicId}/chords")
    public List<Chords> getChordsByTopicId(@PathVariable int topicId){
        return topicsService.getChordsByTopicId(topicId);
    }

    @PostMapping("/routines/{routineId}/topics")
    public @ResponseBody Topics saveTopic(@PathVariable int routineId, @RequestBody Topics topic){
        return this.topicsService.saveTopic(routineId, topic);
    }

}
