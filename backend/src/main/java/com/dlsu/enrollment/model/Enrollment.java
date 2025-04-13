package com.dlsu.enrollment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "enrollments")
public class Enrollment {

    @Id
    private String id;

    private String username;
    private String courseCode;
    private String section;

    public Enrollment() {}

    public Enrollment(String username, String courseCode, String section) {
        this.username = username;
        this.courseCode = courseCode;
        this.section = section;
    }

    // Getters and setters

    public String getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
}
