package com.dlsu.enrollment.repository;

import com.dlsu.enrollment.model.Grade;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface GradeRepository extends MongoRepository<Grade, String> {
    List<Grade> findByUsername(String username);
    List<Grade> findByCourseCode(String courseCode);
    List<Grade> findByCourseCodeAndUsername(String courseCode, String username);
}