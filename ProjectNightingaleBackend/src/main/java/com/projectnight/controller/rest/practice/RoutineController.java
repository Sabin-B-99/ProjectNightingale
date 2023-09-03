package com.projectnight.controller.rest.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;
import com.projectnight.service.practice.RoutinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/practice")
public class RoutineController {

    private final RoutinesService routinesService;

    @Autowired
    public RoutineController(RoutinesService routinesService) {
        this.routinesService = routinesService;
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

    @PostMapping(value = "/routines",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Routines saveRoutine(@RequestBody Routines routine){
         Routines savedRoutine = routinesService.saveRoutine(routine);
         if(savedRoutine == null){
             throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while saving routine");
         }
         return savedRoutine;
    }

    @PostMapping("/routines/{routineId}/topics")
    public @ResponseBody Topics saveTopic(@PathVariable int routineId, @RequestBody Topics topic){
        return this.routinesService.saveTopic(routineId, topic);
    }
}
