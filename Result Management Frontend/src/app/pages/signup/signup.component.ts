import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, SignupRequestDto, SignupResponseDto } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})export class SignupComponent implements OnInit {
  signupData: SignupRequestDto = {
    name: '',
    username: '',
    password: '',
    email: '',
    mobileNumber: '',
    prnNumber: 0,
    department: ''
  };

  message: string = '';
  error: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService,private router:Router) {}

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      // User already logged in, redirect to home
      this.router.navigateByUrl('home');
    }
  }
}


  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.error = 'Please fill all required fields correctly!';
      return;
    }

    this.authService.signup(this.signupData).subscribe({
      next: (res) => {
        this.message = res.msg;
        this.error = '';
        form.resetForm();
        this.router.navigateByUrl("login")
      },
      error: (err) => {
        this.error = err.error?.msg || 'Signup failed!';
        this.message = '';
      }
    });
  }
}
