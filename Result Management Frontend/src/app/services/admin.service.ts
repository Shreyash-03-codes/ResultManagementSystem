import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs
export interface AddStudentMarks {
  username: string;
  mse: number;
  ese: number;
  ca1: number;
  ca2: number;
  grade: string;
  credits: number;
  courseName: string;
  sem: number;
}
export class StudentResultWithStudentResponseDto {
  id!: number;  // <-- add this
  mse!: number;
  ese!: number;
  ca1!: number;
  ca2!: number;
  grade!: string;
  credits!: number;
  courseName!: string;
  sem!: number;
  name!: string;
  username!: string;
}



export interface StudentUpdateRequestDto {
  id: number;
  username: string;
  mse: number;
  ese: number;
  ca1: number;
  ca2: number;
  grade: string;
  credits: number;
  courseName: string;
  sem: number;
}

export interface StudentDto {
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/v1/admin'; // your backend URL

  constructor(private http: HttpClient) { }

private getHeaders(): HttpHeaders {
  let token = '';
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('token') || '';
  }
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}





  allStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(`${this.baseUrl}/allstudents`, {
      headers: this.getHeaders()
    });
  }
  // Add student result
  addStudentResult(result: AddStudentMarks): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/addresult`,
      result,
      { headers: this.getHeaders() }
    );
  }

  // Update student result
  updateStudentResult(result: StudentUpdateRequestDto): Observable<string> {
    return this.http.put<string>(
      `${this.baseUrl}/updateresult`,
      result,
      { headers: this.getHeaders() }
    );
  }

  // Get all students' results
  getAllResults(): Observable<StudentResultWithStudentResponseDto[][]> {
    return this.http.get<StudentResultWithStudentResponseDto[][]>(
      `${this.baseUrl}/getresults`,
      { headers: this.getHeaders() }
    );
  }

  // Delete student result
  deleteStudentResult(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/deleteresult/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
