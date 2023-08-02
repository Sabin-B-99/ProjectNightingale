package com.projectnight.service.practice;

import com.projectnight.entity.practice.StrumPatterns;

import java.util.List;

public interface StrumPatternService{

    List<StrumPatterns> getAllStrumPatterns();
    StrumPatterns getStrumPatternById(int id);
}
