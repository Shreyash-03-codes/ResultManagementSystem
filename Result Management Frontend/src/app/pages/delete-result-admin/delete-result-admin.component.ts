import { Component, OnInit } from '@angular/core';
import { AdminService, StudentResultWithStudentResponseDto } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-result-admin',
  templateUrl: './delete-result-admin.component.html',
  styleUrls: ['./delete-result-admin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DeleteResultAdminComponent implements OnInit {

  allStudents: string[] = [];
  filteredStudents: string[] = [];
  selectedUsername: string | null = null;

  studentResults: StudentResultWithStudentResponseDto[] = [];

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService,private router:Router) { }



   ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      // Not logged in → redirect to login
      this.router.navigateByUrl('login');
      return;
    }

    if (role !== 'ADMIN') {
      // Logged in but not admin → redirect to home
      this.router.navigateByUrl('home');
      return;
    }
  }

  // Only admin will reach this point
  this.loadAllStudents();
}

  loadAllStudents() {
    this.adminService.allStudents().subscribe({
      next: students => {
        this.allStudents = students.map(s => s.username);
        this.filteredStudents = [...this.allStudents];
      },
      error: err => this.errorMessage = 'Failed to fetch students'
    });
  }

  searchStudent(value: string) {
    if (!value) {
      this.filteredStudents = [];
      return;
    }
    this.filteredStudents = this.allStudents.filter(u =>
      u.toLowerCase().includes(value.toLowerCase())
    );
  }

  selectStudent(username: string) {
    this.selectedUsername = username;
    this.filteredStudents = [];

    // Fetch student's results
    this.adminService.getAllResults().subscribe({
      next: res => {
        const allResults = res.flat(); // flatten 2D array
        this.studentResults = allResults.filter(r => r.username === username);
      },
      error: err => this.errorMessage = 'Failed to fetch student results'
    });
  }

  changeStudent() {
    this.selectedUsername = null;
    this.studentResults = [];
    this.filteredStudents = [...this.allStudents];
  }

  deleteResult(resultId: number) {
    if (!this.selectedUsername) return;

    this.adminService.deleteStudentResult(resultId).subscribe({
      next: () => {
        this.successMessage = 'Result deleted successfully';
        this.errorMessage = '';
        // Remove deleted result from local array
        this.studentResults = this.studentResults.filter(r => r.id !== resultId);
        this.router.navigateByUrl("home");
      },
      error: err => {
        console.error(err);
        this.successMessage = 'Result deleted successfully';
        this.successMessage = '';
                this.router.navigateByUrl("home");

      }
    });
  }

}
