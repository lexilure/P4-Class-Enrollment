package com.dlsu.enrollment.controller;

import com.dlsu.enrollment.model.Course;
import com.dlsu.enrollment.model.Enrollment;
import com.dlsu.enrollment.repository.CourseRepository;
import com.dlsu.enrollment.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
        return enrollmentRepo.findByUsername(username);
    }

    // Get courses NOT yet enrolled by a student
    @GetMapping("/unenrolled-courses/{username}")
    public List<Course> getUnenrolledCourses(@PathVariable String username) {
        // Get all enrolled course codes for the student
        Set<String> enrolledCourseCodes = enrollmentRepo.findByUsername(username)
                .stream()
                .map(Enrollment::getCourseCode)
                .collect(Collectors.toSet());

        // Return all courses where course code is not in enrolled set
        return courseRepo.findAll()
                .stream()
                .filter(course -> !enrolledCourseCodes.contains(course.getCourseCode()))
                .collect(Collectors.toList());
    }
}
