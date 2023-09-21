package com.projectnight.service.songs;

import com.projectnight.entity.songs.GuitarTabOtherReqDetails;

import java.util.List;
import java.util.UUID;

public interface GuitarTabOtherReqDetailsService {
    List<GuitarTabOtherReqDetails> getAllGuitarTabOtherReqDetails();
    GuitarTabOtherReqDetails saveGuitarTabOtherReqDetails(UUID songTabId, GuitarTabOtherReqDetails guitarTabOtherReqDetails);

    GuitarTabOtherReqDetails getGuitarTabOtherReqDetailsByTabId(UUID id);
}
