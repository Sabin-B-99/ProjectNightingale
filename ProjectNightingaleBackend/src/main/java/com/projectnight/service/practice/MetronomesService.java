package com.projectnight.service.practice;

import com.projectnight.entity.practice.Metronomes;

import java.util.List;

public interface MetronomesService {
    Metronomes getMetronomeById(int id);
    List<Metronomes> getAllMetronomes();
}
