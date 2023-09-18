package com.projectnight.service.practice;

import com.projectnight.entity.practice.StrumPatterns;
import com.projectnight.entity.practice.Topics;

import java.util.List;

public interface StrumPatternService{

    List<StrumPatterns> getAllStrumPatterns();
    StrumPatterns getStrumPatternById(int id);

    StrumPatterns addTopicStrumPattern(int topicId, StrumPatterns strumPattern);

    List<StrumPatterns> getStrumPatternsByTopicId(int topicId);
}
