import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequestDto, LoginResponseDto } from '../../services/auth.service';
import { types } from 'util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginRequestDto = {
    username: '',
    password: ''
  };



  error: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
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
      this.error = 'Please fill all required fields';
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res: LoginResponseDto) => {
        // Save JWT, username, and role in localStorage
        localStorage.setItem('token', res.jwtToken);
        localStorage.setItem('username', res.username);
        localStorage.setItem('role', res.role);
        

        this.error = '';
        // Navigate to home page

                window.location.reload();

        this.router.navigate(['/home']);
      },
      error: (err:any) => {
        this.error = err.error?.msg || 'Invalid username or password';
      }
      
    });
  }
}
