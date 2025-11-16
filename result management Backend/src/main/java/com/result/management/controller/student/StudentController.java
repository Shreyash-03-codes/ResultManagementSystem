package com.result.management.controller.student;

import com.result.management.dto.students.StudentResultResponseDto;
import com.result.management.entity.Student;
import com.result.management.services.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping ("/results")
    public ResponseEntity<List<StudentResultResponseDto>> getAllResults(@AuthenticationPrincipal Student student){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.allStudentResults(student));

    }
}
