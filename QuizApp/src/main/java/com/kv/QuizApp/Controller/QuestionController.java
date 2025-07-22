package com.kv.QuizApp.Controller;

import com.kv.QuizApp.Model.Questions;
import com.kv.QuizApp.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "http://localhost:3000")

public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/allQuestions")
    public ResponseEntity<List<Questions>> getAllQuestion() {
        List<Questions> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Questions>> getQuestionsByCategory(@PathVariable String category) {
        List<Questions> questions = questionService.getquestionsbycategory(category);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addQuestion(@RequestBody Questions questions) {
        String result = questionService.addQuestion(questions);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteByid(@PathVariable int id) {
        try {
            questionService.deleteByid(id);
            return ResponseEntity.ok("Deleted Sucessfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }


    }

    @PostMapping("/addMultiple")
    public ResponseEntity<String> addMultipleQuestions(@RequestBody List<Questions> questions) {
        questionService.addMultipleQuestions(questions);
        return ResponseEntity.ok("Added Multiple Questions Successfully");
    }
//    @PostMapping("/checkAnswer/{id}")
//    public ResponseEntity<String> checkAnswer(@PathVariable int id, @RequestBody String selectedAnswer) {
//        boolean isCorrect = questionService.checkAnswer(id, selectedAnswer);
//        if (isCorrect) {
//            return ResponseEntity.ok("Correct Answer!");
//        } else {
//            return ResponseEntity.ok("Wrong Answer!");
//        }
//    }

//    public ResponseEntity<List<Questions>> getQuestionById(@RequestBody Questions questions){
//        questionService.getbyid(id)
//    }



}

