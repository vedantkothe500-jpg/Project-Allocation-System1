package com.example.Project_Allocation.Security;


import com.example.Project_Allocation.Entity.Admin;
import com.example.Project_Allocation.Entity.Student;
import com.example.Project_Allocation.Repo.AdminRepo;
import com.example.Project_Allocation.Repo.Stdrepo;
import com.example.Project_Allocation.Security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepo adminRepo;
    private final Stdrepo studentRepo;

    public CustomUserDetailsService(AdminRepo adminRepo, Stdrepo studentRepo) {
        this.adminRepo = adminRepo;
        this.studentRepo = studentRepo;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // ✅ Try Admin first
        return adminRepo.findByEmail(email)
                .map(admin -> new CustomUserDetails(admin.getEmail(), admin.getPassword(), "ADMIN"))
                // ✅ If not admin, try Student
                .orElseGet(() -> {
                    Student student = studentRepo.findByEmail(email);
                    if (student != null) {
                        return new CustomUserDetails(student.getEmail(), student.getPassword(), "USER");
                    }
                    throw new UsernameNotFoundException("User not found with email: " + email);
                });
    }
}
