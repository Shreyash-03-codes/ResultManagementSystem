import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService, StudentResultWithStudentResponseDto, StudentUpdateRequestDto } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-result-admin',
  templateUrl: './update-result-admin.component.html',
  styleUrls: ['./update-result-admin.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class UpdateResultAdminComponent implements OnInit {

  allStudents: string[] = [];
  filteredStudents: string[] = [];
  selectedUsername: string | null = null;

  studentResults: StudentResultWithStudentResponseDto[] = [];
  selectedResultId: number | null = null;

  updateForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private fb: FormBuilder,private router:Router) {
    this.updateForm = this.fb.group({
      courseName: ['', Validators.required],
      mse: [0, [Validators.required, Validators.min(0)]],
      ca1: [0, [Validators.required, Validators.min(0)]],
      ca2: [0, [Validators.required, Validators.min(0)]],
      ese: [0, [Validators.required, Validators.min(0)]],
      credits: [0, [Validators.required, Validators.min(0)]],
      grade: ['', Validators.required],
      sem: [1, [Validators.required, Validators.min(1)]]
    });
  }

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


  // Load all students
  loadAllStudents() {
    this.adminService.allStudents().subscribe({
      next: students => {
        this.allStudents = students.map(s => s.username);
        this.filteredStudents = [...this.allStudents];
      },
      error: () => this.errorMessage = 'Failed to fetch students'
    });
  }

  // Filter students while typing
  searchStudent(value: string) {
    if (!value) {
      this.filteredStudents = [];
      return;
    }
    this.filteredStudents = this.allStudents.filter(u =>
      u.toLowerCase().includes(value.toLowerCase())
    );
  }

  // Select a student and load their results
  selectStudent(username: string) {
    this.selectedUsername = username;
    this.filteredStudents = [];

    this.adminService.getAllResults().subscribe({
      next: res => {
        const allResults = res.flat(); // flatten 2D array
        this.studentResults = allResults.filter(r => r.username === username);
      },
      error: () => this.errorMessage = 'Failed to fetch student results'
    });
  }

  // Reset selection
  changeStudent() {
    this.selectedUsername = null;
    this.selectedResultId = null;
    this.studentResults = [];
    this.filteredStudents = [...this.allStudents];
  }

  // Select a result to edit
  selectResult(resultId: number) {
    this.selectedResultId = resultId;
    const selected = this.studentResults.find(r => r.id === resultId);
    if (selected) {
      this.updateForm.patchValue({
        courseName: selected.courseName,
        mse: selected.mse,
        ca1: selected.ca1,
        ca2: selected.ca2,
        ese: selected.ese,
        credits: selected.credits,
        grade: selected.grade,
        sem: selected.sem
      });
    }
  }

  // Submit updated result
  submitUpdate() {
    if (!this.selectedUsername || !this.selectedResultId) {
      this.errorMessage = 'Select a student and result to update';
      return;
    }

    if (this.updateForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    const updateDto: StudentUpdateRequestDto = {
      id: this.selectedResultId,
      username: this.selectedUsername,
      ...this.updateForm.value
    };

    this.adminService.updateStudentResult(updateDto).subscribe({
      next: () => {
        this.successMessage = 'Result updated successfully';
        this.errorMessage = '';
        // Update local result array
        const idx = this.studentResults.findIndex(r => r.id === this.selectedResultId);
        if (idx > -1) {
          this.studentResults[idx] = { ...this.studentResults[idx], ...this.updateForm.value };
        }
        this.router.navigateByUrl("home")
      },
      error: err => {
        this.successMessage = 'Result updated successfully';
        this.errorMessage = '';
        // Update local result array
        const idx = this.studentResults.findIndex(r => r.id === this.selectedResultId);
        if (idx > -1) {
          this.studentResults[idx] = { ...this.studentResults[idx], ...this.updateForm.value };
        }
                this.router.navigateByUrl("home")

      }
    });
  }

}
