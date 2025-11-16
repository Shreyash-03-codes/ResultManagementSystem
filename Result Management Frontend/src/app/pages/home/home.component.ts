import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService, StudentResultResponseDto } from '../../services/student.service';
import { AdminService, StudentResultWithStudentResponseDto } from '../../services/admin.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role: string | null = null;
  loggedInUsername: string = '';

  /** ================== STUDENT ================== **/
  studentResults: StudentResultResponseDto[] = [];
  studentResultsBySem: { [sem: number]: StudentResultResponseDto[] } = {};

  /** ================== ADMIN ================== **/
  allStudentResults: { [studentName: string]: StudentResultWithStudentResponseDto[] } = {};
  allStudentResultsBySem: { [studentName: string]: { [sem: number]: StudentResultWithStudentResponseDto[] } } = {};

  constructor(
    private studentService: StudentService,
    private adminService: AdminService,
    private router:Router
  ) {}

ngOnInit(): void {
  if (typeof window === 'undefined') return; // not in browser, stop execution

  const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigateByUrl('login');
    return;
  }

  this.role = localStorage.getItem('role');
  this.loggedInUsername = localStorage.getItem('username') || '';

  if (this.role === 'STUDENT') {
    this.loadStudentResults();
  } else if (this.role === 'ADMIN') {
    this.loadAllStudentsResults();
  }
}


  /** ================== STUDENT METHODS ================== **/

  private loadStudentResults() {
    this.studentService.getAllResults().subscribe({
      next: (data) => {
        this.studentResults = data;
        this.groupStudentResultsBySemester();
      },
      error: () => console.error('Failed to load student results')
    });
  }

  private groupStudentResultsBySemester() {
    this.studentResultsBySem = this.studentResults.reduce((acc: { [sem: number]: StudentResultResponseDto[] }, curr) => {
      if (!acc[curr.sem]) acc[curr.sem] = [];
      acc[curr.sem].push(curr);
      return acc;
    }, {});
  }

  get studentSemKeys(): number[] {
    return Object.keys(this.studentResultsBySem)
      .map(k => +k)
      .sort((a, b) => a - b);
  }

  /** ================== ADMIN METHODS ================== **/

  private loadAllStudentsResults() {
    this.adminService.getAllResults().subscribe({
      next: (data: StudentResultWithStudentResponseDto[][]) => {
        data.forEach(studentResultList => {
          if (studentResultList.length > 0) {
            const name = studentResultList[0].name;
            this.allStudentResults[name] = studentResultList;
            this.allStudentResultsBySem[name] = this.groupAdminResultsBySemester(studentResultList);
          }
        });
      },
      error: () => console.error('Failed to load all students results')
    });
  }

  private groupAdminResultsBySemester(results: StudentResultWithStudentResponseDto[]): { [sem: number]: StudentResultWithStudentResponseDto[] } {
    return results.reduce((acc: { [sem: number]: StudentResultWithStudentResponseDto[] }, curr) => {
      if (!acc[curr.sem]) acc[curr.sem] = [];
      acc[curr.sem].push(curr);
      return acc;
    }, {});
  }

  getStudentNames(): string[] {
    return Object.keys(this.allStudentResults).sort();
  }

  getStudentSemKeys(username: string): number[] {
    if (!this.allStudentResultsBySem[username]) return [];
    return Object.keys(this.allStudentResultsBySem[username]).map(Number).sort((a, b) => a - b);
  }
}
