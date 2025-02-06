import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email=""
  password=""

  constructor(private auth:AuthService){}

  signIn(){
    this.auth.signIn(this.email, this.password)
    this.email=""
    this.password=""
  }

  getAllUsers(){
    this.auth.getAllUser()
  }
}


