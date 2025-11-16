package com.result.management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int mse;

    private int ese;

    private int ca1;

    private int ca2;

    private String grade;

    private int credits;

    private String courseName;

    private int sem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;


    public Result() {
    }

    public Result(int mse, int ese, int ca1, int ca2, String grade, int credits, String courseName, int sem, Student student) {
        this.mse = mse;
        this.ese = ese;
        this.ca1 = ca1;
        this.ca2 = ca2;
        this.grade = grade;
        this.credits = credits;
        this.courseName = courseName;
        this.sem = sem;
        this.student = student;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getMse() {
        return mse;
    }

    public void setMse(int mse) {
        this.mse = mse;
    }

    public int getEse() {
        return ese;
    }

    public void setEse(int ese) {
        this.ese = ese;
    }

    public int getCa1() {
        return ca1;
    }

    public void setCa1(int ca1) {
        this.ca1 = ca1;
    }

    public int getCa2() {
        return ca2;
    }

    public void setCa2(int ca2) {
        this.ca2 = ca2;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public int getSem() {
        return sem;
    }

    public void setSem(int sem) {
        this.sem = sem;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
