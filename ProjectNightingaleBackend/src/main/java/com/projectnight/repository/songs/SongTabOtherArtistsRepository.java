package com.projectnight.repository.songs;

import com.projectnight.entity.songs.SongTabOtherArtists;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SongTabOtherArtistsRepository extends JpaRepository<SongTabOtherArtists, UUID> {
}
