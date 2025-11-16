package com.result.management.util;

import com.result.management.entity.Student;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET;
    private final long EXPIRATION=1000*60*60;

    private SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    public String generateJwtToken(Student student){
        Map<String, Object> claims=new HashMap<>();
        claims.put("name",student.getName());
        claims.put("username",student.getUsername());
        claims.put("role",student.getRole().name());

        return createToken(student.getUsername(),claims);
    }

    private String createToken(String username, Map<String,Object> claims){
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION))
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isExpired(String token){
        return extractClaims(token).getExpiration().before(new Date());
    }

    public String getUsername(String token){
        return extractClaims(token).getSubject();
    }
    public boolean validateToken(String token,String username){
        return username.equals(getUsername(token)) && !isExpired(token);
    }

}
