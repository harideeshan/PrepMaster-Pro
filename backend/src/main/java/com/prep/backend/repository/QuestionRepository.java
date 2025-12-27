package com.prep.backend.repository;

import com.prep.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    // JpaRepository<Question, Integer> means:
    // "I want to manage 'Question' data, and its ID is an 'Integer'"
    List<Question> findByCategory(String category);
}