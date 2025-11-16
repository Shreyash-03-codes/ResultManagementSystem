import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  constructor(private router:Router){

  }

 ngOnInit(): void {
  if (typeof window !== 'undefined' && localStorage.getItem('token') != null) {
    // Token exists, you can call the API or initialize data
    this.router.navigateByUrl("home");
  }
}

  
}
