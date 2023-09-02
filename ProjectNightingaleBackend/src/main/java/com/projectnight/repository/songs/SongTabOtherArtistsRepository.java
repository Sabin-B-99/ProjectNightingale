package com.projectnight.repository.songs;

import com.projectnight.entity.songs.SongTabOtherArtists;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SongTabOtherArtistsRepository extends CrudRepository<SongTabOtherArtists, UUID> {
}
