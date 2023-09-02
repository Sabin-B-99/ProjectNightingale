package com.projectnight.service.songs;

import com.projectnight.entity.songs.HarmonicaTabOtherReqDetails;

import java.util.List;
import java.util.UUID;

public interface HarmonicaTabOtherReqDetailsService {
    List<HarmonicaTabOtherReqDetails> getAllOtherRequiredDetails();
    HarmonicaTabOtherReqDetails saveHarmonicaOtherReqDetails(UUID songTabId,
                                                             HarmonicaTabOtherReqDetails harmonicaTabOtherReqDetails);
}
