package com.result.management.services.admin;

import com.result.management.dto.admin.AddStudentMarks;
import com.result.management.dto.admin.StudentDto;
import com.result.management.dto.admin.StudentResultWithStudentResponseDto;
import com.result.management.dto.admin.StudentUpdateRequestDto;
import com.result.management.entity.Result;
import com.result.management.entity.Student;
import com.result.management.repositories.ResultRepository;
import com.result.management.repositories.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private  ResultRepository resultRepository;

    @Override
    public List<List<StudentResultWithStudentResponseDto>> getAllStudentsResult() {
        return studentRepository.findAll().stream()
                .map(student -> student.getResults().stream()
                        .map(result -> new StudentResultWithStudentResponseDto(
                                result.getId(),
                                student.getUsername(),
                                student.getName(),
                                result.getMse(),
                                result.getEse(),
                                result.getCa1(),
                                result.getCa2(),
                                result.getGrade(),
                                result.getCredits(),
                                result.getCourseName(),
                                result.getSem()
                        ))
                        .toList()
                )
                .toList();
    }


    @Override
    @Transactional
    public void addStudentsResult(AddStudentMarks addStudentMarks) {
        Student s=studentRepository.findStudentByUsername(addStudentMarks.getUsername()).get();
        Result result=new Result(addStudentMarks.getMse(),addStudentMarks.getEse(),addStudentMarks.getCa1(),addStudentMarks.getCa2(),addStudentMarks.getGrade(),addStudentMarks.getCredits(),addStudentMarks.getCourseName(),addStudentMarks.getSem(),s);
        s.getResults().add(result);
    }

    @Override
    @Transactional
    public void deleteStudentResult(Student student, long resultId) {
         Student s=studentRepository.findStudentByUsername(student.getUsername()).get();
        s.getResults().removeIf(r->r.getId()==resultId);
        studentRepository.save(s);
        resultRepository.deleteById(resultId);
    }

    @Override
    @Transactional
    public void updateStudentResult( StudentUpdateRequestDto studentUpdateRequestDto) {
        Student s=studentRepository.findStudentByUsername(studentUpdateRequestDto.getUsername()).get();
        s.getResults().forEach(r-> {
                    if (r.getId()==studentUpdateRequestDto.getId()){
                        r.setMse(studentUpdateRequestDto.getMse());
                        r.setEse(studentUpdateRequestDto.getEse());
                        r.setCa1(studentUpdateRequestDto.getCa1());
                        r.setCa2(studentUpdateRequestDto.getCa2());
                        r.setGrade(studentUpdateRequestDto.getGrade());
                        r.setCredits(studentUpdateRequestDto.getCredits());
                        r.setSem(studentUpdateRequestDto.getSem());
                    }

                }
        );
        studentRepository.save(s);

    }

    public List<StudentDto > allStudents(){
        return studentRepository.findAll().stream().map(s->{
            StudentDto studentDto=new StudentDto(s.getUsername());
            return studentDto;
        }).toList();
    }


}
