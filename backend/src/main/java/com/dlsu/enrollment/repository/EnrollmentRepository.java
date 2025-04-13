package com.dlsu.enrollment.repository;

import com.dlsu.enrollment.model.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByUsername(String username);
    List<Enrollment> findByCourseCode(String courseCode);
}
