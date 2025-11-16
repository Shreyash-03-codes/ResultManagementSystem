import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTO Interfaces

export interface SignupRequestDto {
  name: string;
  username: string;
  password: string;
  email: string;
  mobileNumber: string;
  prnNumber: number;
  department: string;
}

export interface SignupResponseDto {
  msg: string;
}

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  jwtToken: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/v1/auth'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  signup(signupRequest: SignupRequestDto): Observable<SignupResponseDto> {
    return this.http.post<SignupResponseDto>(`${this.baseUrl}/signup`, signupRequest);
  }

  login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, loginRequest);
  }
}
