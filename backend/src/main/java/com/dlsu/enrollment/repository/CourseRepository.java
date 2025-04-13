package com.dlsu.enrollment.repository;

import com.dlsu.enrollment.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CourseRepository extends MongoRepository<Course, String> {
    Optional<Course> findByCode(String code);
}
