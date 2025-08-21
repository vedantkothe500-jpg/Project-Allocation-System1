package com.example.Project_Allocation.DAO;

import com.example.Project_Allocation.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDAO extends JpaRepository<Question, Integer> {


    @Query(value = "SELECT * FROM question q WHERE q.category = :category AND q.difficultylevel = :difficulty ORDER BY RAND() LIMIT :numq", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(String category,String difficulty, int numq);
}

