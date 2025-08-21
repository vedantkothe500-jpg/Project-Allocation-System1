package com.example.Project_Allocation.Service;

import com.example.Project_Allocation.DAO.ProjectDAO;
import com.example.Project_Allocation.Entity.Projects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService implements Proser
{
    @Autowired
    ProjectDAO pdao;

    public ResponseEntity<String> addMultipleprojects(List<Projects> projects) {
        try {
            pdao.saveAll(projects);
            System.out.println(projects);
            // saveAll is used for list
            return new ResponseEntity<>("All Projects Inserted Successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Insertion Failed", HttpStatus.BAD_REQUEST);
        }
    }


    public List<Projects> allocateProjects(String domain, String difficulty, int score) {
        if (score >= 10) {
            return pdao.findTop10ByDomainAndDifficultylevelAndMinScoreRequiredLessThanEqual(domain, difficulty, score);
        }
        return new ArrayList<>(); // return empty list if score < 10
    }

    @Override
    public ResponseEntity<List<Projects>> getAllProjects() {
        List<Projects> projects = pdao.findAll();
        return ResponseEntity.ok(projects);
    }

    @Override
    public ResponseEntity<String> updateProject(int id, Projects updatedProject) {
        Projects project = pdao.findById(id).orElse(null);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }

        // Update project fields
        project.setTitle(updatedProject.getTitle());
        project.setDescription(updatedProject.getDescription());
        project.setRequirement(updatedProject.getRequirement());
        project.setProjectLink(updatedProject.getProjectLink());
        project.setDomain(updatedProject.getDomain());
        project.setDifficultylevel(updatedProject.getDifficultylevel());
        project.setMinScoreRequired(updatedProject.getMinScoreRequired());

        pdao.save(project);
        return ResponseEntity.ok("Project updated successfully");
    }

    @Override
    public ResponseEntity<String> deleteProject(int id) {
        if (!pdao.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }

        pdao.deleteById(id);
        return ResponseEntity.ok("Project deleted successfully");
    }
}
