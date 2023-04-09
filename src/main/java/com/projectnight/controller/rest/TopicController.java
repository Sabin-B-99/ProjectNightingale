package com.projectnight.controller.rest;

import com.projectnight.entity.practiceroutines.ChordChanges;
import com.projectnight.entity.practiceroutines.Chords;
import com.projectnight.entity.practiceroutines.Progressions;
import com.projectnight.entity.practiceroutines.Topics;
import com.projectnight.services.TopicsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TopicController {

    @Autowired
    private TopicsService topicsService;


    @GetMapping("/topics")
    public List<Topics> getTopics(){
        return topicsService.getTopics();
    }

    @GetMapping("/topics/{topicId}")
    public Topics getTopicById(@PathVariable int topicId){
        Topics topic = topicsService.getTopic(topicId);
        if(topic == null){
            throw new RuntimeException("Topic not found");
        }
        return topic;
    }

    @GetMapping("/routines/{routineId}/topics")
    public List<Topics> getTopicsByRoutineId(@PathVariable int routineId){
        return topicsService.getTopicsByRoutineId(routineId);
    }

    @GetMapping("/topics/{topicId}/progressions")
    public List<Progressions> getProgressionsByTopicId(@PathVariable int topicId){
        return topicsService.getProgressionsByTopicId(topicId);
    }

    @GetMapping("/topics/{topicId}/chordchanges")
    public List<ChordChanges> getChordChangesByTopicId(@PathVariable int topicId){
        return topicsService.getChordChangesByTopicId(topicId);
    }

    @GetMapping("/topics/{topicId}/chords")
    public List<Chords> getChordsByTopicId(@PathVariable int topicId){
        return topicsService.getChordsByTopicId(topicId);
    }
}
