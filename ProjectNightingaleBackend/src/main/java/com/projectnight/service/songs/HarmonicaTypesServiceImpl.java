package com.projectnight.service.songs;

import com.projectnight.entity.songs.HarmonicaTypes;
import com.projectnight.repository.songs.HarmonicaTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HarmonicaTypesServiceImpl implements HarmonicaTypesService{

    private final HarmonicaTypesRepository harmonicaTypesRepository;

    @Autowired
    public HarmonicaTypesServiceImpl(HarmonicaTypesRepository harmonicaTypesRepository) {
        this.harmonicaTypesRepository = harmonicaTypesRepository;
    }

    @Override
    @Transactional("songsTransactionManager")
    public List<HarmonicaTypes> getAllHarmonicaTypes() {
        return harmonicaTypesRepository.findAll();
    }
}
