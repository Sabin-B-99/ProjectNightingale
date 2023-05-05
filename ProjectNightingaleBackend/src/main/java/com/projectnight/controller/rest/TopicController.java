package com.projectnight.controller.rest;

import com.projectnight.dto.Topic;
import com.projectnight.dto.TopicChord;
import com.projectnight.dto.TopicChordChange;
import com.projectnight.dto.TopicChordProgression;
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
    public Topic getTopicById(@PathVariable int topicId){
        Topic topic = topicsService.getTopic(topicId);
        if(topic == null){
            throw new RuntimeException("Topic not found");
        }
        return topic;
    }

    @GetMapping("/routines/{routineId}/topics")
    public List<Topic> getTopicsByRoutineId(@PathVariable int routineId){
        return topicsService.getTopicsByRoutineId(routineId);
    }

    @GetMapping("/topics/{topicId}/progressions")
    public TopicChordProgression getProgressionsByTopicId(@PathVariable int topicId){
        return topicsService.getProgressionByTopicId(topicId);
    }

    @GetMapping("/topics/{topicId}/chordchanges")
    public List<TopicChordChange> getChordChangesByTopicId(@PathVariable int topicId){
        return topicsService.getChordChangesByTopicId(topicId);
    }

    @GetMapping("/topics/{topicId}/chords")
    public List<TopicChord> getChordsByTopicId(@PathVariable int topicId){
        return topicsService.getChordsByTopicId(topicId);
    }
}
