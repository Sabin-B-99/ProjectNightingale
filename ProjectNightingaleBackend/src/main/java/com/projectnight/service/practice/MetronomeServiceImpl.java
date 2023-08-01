package com.projectnight.service.practice;

import com.projectnight.entity.practice.Metronomes;
import com.projectnight.repository.practice.MetronomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MetronomeServiceImpl implements MetronomeService{

    private final MetronomeRepository metronomeRepository;

    @Autowired
    public MetronomeServiceImpl(MetronomeRepository metronomeRepository) {
        this.metronomeRepository = metronomeRepository;
    }

    @Override
    @Transactional
    public Metronomes getMetronomeById(int id) {
        return this.metronomeRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Metronome not found.");
                        }
                );
    }

    @Override
    @Transactional
    public List<Metronomes> getAllMetronomes() {
        return this.metronomeRepository.findAll();
    }
}
