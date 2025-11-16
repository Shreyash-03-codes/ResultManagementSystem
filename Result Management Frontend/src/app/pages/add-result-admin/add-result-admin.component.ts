import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService, AddStudentMarks } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-result-admin',
  templateUrl: './add-result-admin.component.html',
  styleUrls: ['./add-result-admin.component.css'],
  imports:[ReactiveFormsModule,CommonModule,FormsModule]
})
export class AddResultAdminComponent implements OnInit {

  allStudents: string[] = [];        // all usernames
  filteredStudents: string[] = [];   // filtered usernames
  selectedUsername: string | null = null;

  resultForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private fb: FormBuilder,private router:Router) {
    this.resultForm = this.fb.group({
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

getToken(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('token');
  }
  return null;
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



  this.adminService.allStudents().subscribe({
    next: (students) => {
      this.allStudents = students.map(s => s.username);
      this.filteredStudents = [...this.allStudents];
    },
    error: (err) => {
      console.error('Failed to fetch students', err);
      this.errorMessage = 'Failed to fetch students. Check login/token.';
    }
  });
}


  // Called when typing in search input
searchStudent(value: string) {
  if (!value) {
    this.filteredStudents = [];
    return;
  }
  this.filteredStudents = this.allStudents.filter(u =>
    u.toLowerCase().includes(value.toLowerCase())
  );
}

// Called when clicking "Change" button to select another student
changeStudent() {
  this.selectedUsername = null;
  this.filteredStudents = [...this.allStudents]; // Reset filtered list
}


  // Select a student
  selectStudent(username: string) {
    this.selectedUsername = username;
    this.filteredStudents = [];
  }
submitResult() {
  if (!this.selectedUsername) return;

  if (this.resultForm.invalid) {
    this.errorMessage = 'Please fill all fields correctly';
    this.successMessage = '';
    return;
  }

  const result: AddStudentMarks = {
    username: this.selectedUsername,
    ...this.resultForm.value
  };

  this.adminService.addStudentResult(result).subscribe({
    next: (res) => {
      this.successMessage = 'Result added successfully';
      this.errorMessage = '';
    },
    error:(error)=>{
      this.successMessage = 'Result added successfully';
      this.errorMessage = '';
      this.router.navigateByUrl("home");
    }
  });
}


  
}
