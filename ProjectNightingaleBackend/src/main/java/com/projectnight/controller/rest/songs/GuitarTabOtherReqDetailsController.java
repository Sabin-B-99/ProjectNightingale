package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.GuitarTabOtherReqDetails;
import com.projectnight.service.songs.GuitarTabOtherReqDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
@CrossOrigin("http://localhost:4200/")
public class GuitarTabOtherReqDetailsController {

    private final GuitarTabOtherReqDetailsService guitarTabOtherReqDetailsService;

    @Autowired
    public GuitarTabOtherReqDetailsController(GuitarTabOtherReqDetailsService guitarTabOtherReqDetailsService) {
        this.guitarTabOtherReqDetailsService = guitarTabOtherReqDetailsService;
    }

    @PostMapping(value = "/songs/{songTabId}/guitar-other-req-details",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody GuitarTabOtherReqDetails saveGuitarTabOtherReqDetails(@PathVariable String songTabId,
                                                                               @RequestBody GuitarTabOtherReqDetails guitarTabOtherReqDetails){
        UUID id = UUID.fromString(songTabId);
        return guitarTabOtherReqDetailsService.saveGuitarTabOtherReqDetails(id, guitarTabOtherReqDetails);
    }
}
