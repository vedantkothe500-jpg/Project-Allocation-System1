package com.example.Project_Allocation.DAO;

import com.example.Project_Allocation.Entity.Projects;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectDAO extends JpaRepository<Projects, Integer> {
    List<Projects> findTop10ByDomainAndDifficultylevelAndMinScoreRequiredLessThanEqual(String domain, String difficultylevel, int score);
    Optional<Projects> findByDifficultylevelAndTitle(String difficultylevel, String title);

}
