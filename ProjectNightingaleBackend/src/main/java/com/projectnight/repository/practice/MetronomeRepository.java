package com.projectnight.repository.practice;

import com.projectnight.entity.practice.Metronomes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetronomeRepository extends JpaRepository<Metronomes, Integer> {
}
