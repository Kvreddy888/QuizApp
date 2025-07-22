package com.kv.QuizApp.Repository;

import com.kv.QuizApp.Dto.QuestionsDto;
import com.kv.QuizApp.Model.Questions;
//import com.kv.QuizApp.questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Questionrepo extends JpaRepository<Questions,Integer> {
    List<Questions> findByCategory(String category);
}
