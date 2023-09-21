package com.projectnight.repository.songs;

import com.projectnight.entity.songs.SongTabOtherArtists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SongTabOtherArtistsRepository extends JpaRepository<SongTabOtherArtists, UUID> {

    @Query("FROM SongTabOtherArtists WHERE songTab.id = :tabId")
    List<SongTabOtherArtists> findOtherContributingArtistsBySongTabId(@Param("tabId") UUID tabId);
}
