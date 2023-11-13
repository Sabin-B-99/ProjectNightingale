package com.projectnight.service.songs;

import com.projectnight.dto.songs.TabRatingDTO;
import com.projectnight.dto.songs.UserRatingDTO;

import java.util.UUID;

public interface TabRatingsService {

    TabRatingDTO getAverageRating(UUID tabId);
    TabRatingDTO addUserRating(UserRatingDTO userRatingDTO);

    TabRatingDTO getUserRatingForTab(String username, String tabId);
}
