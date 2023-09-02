package com.projectnight.service.songs;

import com.projectnight.entity.songs.SongTabOtherArtists;

import java.util.List;
import java.util.UUID;

public interface SongTabOtherArtistsService {
    List<SongTabOtherArtists> getAllContributingArtists();
    SongTabOtherArtists saveOtherContributingArtists(UUID songTabId, SongTabOtherArtists otherArtist);
}
