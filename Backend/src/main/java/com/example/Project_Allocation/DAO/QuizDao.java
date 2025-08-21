package com.example.Project_Allocation.DAO;

import com.example.Project_Allocation.Entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizDao extends JpaRepository<Quiz,Integer>
{

}
