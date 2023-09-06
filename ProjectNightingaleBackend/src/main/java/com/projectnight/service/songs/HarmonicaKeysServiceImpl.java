package com.projectnight.service.songs;

import com.projectnight.entity.songs.HarmonicaKeys;
import com.projectnight.repository.songs.HarmonicaKeysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class HarmonicaKeysServiceImpl implements HarmonicaKeysService{

    private final HarmonicaKeysRepository harmonicaKeysRepository;

    @Autowired
    public HarmonicaKeysServiceImpl(HarmonicaKeysRepository harmonicaKeysRepository) {
        this.harmonicaKeysRepository = harmonicaKeysRepository;
    }


    @Override
    @Transactional("songsTransactionManager")
    public List<HarmonicaKeys> getAllHarmonicaKeys() {
        return harmonicaKeysRepository.findAll();
    }
}
