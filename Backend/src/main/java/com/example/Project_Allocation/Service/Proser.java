package com.example.Project_Allocation.Service;

import com.example.Project_Allocation.Entity.Projects;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface Proser
{
    List<Projects> allocateProjects(String domain, String difficulty, int score);
    public ResponseEntity<List<Projects>> getAllProjects();
    public ResponseEntity<String> updateProject(int id, Projects updatedProject);
    public ResponseEntity<String> deleteProject(int id);

}
