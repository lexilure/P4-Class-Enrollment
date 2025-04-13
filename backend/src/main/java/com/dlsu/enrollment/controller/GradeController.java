package com.dlsu.enrollment.controller;

import com.dlsu.enrollment.model.Grade;
import com.dlsu.enrollment.repository.GradeRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/grades")
@CrossOrigin(origins = "*")
public class GradeController {

    @Autowired
    private GradeRepository gradeRepo;

    private static final String SECRET_KEY = "secret_key";

    // Add Grade for a course
    @PostMapping("/upload")
    public Grade uploadGrade(@RequestBody Grade grade) {
        return gradeRepo.save(grade);
    }

    // Get Grades for a course (Filtered by courseCode and student)
    @GetMapping("/course/{courseCode}")
    public List<Grade> getGradesByCourse(@PathVariable String courseCode, HttpServletRequest request) {
        String username = getStudentIdFromToken(request);
        return gradeRepo.findByCourseCodeAndUsername(courseCode, username);
    }

    // Helper method to extract studentId from JWT token
    private String getStudentIdFromToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
