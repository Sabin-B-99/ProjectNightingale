package com.projectnight.service.practice;

import com.projectnight.entity.practice.StrumPatterns;
import com.projectnight.repository.practice.StrumPatternsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StrumPatternServiceImpl implements StrumPatternService{

    private final StrumPatternsRepository strumPatternsRepository;

    @Autowired
    public StrumPatternServiceImpl(StrumPatternsRepository strumPatternsRepository) {
        this.strumPatternsRepository = strumPatternsRepository;
    }

    @Override
    @Transactional
    public List<StrumPatterns> getAllStrumPatterns() {
        return this.strumPatternsRepository.findAll();
    }

    @Override
    @Transactional
    public StrumPatterns getStrumPatternById(int id) {
        return this.strumPatternsRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Strum pattern not found");
                        }
                ) ;
    }
}
