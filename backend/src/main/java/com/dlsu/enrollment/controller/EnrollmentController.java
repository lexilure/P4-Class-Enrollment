package com.dlsu.enrollment.controller;

import com.dlsu.enrollment.model.Enrollment;
import com.dlsu.enrollment.repository.EnrollmentRepository;
import com.dlsu.enrollment.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "*") 
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @Autowired
    private CourseRepository courseRepo;

    // Create Enrollment (Enroll a student)
    @PostMapping("/enroll")
    public Enrollment enroll(@RequestBody Enrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    // Get Enrollment Information
    @GetMapping("/student/{username}")
    public List<Enrollment> getEnrollmentsByStudent(@PathVariable String username) {
        return enrollmentRepo.findByStudentUsername(username);
    }
}
