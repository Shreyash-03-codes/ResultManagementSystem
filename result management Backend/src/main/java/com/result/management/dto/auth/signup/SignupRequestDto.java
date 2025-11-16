package com.result.management.dto.auth.signup;

public class SignupRequestDto {

    private String name;

    private String username;

    private String password;

    private String email;

    private String mobileNumber;

    private long prnNumber;

    private String department;


    public SignupRequestDto() {
    }

    public SignupRequestDto(String name, String username, String password, String email, String mobileNumber, long prnNumber, String department) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.prnNumber = prnNumber;
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getPrnNumber() {
        return prnNumber;
    }

    public void setPrnNumber(long prnNumber) {
        this.prnNumber = prnNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
