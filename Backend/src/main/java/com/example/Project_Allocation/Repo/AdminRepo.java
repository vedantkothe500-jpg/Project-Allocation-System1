package com.example.Project_Allocation.Repo;

import com.example.Project_Allocation.Entity.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin,Integer>
{
    Optional<Admin> findByEmail(String email);
}
