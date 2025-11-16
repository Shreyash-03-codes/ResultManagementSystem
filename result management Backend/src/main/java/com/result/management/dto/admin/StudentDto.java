package com.result.management.dto.admin;

public class StudentDto {
    private String username;

    public StudentDto(String username) {
        this.username = username;
    }

    public StudentDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
