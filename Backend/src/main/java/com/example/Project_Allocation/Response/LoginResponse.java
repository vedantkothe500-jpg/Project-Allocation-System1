package com.example.Project_Allocation.Response;

public class LoginResponse {
    private String message;
    private Boolean status;
    private Object user;  // ✅ Can hold Student or Admin
    private String role;  // ✅ Role detection for frontend redirection
    private String token; // 🆕 JWT Token

    // ✅ Constructor with token
    public LoginResponse(String message, Boolean status, Object user, String role, String token) {
        this.message = message;
        this.status = status;
        this.user = user;
        this.role = role;
        this.token = token;
    }

    // ✅ Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object user) {
        this.user = user;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
