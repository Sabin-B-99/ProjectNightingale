package com.projectnight.controller.rest;

import com.projectnight.entity.ChordRoots;
import com.projectnight.repository.ChordRootsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeController {
    private final ChordRootsRepository chordRootsRepository;
    @Autowired
    public HomeController(ChordRootsRepository chordRootsRepository) {
        this.chordRootsRepository = chordRootsRepository;
    }

    @GetMapping("/chord-roots/{chordRootId}")
    public ChordRoots getChordRootById(@PathVariable int chordRootId){
        return chordRootsRepository.getOne(chordRootId);
    }
}
