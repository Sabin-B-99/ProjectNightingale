package com.projectnight.service.songs;

import com.projectnight.dto.songs.TabRatingDTO;
import com.projectnight.dto.songs.UserRatingDTO;
import com.projectnight.entity.songs.SongTabs;
import com.projectnight.entity.songs.TabRatings;
import com.projectnight.entity.users.Users;
import com.projectnight.repository.songs.TabRatingsRepository;
import com.projectnight.service.users.UsersService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class TabRatingsServiceImpl implements TabRatingsService{

    private final TabRatingsRepository tabRatingsRepository;
    private final UsersService usersService;
    private final SongTabsService songTabsService;


    public TabRatingsServiceImpl(TabRatingsRepository tabRatingsRepository,
                                 UsersService usersService,
                                 SongTabsService songTabsService) {
        this.tabRatingsRepository = tabRatingsRepository;
        this.usersService = usersService;
        this.songTabsService = songTabsService;
    }

    @Override
    @Transactional("songsTransactionManager")
    public TabRatingDTO getAverageRating(UUID tabId) {
        double average = tabRatingsRepository.getTabAverageRatingByTabId(tabId)
                .orElseGet(() -> 0.0);
        return new TabRatingDTO(average);
    }

    @Override
    @Transactional("songsTransactionManager")
    public TabRatingDTO addUserRating(UserRatingDTO userRatingDTO) {

        Users users =  usersService.loadUserByUserName(userRatingDTO.getUsername());

        UUID songTabId = UUID.fromString(userRatingDTO.getTabId());
        UUID userId = users.getId();

        TabRatings rating = tabRatingsRepository.findByUsersAndSongTabId(userId, songTabId);

        if(rating == null){
            rating = new TabRatings();

            SongTabs songTabs = songTabsService.getSongTabById(songTabId);

            rating.setSongTab(songTabs);
            rating.setUsers(users);
        }
        rating.setRating(userRatingDTO.getRating());

        TabRatings savedRating = tabRatingsRepository.save(rating);
        return new TabRatingDTO(savedRating.getRating());
    }


    @Override
    @Transactional("songsTransactionManager")
    public TabRatingDTO getUserRatingForTab(String username, String tabId){
        UUID tId = UUID.fromString(tabId);
        SongTabs tab =  songTabsService.getSongTabById(tId);

        Users users = usersService.loadUserByUserName(username);

        TabRatings rating = tabRatingsRepository.findByUsersAndSongTab(users, tab);
        if(rating == null){
            return new TabRatingDTO(0.0);
        }
        return new TabRatingDTO(rating.getRating());
    }

}
