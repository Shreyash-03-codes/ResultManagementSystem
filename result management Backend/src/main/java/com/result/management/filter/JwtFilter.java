package com.result.management.filter;

import com.result.management.entity.Student;
import com.result.management.repositories.StudentRepository;
import com.result.management.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String username = null;
        String token = null;

        System.out.println("Authorization Header: " + header);

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            username = jwtUtil.getUsername(token);
            System.out.println("Extracted username: " + username);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<Student> studentOpt = studentRepository.findStudentByUsername(username);

            if (studentOpt.isPresent()) {
                Student student = studentOpt.get();
                boolean valid = jwtUtil.validateToken(token, username);
                System.out.println("Token valid: " + valid);

                if (valid) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(student, null, student.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("✅ Authentication set for: " + username);
                } else {
                    System.out.println("❌ Invalid token for user: " + username);
                }
            } else {
                System.out.println("❌ Student not found in DB: " + username);
            }
        }

        // 3️⃣ Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
