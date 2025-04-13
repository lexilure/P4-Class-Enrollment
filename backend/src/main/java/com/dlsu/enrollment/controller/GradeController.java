package com.dlsu.enrollment.controller;

import com.dlsu.enrollment.model.Grade;
import com.dlsu.enrollment.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
@CrossOrigin(origins = "*") 
public class GradeController {

    @Autowired
    private GradeRepository gradeRepo;

    // Add Grade for a course
    @PostMapping("/upload")
    public Grade uploadGrade(@RequestBody Grade grade) {
        return gradeRepo.save(grade);
    }

    // Get Grades of a student
    @GetMapping("/student/{username}")
    public List<Grade> getGradesByStudent(@PathVariable String username) {
        return gradeRepo.findByUsername(username);
    }

    // Get Grades for a course
    @GetMapping("/course/{courseCode}")
    public List<Grade> getGradesByCourse(@PathVariable String courseCode) {
        return gradeRepo.findByCourseCode(courseCode);
    }
}
