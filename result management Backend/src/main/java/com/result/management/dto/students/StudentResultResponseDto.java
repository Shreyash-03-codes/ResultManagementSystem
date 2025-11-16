package com.result.management.dto.students;

public class StudentResultResponseDto {
    private int mse;

    private int ese;

    private int ca1;

    private int ca2;

    private String grade;

    private int credits;

    private String courseName;

    private int sem;

    public StudentResultResponseDto(int mse, int ese, int ca1, int ca2, String grade, int credits, String courseName, int sem) {
        this.mse = mse;
        this.ese = ese;
        this.ca1 = ca1;
        this.ca2 = ca2;
        this.grade = grade;
        this.credits = credits;
        this.courseName = courseName;
        this.sem = sem;
    }

    public StudentResultResponseDto() {
    }


    public int getMse() {
        return mse;
    }

    public void setMse(int mse) {
        this.mse = mse;
    }

    public int getCa1() {
        return ca1;
    }

    public void setCa1(int ca1) {
        this.ca1 = ca1;
    }

    public int getEse() {
        return ese;
    }

    public void setEse(int ese) {
        this.ese = ese;
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
}
