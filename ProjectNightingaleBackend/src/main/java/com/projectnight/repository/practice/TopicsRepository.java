package com.projectnight.repository.practice;

import com.projectnight.entity.practice.Topics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicsRepository extends JpaRepository<Topics, Integer> {
}
