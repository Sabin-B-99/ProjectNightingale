package com.projectnight.controller.rest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.projectnight.dto.Routine;
import com.projectnight.entity.practiceroutines.Routines;
import com.projectnight.services.RoutinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@JsonIgnoreProperties(ignoreUnknown = true)
public class RoutineController {

    @Autowired
    private RoutinesService routinesService;
    @GetMapping("/routines")
    public List<Routines> getRoutines(){
        return routinesService.getRoutines();
    }

    @GetMapping("/routines/{routineId}")
    public Routine getRoutineById(@PathVariable int routineId){
        Routine routine  = routinesService.getRoutine(routineId);
        if(routine == null){
            throw  new RuntimeException("Routine Not Found");
        }
        return routine;
    }
}
