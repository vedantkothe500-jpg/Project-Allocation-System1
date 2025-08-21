package com.example.Project_Allocation.Service;


import com.example.Project_Allocation.DTO.Studentdto;
import com.example.Project_Allocation.DTO.ViewDTO;


import java.util.List;

public interface Stdservice
{

    public String addStd(Studentdto sdto);


    String updateStudent(int id, Studentdto studentdto);
    String deleteStudent(int id);
    Object getUserByEmail(String email);
    Object getAdminByEmail(String email);
    List<ViewDTO> getAllStudents();
}
