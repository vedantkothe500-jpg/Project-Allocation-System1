package com.example.Project_Allocation.Controller;

import com.example.Project_Allocation.DTO.Studentdto;
import com.example.Project_Allocation.DTO.ViewDTO;
import com.example.Project_Allocation.Entity.Admin;
import com.example.Project_Allocation.Entity.Projects;
import com.example.Project_Allocation.Entity.Question;
import com.example.Project_Allocation.Repo.AdminRepo;
import com.example.Project_Allocation.Service.ProjectService;
import com.example.Project_Allocation.Service.QuestionService;
import com.example.Project_Allocation.Service.Stdservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:5173/")
public class AdminController
{
                                 //➡️ This is for add project only can Admin
//======================================================================================================================
    @Autowired
    ProjectService pser;

    @PostMapping("/addProject")
    public ResponseEntity<String> addProject(@RequestBody List<Projects> project)
    {
        return pser.addMultipleprojects(project);
    }


    // ✅ Get all projects
    @GetMapping("/getAllProjects")
    public ResponseEntity<List<Projects>> getAllProjects() {
        return pser.getAllProjects();
    }

    // ✅ Update project by ID
    @PutMapping("/updateProject/{id}")
    public ResponseEntity<String> updateProject(@PathVariable int id, @RequestBody Projects updatedProject) {
        return pser.updateProject(id, updatedProject);
    }

    // ✅ Delete project by ID
    @DeleteMapping("/deleteProject/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable int id) {
        return pser.deleteProject(id);
    }

//======================================================================================================================





                                         //This is add new admin in project
//======================================================================================================================
    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepo.save(admin);
        return ResponseEntity.ok("Admin registered successfully");
    }
//======================================================================================================================






                                   //Update and delete the user only can admin do
//======================================================================================================================
    @Autowired
    private Stdservice stdser;
    // ✅ Update Student by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable int id, @RequestBody Studentdto sdto) {
        String result = stdser.updateStudent(id, sdto);
        return ResponseEntity.ok(result);
    }

    // ✅ Delete Student by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        String result = stdser.deleteStudent(id);
        return ResponseEntity.ok(result);
    }
//======================================================================================================================




                                   //Manage Question Operation Only for admin
//======================================================================================================================

    @Autowired
    QuestionService qser;


    @GetMapping("AllQuestion")
    public ResponseEntity<List<Question>> getAlQuestion()
    {
        return qser.getAlQuestion();
    }

//    @GetMapping("category/{category}")
//    public ResponseEntity<List<Question>> getQuestionBycategory(@PathVariable  String category)
//    {
//        return qser.getQuestionsBycategory(category);
//    }

    @PostMapping("/addAll")
    public ResponseEntity<String> addMultipleQuestions(@RequestBody List<Question> questions) {
        return qser.addMultipleQuestions(questions);
    }


    // ✅ DELETE Question by ID
    @DeleteMapping("/deleteQuestion/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Integer id) {
        return qser.deleteQuestion(id);
    }

    // ✅ UPDATE Question by ID
    @PutMapping("/updateQuestion/{id}")
    public ResponseEntity<String> updateQuestion(@PathVariable Integer id, @RequestBody Question updatedQuestion) {
        return qser.updateQuestion(id, updatedQuestion);
    }
//======================================================================================================================

//======================================================================================================================
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<ViewDTO>> getAllUsers() {
        List<ViewDTO> students = stdser.getAllStudents();
        return ResponseEntity.ok(students);
    }
}
