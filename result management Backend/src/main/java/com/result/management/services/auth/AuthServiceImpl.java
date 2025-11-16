package com.result.management.services.auth;

import com.result.management.dto.auth.login.LoginRequestDto;
import com.result.management.dto.auth.login.LoginResponseDto;
import com.result.management.dto.auth.signup.SignupRequestDto;
import com.result.management.dto.auth.signup.SignupResponseDto;
import com.result.management.entity.Student;
import com.result.management.repositories.StudentRepository;
import com.result.management.roles.Role;
import com.result.management.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public SignupResponseDto signup(SignupRequestDto signupRequestDto) throws IllegalAccessException {

        Optional<Student> exist=this.studentRepository.findStudentByUsername(signupRequestDto.getUsername());
        if(exist.isPresent()){
            throw new IllegalAccessException("Student already present...!!!");
        }

        Student student=new Student(signupRequestDto.getName(), signupRequestDto.getUsername(),passwordEncoder.encode(signupRequestDto.getPassword()),signupRequestDto.getEmail(),signupRequestDto.getMobileNumber(),signupRequestDto.getPrnNumber(),signupRequestDto.getDepartment(), Role.STUDENT);
        this.studentRepository.save(student);
        return new SignupResponseDto("Student created Successfully");
    }

    @Override
    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(),loginRequestDto.getPassword());
        Authentication authenticated =authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        Student student=(Student) authenticated.getPrincipal();
        String jwtToken=jwtUtil.generateJwtToken(student);

        return new LoginResponseDto(jwtToken, student.getUsername(), student.getRole().name());

    }
}
