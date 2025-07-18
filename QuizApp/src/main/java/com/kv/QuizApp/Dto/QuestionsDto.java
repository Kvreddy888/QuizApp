package com.kv.QuizApp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionsDto {
    private String questionText;
    private String category;
    private String option_a;
    private String option_b;
    private String option_c;
    private String option_d;
    private String correct_option;


}
