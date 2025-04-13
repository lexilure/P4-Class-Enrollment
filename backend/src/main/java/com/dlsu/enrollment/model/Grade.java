package com.dlsu.enrollment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "grades")
public class Grade {

    @Id
    private String id;

    private String username;
    private String courseCode;
    private String courseName;
    private String section;
    private double grade;
    private String term;

    public Grade() {}

    public Grade(String username, String courseCode, String courseName, String section, double grade, String term) {
        this.username = username;
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.section = section;
        this.grade = grade;
        this.term = term;
    }

    // Getters and setters

    public String getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public double getGrade() { return grade; }
    public void setGrade(double grade) { this.grade = grade; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }
}
