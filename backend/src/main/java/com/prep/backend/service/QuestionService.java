package com.prep.backend.service;

import com.prep.backend.model.Question;
import com.prep.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public String addQuestion(Question question) {
        questionRepository.save(question);
        return "Question added successfully!";
    }

    public List<Question> getQuestionsByCategory(String category) {
    return questionRepository.findByCategory(category);
}
}
