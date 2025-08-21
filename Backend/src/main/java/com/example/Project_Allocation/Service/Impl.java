package com.example.Project_Allocation.Service;


import com.example.Project_Allocation.DTO.Studentdto;
import com.example.Project_Allocation.DTO.ViewDTO;
import com.example.Project_Allocation.Entity.Student;
import com.example.Project_Allocation.Repo.AdminRepo;
import com.example.Project_Allocation.Repo.Stdrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Impl implements Stdservice
{


    @Autowired
    private Stdrepo stdrepo;


    @Autowired
    private PasswordEncoder pass;

    @Autowired
    private final JavaMailSender mailSender;

    public Impl(JavaMailSender mailSender)
    {
        this.mailSender=mailSender;
    }

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public Object getUserByEmail(String email) {

         return stdrepo.findByEmail(email);
    }

    @Override
    public Object getAdminByEmail(String email) {
        return adminRepo.findByEmail(email).orElse(null);
    }

    @Override
    public String addStd(Studentdto sdto) {

        // Check if student with same email already exists
        Student existingStudent = stdrepo.findByEmail(sdto.getEmail());
        if (existingStudent != null) {
            return "Student already exists";
        }

        Student std = new Student(
                sdto.getStdid(),
                sdto.getName(),
                sdto.getRollno(),
                sdto.getPhno(),
                sdto.getEmail(),
                pass.encode(sdto.getPassword()),
                sdto.getBranch(),
                sdto.getAddress(),
                sdto.getSelectedProject(),
                sdto.getRole(),
                sdto.getDomain()
        );

        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("projectallocation2025@gmail.com");
            message.setTo(sdto.getEmail());
            message.setSubject("🎉 Welcome to Project Allocation System – Let’s Get Started!");

            message.setText("Hi " + sdto.getName() + " 😄,\n\n" +
                    "🎓 Thank you for registering on the **Project Allocation System**!\n\n" +
                    "✅ Your account has been created successfully. You're now one step closer to exploring exciting projects that match your interests and skills.\n\n" +
                    "🚀 **Here's what’s next:**\n" +
                    "🔐 1. Login to your account\n" +
                    "🧭 2. Choose your preferred domain\n" +
                    "📝 3. Take a short quiz to assess your skill level\n" +
                    "📊 4. Receive project suggestions tailored to your performance\n" +
                    "🎯 5. Select the project that excites you the most!\n\n" +
                    "⚠️ If this wasn’t you, please contact our support team or reset your password immediately to secure your account.\n\n" +
                    "💡 We’re thrilled to have you onboard and can’t wait to see what you'll create. Let’s build something amazing together!\n\n" +
                    "Warm regards,  \n" +
                    "🤝 Team Project Allocation System");

            mailSender.send(message);

        } catch (Exception e) {
            return e.getMessage();
        }

        stdrepo.save(std);
        return "Registration Successfully Completed";
    }





    @Override
    public String updateStudent(int id, Studentdto studentdto) {
        Optional<Student> existing = stdrepo.findById(id);
        if (existing.isPresent()) {
            Student student = existing.get();
            student.setName(studentdto.getName());
            student.setEmail(studentdto.getEmail());
            student.setPassword(studentdto.getPassword());
            student.setPhno(studentdto.getPhno());
            student.setRollno(studentdto.getRollno());
            student.setAddress(studentdto.getAddress());
            student.setBranch(studentdto.getBranch());
            // selectedProject aur role optional update kar sakta hai agar chahiye
            stdrepo.save(student);
            return "Student updated successfully";
        }
        return "Student not found";
    }

    @Override
    public String deleteStudent(int id) {
        if (stdrepo.existsById(id)) {
            stdrepo.deleteById(id);
            return "Student deleted successfully";
        }
        return "Student not found";
    }


    @Override
    public List<ViewDTO> getAllStudents() {
        List<Student> students = stdrepo.findAll(); // stdrepo is your JPA repository
        List<ViewDTO> result = new ArrayList<>();

        for (Student s : students) {
            ViewDTO dto = new ViewDTO();
            dto.setStdid(s.getStdid());
            dto.setName(s.getName());
            dto.setRollno(s.getRollno());
            dto.setPhno(s.getPhno());
            dto.setEmail(s.getEmail());
            dto.setBranch(s.getBranch());
            dto.setAddress(s.getAddress());
            dto.setSelectedProject(s.getSelectedProject());
            dto.setDomain(s.getDomain());
            result.add(dto);
        }
        return result;
    }
}
