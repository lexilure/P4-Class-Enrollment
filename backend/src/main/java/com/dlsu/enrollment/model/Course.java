package com.dlsu.enrollment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
public class Course {

    @Id
    private String id;

    private String code;
    private String name;
    private int units;
    private String schedule;

    public Course() {}

    public Course(String code, String name, int units, String schedule) {
        this.code = code;
        this.name = name;
        this.units = units;
        this.schedule = schedule;
    }

    // Getters and setters

    public String getId() { return id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getUnits() { return units; }
    public void setUnits(int units) { this.units = units; }

    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }
}
