package com.example.Project_Allocation.Controller;

import com.example.Project_Allocation.Auth.JWTUtils;
import com.example.Project_Allocation.DTO.Logdto;
import com.example.Project_Allocation.DTO.Studentdto;
import com.example.Project_Allocation.Entity.Admin;
import com.example.Project_Allocation.Entity.Student;
import com.example.Project_Allocation.Response.LoginResponse;
import com.example.Project_Allocation.Service.Stdservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.SystemEnvironmentPropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController
{
    @Autowired
    private Stdservice stdser;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtils jwtService;


    @GetMapping("/test")
    public String test() {
        return "Controller is working!";
    }

    // ✅ Registration
    @PostMapping("/save")
    public ResponseEntity<String> registerStudent(@RequestBody Studentdto sdto) {
        String result = stdser.addStd(sdto);

        if (result.equals("Student already exists")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result); // 409
        } else if (result.contains("Exception") || result.contains("Error")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result); // 500
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(result); // 201
    }

    @Autowired
    private JavaMailSender mailSender;

    // ✅ Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Logdto logdto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(logdto.getEmail(), logdto.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        String token = jwtService.generateToken(userDetails.getUsername(), role);

        Object studentObj = stdser.getUserByEmail(logdto.getEmail());
        Object adminObj = stdser.getAdminByEmail(logdto.getEmail());

        Object safeUser = null;

        if (adminObj != null) {
            Admin admin = (Admin) adminObj;

            safeUser = Map.of(
                    "adminid", admin.getAdminId(),
                    "name", admin.getName(),
                    "email", admin.getEmail()
            );

            // Send Admin Email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("projectallocation2025@gmail.com");
            message.setTo(admin.getEmail());
            message.setSubject("🔐 Admin Login Alert – Project Allocation System");
            message.setText("Hi " + admin.getName() + ",\n\n" +
                    "🔔 You have successfully logged in as an **Admin** on the Project Allocation System.\n\n" +
                    "You can now manage students, projects, and questions from your admin panel.\n\n" +
                    "🛡️ If this wasn't you, please take immediate action to secure your account.\n\n" +
                    "Best regards,\n" +
                    "Team Project Allocation System");
            mailSender.send(message);

        } else if (studentObj != null) {
            Student student = (Student) studentObj;

            safeUser = Map.of(
                    "stdid", student.getStdid(),
                    "name", student.getName(),
                    "email", student.getEmail()
            );

            // Send Student Email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("projectallocation2025@gmail.com");
            message.setTo(student.getEmail());
            message.setSubject("🎉 Welcome Back – Continue Your Project Journey!");
            message.setText("Hi " + student.getName() + ",\n\n" +
                    "👋 Great to see you back on the **Project Allocation System**!\n\n" +
                    "You’ve successfully logged in. Head over to your dashboard, select your domain, and continue with the quiz to get your personalized project suggestions! 🎯\n\n" +
                    "Let’s build something awesome together! 💻✨\n\n" +
                    "Warm regards,\n" +
                    "Team Project Allocation System");
            mailSender.send(message);
        }

        LoginResponse response = new LoginResponse(
                "Login successful",
                true,
                safeUser,
                role,
                token
        );

        return ResponseEntity.ok(response);
    }


    @GetMapping("/run")
    public String home() {
        return "Backend is running!";
    }
}
