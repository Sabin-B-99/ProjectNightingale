package com.projectnight.repository.songs;

import com.projectnight.entity.songs.SongTabs;
import com.projectnight.entity.songs.TabRatings;
import com.projectnight.entity.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface TabRatingsRepository extends JpaRepository<TabRatings, Integer> {


    @Query("""  
        SELECT AVG(ratings.rating) FROM TabRatings ratings WHERE ratings.songTab.id = :tabId
    """)
    Optional<Double> getTabAverageRatingByTabId(@Param("tabId") UUID tabId);


    TabRatings findByUsersAndSongTab(Users users, SongTabs tabs);

    @Query("""
        SELECT t FROM TabRatings t WHERE t.users.id = :userId AND t.songTab.id = :tabId
    """)
    TabRatings findByUsersAndSongTabId(@Param("userId") UUID userId, @Param("tabId") UUID tabId);
}
