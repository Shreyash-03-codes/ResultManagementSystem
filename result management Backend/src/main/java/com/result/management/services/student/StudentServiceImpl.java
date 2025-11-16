package com.result.management.services.student;

import com.result.management.dto.students.StudentResultResponseDto;
import com.result.management.entity.Result;
import com.result.management.entity.Student;
import com.result.management.repositories.ResultRepository;
import com.result.management.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<StudentResultResponseDto> allStudentResults(Student student) {
        List<Result> results=this.studentRepository.findStudentByUsername(student.getUsername()).orElseThrow(()->new RuntimeException("Student not found")).getResults();
         List<StudentResultResponseDto> responseDtos=results.stream().map(
                 r-> {
                     StudentResultResponseDto s = new StudentResultResponseDto(r.getMse(),r.getEse(),r.getCa1(),r.getCa2(),r.getGrade(),r.getCredits(),r.getCourseName(),r.getSem());
                     System.out.println(s);
                     return s;
                 }

         ).toList();
         return  responseDtos;
    }
}
