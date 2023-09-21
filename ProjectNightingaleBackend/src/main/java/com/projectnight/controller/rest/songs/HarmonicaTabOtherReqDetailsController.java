package com.projectnight.controller.rest.songs;

import com.projectnight.entity.songs.HarmonicaTabOtherReqDetails;
import com.projectnight.service.songs.HarmonicaTabOtherReqDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tabs")
@CrossOrigin("http://localhost:4200/")
public class HarmonicaTabOtherReqDetailsController {
    private final HarmonicaTabOtherReqDetailsService harmonicaTabOtherReqDetailsService;

    @Autowired
    public HarmonicaTabOtherReqDetailsController(HarmonicaTabOtherReqDetailsService harmonicaTabOtherReqDetailsService) {
        this.harmonicaTabOtherReqDetailsService = harmonicaTabOtherReqDetailsService;
    }

    @PostMapping( value = "/songs/{songTabId}/harmonica-other-req-details",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody HarmonicaTabOtherReqDetails saveHarmonicaOtherReqDetails(@PathVariable String songTabId,
                                                                                  @RequestBody HarmonicaTabOtherReqDetails harmonicaTabOtherReqDetails){
        UUID id = UUID.fromString(songTabId);
        return harmonicaTabOtherReqDetailsService.saveHarmonicaOtherReqDetails(id, harmonicaTabOtherReqDetails);
    }

    @GetMapping(value = "/songs/{songTabId}/harmonica-other-req-details", produces = MediaType.APPLICATION_JSON_VALUE)
    public HarmonicaTabOtherReqDetails getHarmonicaTabOtherReqDetailsByTabId(@PathVariable String songTabId){
        UUID id = UUID.fromString(songTabId);
        return harmonicaTabOtherReqDetailsService.getHarmonicaTabOtherReqDetailsByTabId(id);
    }
}
