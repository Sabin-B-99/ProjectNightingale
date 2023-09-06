package com.projectnight.service.songs;

import com.projectnight.entity.songs.GuitarCapoPositions;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuitarCapoPositionsImpl implements GuitarCapoPositionsService{

    private final GuitarCapoPositionsService guitarCapoPositionsService;

    public GuitarCapoPositionsImpl(GuitarCapoPositionsService guitarCapoPositionsService) {
        this.guitarCapoPositionsService = guitarCapoPositionsService;
    }

    @Override
    public List<GuitarCapoPositions> getAllCapoPositions() {
        return null;
    }
}
