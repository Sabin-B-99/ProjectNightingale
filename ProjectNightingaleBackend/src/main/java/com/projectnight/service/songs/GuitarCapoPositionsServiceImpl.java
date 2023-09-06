package com.projectnight.service.songs;

import com.projectnight.entity.songs.GuitarCapoPositions;
import com.projectnight.repository.songs.GuitarCapoPositionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GuitarCapoPositionsServiceImpl implements GuitarCapoPositionsService{

    private final GuitarCapoPositionsRepository guitarCapoPositionsRepository;

    @Autowired
    public GuitarCapoPositionsServiceImpl(GuitarCapoPositionsRepository guitarCapoPositionsRepository) {
        this.guitarCapoPositionsRepository = guitarCapoPositionsRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<GuitarCapoPositions> getAllCapoPositions() {
        return guitarCapoPositionsRepository.findAll();
    }
}
