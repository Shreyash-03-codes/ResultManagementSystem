package com.result.management.services.admin;

import com.result.management.dto.admin.AddStudentMarks;
import com.result.management.dto.admin.StudentDto;
import com.result.management.dto.admin.StudentResultWithStudentResponseDto;
import com.result.management.dto.admin.StudentUpdateRequestDto;
import com.result.management.entity.Student;

import java.util.List;

public interface AdminService {
    List<List<StudentResultWithStudentResponseDto>> getAllStudentsResult();
    void addStudentsResult( AddStudentMarks addStudentMarks);
    void deleteStudentResult(Student student,long resultId);
    void updateStudentResult( StudentUpdateRequestDto studentUpdateRequestDto);
    List<StudentDto> allStudents();
}
