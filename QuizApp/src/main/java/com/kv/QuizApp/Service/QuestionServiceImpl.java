package com.kv.QuizApp.Service;

import com.kv.QuizApp.Dto.QuestionsDto;
import com.kv.QuizApp.Model.Questions;
import com.kv.QuizApp.Repository.Questionrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private Questionrepo questionrepo;

    @Override
    public List<Questions> getAllQuestions() {
        return questionrepo.findAll();
    }

    @Override
    public List<Questions> getquestionsbycategory(String category) {
        return questionrepo.findByCategory(category);
    }

    @Override
    public String addQuestion(Questions questions) {
        questionrepo.save(questions);
        return "Question added successfully!";
    }

    @Override
    public void deleteByid(int id) {
        questionrepo.deleteById(id);
    }

    @Override
    public void addMultipleQuestions(List<Questions> questions) {
        questionrepo.saveAll(questions);

    }
//
//    @Override
//    public boolean checkAnswer(int id, String selectedAnswer) {
//        Optional<Questions> questionOptional = questionrepo.findById(id);
//        if (questionOptional.isPresent()) {
//            Questions question = questionOptional.get();
//            return question.getRightAnswer().equalsIgnoreCase(selectedAnswer.trim());
//        } else {
//            throw new RuntimeException("Question with ID " + id + " not found");
//        }
    }



//}
