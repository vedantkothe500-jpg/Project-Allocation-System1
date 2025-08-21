package com.example.Project_Allocation.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "Student")
public class Student {
    @Id
    @Column(length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int stdid;

    @Column
    private String name;

    @Column
    private int rollno;

    @Column
    private long phno;


    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String password;

    @Column
    private String branch;

    @Column
    private String address;

    @Column(nullable = true)
    private String selectedProject;

    @Column(nullable = false)
    private String role = "USER";

    // ✅ New field to store selected domain
    @Column(nullable = true)
    private String domain;

    public Student() {
    }

    public Student(int stdid, String name, int rollno, long phno, String email, String password, String branch, String address, String selectedProject, String role, String domain) {
        this.stdid = stdid;
        this.name = name;
        this.rollno = rollno;
        this.phno = phno;
        this.email = email;
        this.password = password;
        this.branch = branch;
        this.address = address;
        this.selectedProject = selectedProject;
        this.role = role;
        this.domain = domain;
    }


    public int getStdid() {
        return stdid;
    }

    public void setStdid(int stdid) {
        this.stdid = stdid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRollno() {
        return rollno;
    }

    public void setRollno(int rollno) {
        this.rollno = rollno;
    }

    public long getPhno() {
        return phno;
    }

    public void setPhno(long phno) {
        this.phno = phno;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSelectedProject() {
        return selectedProject;
    }

    public void setSelectedProject(String selectedProject) {
        this.selectedProject = selectedProject;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    @Override
    public String toString() {
        return "Student{" +
                "stdid=" + stdid +
                ", name='" + name + '\'' +
                ", rollno=" + rollno +
                ", phno=" + phno +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", branch='" + branch + '\'' +
                ", address='" + address + '\'' +
                ", selectedProject='" + selectedProject + '\'' +
                ", role='" + role + '\'' +
                ", domain='" + domain + '\'' +
                '}';
    }
}
