package com.result.management.controller.admin;

import com.result.management.dto.admin.AddStudentMarks;
import com.result.management.dto.admin.StudentDto;
import com.result.management.dto.admin.StudentResultWithStudentResponseDto;
import com.result.management.dto.admin.StudentUpdateRequestDto;
import com.result.management.entity.Student;
import com.result.management.services.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/addresult")
    public ResponseEntity<String> addStudent( @RequestBody AddStudentMarks addStudentMarks){
        adminService.addStudentsResult(addStudentMarks);
        return ResponseEntity.status(HttpStatus.CREATED).body("Result added successfully");
    }

    @PutMapping("/updateresult")
    public ResponseEntity<String> updateStudent( @RequestBody StudentUpdateRequestDto studentUpdateRequestDto){
        adminService.updateStudentResult(studentUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Result updated Successfully");
    }

    @GetMapping("/getresults")
    public ResponseEntity<List<List<StudentResultWithStudentResponseDto>>> getAllResults(){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.getAllStudentsResult());
    }

    @DeleteMapping("/deleteresult/{id}")
    public ResponseEntity<String> deleteStudent(@AuthenticationPrincipal Student student, @PathVariable("id") long id){
        adminService.deleteStudentResult(student,id);
        return ResponseEntity.status(HttpStatus.OK).body("Result deleted successfully");
    }

    @GetMapping("/allstudents")
    public ResponseEntity<List<StudentDto>> allStudent(){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.allStudents());
    }
}
