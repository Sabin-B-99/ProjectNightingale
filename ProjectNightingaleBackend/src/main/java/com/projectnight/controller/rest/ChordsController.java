package com.projectnight.controller.rest;

import com.projectnight.entity.ChordKeys;
import com.projectnight.entity.ChordRoots;
import com.projectnight.entity.Chords;
import com.projectnight.entity.primarykeys.ChordsPK;
import com.projectnight.service.ChordRootsService;
import com.projectnight.service.ChordsKeysService;
import com.projectnight.service.ChordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chords")
public class ChordsController {

    private final ChordRootsService chordRootsService;
    private final ChordsKeysService chordsKeysService;

    private final ChordsService chordsService;


    @Autowired
    public ChordsController(ChordRootsService chordRootsService, ChordsKeysService chordsKeysService,
                            ChordsService chordsService) {
        this.chordRootsService = chordRootsService;
        this.chordsKeysService = chordsKeysService;
        this.chordsService = chordsService;
    }

    @GetMapping("/{chordRootOrder}/{chordKeyId}")
    public Chords getChordById(@PathVariable int chordRootOrder, @PathVariable int chordKeyId){
        ChordsPK id = new ChordsPK();
        id.setChordRootOrder(chordRootOrder);
        id.setChordKeyId(chordKeyId);
        return this.chordsService.getChordById(id);
    }

    @GetMapping
    public List<Chords> getAllChords(){
        return this.chordsService.getAllChords();
    }


    @GetMapping("/chord-roots/{chordRootId}")
    public ChordRoots getChordRootById(@PathVariable int chordRootId){
        return chordRootsService.getChordRootById(chordRootId);
    }

    @GetMapping("/chord-roots")
    public List<ChordRoots> getAllChordRoots(){
        return chordRootsService.getAllChordRoots();
    }
    @GetMapping("/chord-keys/{chordKeyId}")
    public ChordKeys getChordKeyById(@PathVariable int chordKeyId){
        return chordsKeysService.getChordKeyById(chordKeyId);
    }

    @GetMapping("/chord-keys")
    private List<ChordKeys> getAllChordKeys(){
        return chordsKeysService.getAllChordKeys();
    }
}
