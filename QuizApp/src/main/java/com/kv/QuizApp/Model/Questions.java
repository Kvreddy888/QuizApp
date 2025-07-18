package com.kv.QuizApp.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Data
@Table(name = "questions")
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String questionText;
    private String category;
    private String option_a;
    private String option_b;
    private String option_c;
    private String option_d;
    private String correct_option;



}
