import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [FormsModule, CommonModule, RouterLink]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  role: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('username');
      const role = localStorage.getItem('role');

      this.isLoggedIn = !!token;
      this.username = user ? user : '';
      this.role = role ? role : '';
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');

      this.isLoggedIn = false;
      this.username = '';
      this.role = '';
      this.router.navigateByUrl('/');
    }
  }
}
