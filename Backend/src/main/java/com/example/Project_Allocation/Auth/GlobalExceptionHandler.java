package com.example.Project_Allocation.Auth;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public Map<String, Object> handleBadCredentials(BadCredentialsException ex) {
        return Map.of(
                "status", false,
                "message", "Invalid email or password"
        );
    }
}

