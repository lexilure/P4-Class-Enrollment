package com.dlsu.enrollment.controller;

import com.dlsu.enrollment.model.User;
import com.dlsu.enrollment.repository.UserRepository;
import com.dlsu.enrollment.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        User user = userRepo.findByUsername(username).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("username", user.getUsername());
            return response;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
