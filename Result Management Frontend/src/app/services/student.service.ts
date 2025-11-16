import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTO Interface matching backend
export interface StudentResultResponseDto {
  mse: number;
  ese: number;
  ca1: number;
  ca2: number;
  grade: string;
  credits: number;
  courseName: string;
  sem: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/v1/student'; // update with your backend URL

  constructor(private http: HttpClient) { }

  getAllResults(): Observable<StudentResultResponseDto[]> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    throw new Error('User not logged in'); // Or return EMPTY observable
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<StudentResultResponseDto[]>(`${this.baseUrl}/results`, { headers });
}

}
