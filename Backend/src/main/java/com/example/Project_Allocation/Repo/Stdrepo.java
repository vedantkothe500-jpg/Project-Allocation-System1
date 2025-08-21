package com.example.Project_Allocation.Repo;

import com.example.Project_Allocation.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface Stdrepo extends JpaRepository<Student,Integer>
{
    Student findByEmail(String email);
}
