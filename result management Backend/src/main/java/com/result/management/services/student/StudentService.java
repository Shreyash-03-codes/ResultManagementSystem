package com.result.management.services.student;

import com.result.management.dto.students.StudentResultResponseDto;
import com.result.management.entity.Result;
import com.result.management.entity.Student;

import java.util.List;

public interface StudentService {
    List<StudentResultResponseDto> allStudentResults(Student student);
}
