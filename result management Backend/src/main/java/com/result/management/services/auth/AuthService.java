package com.result.management.services.auth;

import com.result.management.dto.auth.login.LoginRequestDto;
import com.result.management.dto.auth.login.LoginResponseDto;
import com.result.management.dto.auth.signup.SignupRequestDto;
import com.result.management.dto.auth.signup.SignupResponseDto;

public interface AuthService {
    SignupResponseDto signup(SignupRequestDto signupRequestDto) throws IllegalAccessException;
    LoginResponseDto login(LoginRequestDto loginRequestDto);
}
