package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.ChordKeys;
import com.projectnight.entity.songs.ChordRoots;
import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import com.projectnight.service.songs.ChordRootsService;
import com.projectnight.service.songs.ChordsKeysService;
import com.projectnight.service.songs.ChordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200/")
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

    @GetMapping(value = "/{chordRootOrder}/{chordKeyId}/image",
            produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public @ResponseBody Resource getChordImagePath(@PathVariable int chordRootOrder, @PathVariable int chordKeyId){
        ChordsPK id = new ChordsPK();
        id.setChordRootOrder(chordRootOrder);
        id.setChordKeyId(chordKeyId);
        try {
            Path imagePath = Paths.get(chordsService.getChordImagePathById(id));
            return new ByteArrayResource(Files.readAllBytes(imagePath));
        }catch (IOException e ){
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping("/chord-keys/keys/{keyName}")
    public ChordKeys getChordKeyByKeyName(@PathVariable String keyName){
        return this.chordsKeysService.getChordKeyByKeyName(keyName);
    }

    @GetMapping("chord-roots/roots/{rootName}")
    public ChordRoots getChordRootByRootName(@PathVariable String rootName){
        return this.chordRootsService.getChordRootByRootName(rootName);
    }
}
