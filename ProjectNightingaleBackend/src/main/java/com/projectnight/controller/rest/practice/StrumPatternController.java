package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.*;
import com.projectnight.service.practice.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practice")
public class StrumPatternController {
    private final StrumPatternService strumPatternService;

    @Autowired
    public StrumPatternController(StrumPatternService strumPatternService) {
        this.strumPatternService = strumPatternService;
    }

    @GetMapping("/strum-patterns/{strumPatternId}")
    public StrumPatterns getStrumPatternById(@PathVariable int strumPatternId){
        return strumPatternService.getStrumPatternById(strumPatternId);
    }

    @GetMapping("/strum-patterns")
    public List<StrumPatterns> getAllStrumPatterns(){
        return strumPatternService.getAllStrumPatterns();
    }


    @PostMapping("/topics/{topicId}/strum-patterns")
    public @ResponseBody StrumPatterns addTopicStrumPatterns(@PathVariable int topicId, @RequestBody StrumPatterns strumPattern){
        return strumPatternService.addTopicStrumPattern(topicId, strumPattern);
    }

    @GetMapping("/topics/{topicId}/strum-patterns")
    public List<StrumPatterns> getStrumPatternsByTopicId(@PathVariable int topicId){
        return strumPatternService.getStrumPatternsByTopicId(topicId);
    }
}

