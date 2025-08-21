package com.example.Project_Allocation.Controller;

import com.example.Project_Allocation.DAO.ProjectDAO;
import com.example.Project_Allocation.Entity.Projects;
import com.example.Project_Allocation.Entity.QuestionWrapper;
import com.example.Project_Allocation.Entity.Response;
import com.example.Project_Allocation.Entity.Student;
import com.example.Project_Allocation.Repo.Stdrepo;
import com.example.Project_Allocation.Service.ProjectService;
import com.example.Project_Allocation.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
//@CrossOrigin("http://localhost:5173/")
@RequestMapping("/user")
public class UserController
{



                                             //Quiz Operation for User
//======================================================================================================================

    @Autowired
    QuizService qser;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createquiz(@RequestParam String category, @RequestParam int numq, @RequestParam String difficulty, @RequestParam String title)
    {
        return qser.createQuiz(category,numq,difficulty,title);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionWrapper>>  getQuizQuestoins(@PathVariable Integer id)
    {
        return qser.getQuizQuizQuestion(id);
    }

    @PostMapping("/submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id, @RequestBody List<Response> response)
    {
        return qser.calculateResult(id,response);
    }
//======================================================================================================================








                                         //Project Allocation for User
//======================================================================================================================
@Autowired
ProjectService pser;


    @GetMapping("/allocate")
    public ResponseEntity<?> getAllocatedProjects(
            @RequestParam String domain,
            @RequestParam String difficulty,
            @RequestParam int score
    ) {
        List<Projects> allocated = pser.allocateProjects(domain, difficulty, score);
 System.out.println(allocated);

        if (allocated.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("You need to score 10 or more to get project allocation. Please try again.");
        }

        return new ResponseEntity<>(allocated, HttpStatus.OK);
    }

//======================================================================================================================







                                        //Project Selection for User
//======================================================================================================================

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Stdrepo stdrepo;

    @Autowired
    private ProjectDAO projectDAO;

    @PutMapping("/selectProject")
    public ResponseEntity<String> selectProject(@RequestParam int studentId,
                                                @RequestParam String difficulty,
                                                @RequestParam String projectTitle) {

        Optional<Student> studentOpt = stdrepo.findById(studentId);
        Optional<Projects> projectOpt = projectDAO.findByDifficultylevelAndTitle(difficulty, projectTitle); // ✅ updated

        if (studentOpt.isPresent() && projectOpt.isPresent()) {
            Student student = studentOpt.get();
            Projects project = projectOpt.get();

            student.setSelectedProject(project.getTitle());
            stdrepo.save(student);

            // Email logic remains same...
            String toEmail = student.getEmail();
            String subject = "Your Selected Project Details";
            String body = "Dear " + student.getName() + ",\n\n" +
                    "Thank you for selecting your project. Here are the details:\n\n" +
                    "Title: " + project.getTitle() + "\n" +
                    "Description: " + project.getDescription() + "\n" +
                    "Requirement: " + project.getRequirement() + "\n" +
                    "Project Link: " + project.getProjectLink() + "\n\n" +
                    "Best wishes for your project!\n\n" +
                    "Regards,\nProject Allocation Team";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("projectallocation2025@gmail.com");
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            return ResponseEntity.ok("Project selection updated and email sent!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student or project not found!");
        }
    }

//======================================================================================================================


    @PutMapping("/setDomain/{id}")
    public ResponseEntity<String> setDomain(@PathVariable int id, @RequestBody Map<String, String> request) {
        String domain = request.get("domain");

        Optional<Student> optionalStudent = stdrepo.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setDomain(domain);
            stdrepo.save(student);
            return ResponseEntity.ok("✅ Domain updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Student not found");
        }
    }
}
