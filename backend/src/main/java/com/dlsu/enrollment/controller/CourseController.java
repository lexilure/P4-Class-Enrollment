package com.dlsu.enrollment.controller;

import com.dlsu.enrollment.model.Course;
import com.dlsu.enrollment.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepo;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }
}
