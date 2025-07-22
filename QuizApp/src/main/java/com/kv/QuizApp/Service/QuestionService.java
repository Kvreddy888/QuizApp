package com.kv.QuizApp.Service;

import com.kv.QuizApp.Model.Questions;
import java.util.List;

public interface QuestionService {

    List<Questions> getAllQuestions();

    List<Questions> getquestionsbycategory(String category);

    String addQuestion(Questions questions);

    void deleteByid(int id);

    void addMultipleQuestions(List<Questions> questions);


//    boolean checkAnswer(int id, String selectedAnswer);
}
