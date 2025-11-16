package com.result.management.services.userdetails;

import com.result.management.entity.Student;
import com.result.management.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final StudentRepository studentRepository;

    @Autowired
    public UserDetailsServiceImpl(StudentRepository studentRepository){
        this.studentRepository=studentRepository;
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Student> student=this.studentRepository.findStudentByUsername(username);
        if(student.isPresent()){
            return student.get();
        }
        throw new UsernameNotFoundException("Username not found...!!!");
    }
}
