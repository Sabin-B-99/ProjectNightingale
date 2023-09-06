package com.projectnight.service.songs;

import com.projectnight.entity.songs.GuitarTuningTypes;
import com.projectnight.repository.songs.GuitarTuningTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GuitarTuningTypesServiceImpl implements GuitarTuningTypesService{

    private final GuitarTuningTypesRepository guitarTuningTypesRepository;

    @Autowired
    public GuitarTuningTypesServiceImpl(GuitarTuningTypesRepository guitarTuningTypesRepository) {
        this.guitarTuningTypesRepository = guitarTuningTypesRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<GuitarTuningTypes> getAllTunings() {
        return guitarTuningTypesRepository.findAll();
    }
}
