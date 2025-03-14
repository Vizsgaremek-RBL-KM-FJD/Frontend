import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email=""
  password=""
  errorMessage=""

  constructor(private auth:AuthService){}

  Login(){
    if (this.email==="" || this.password==="") {
      this.errorMessage = "Hibás e-mail cím, vagy jelszó!"
    }
    this.auth.Login(this.email, this.password)
    this.email=""
    this.password=""
    
  }

}


