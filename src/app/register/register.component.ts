import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  first_name=""
  last_name=""
  gender=""
  email=""
  address=""
  phone_number=""
  password=""

  constructor(private auth:AuthService){}

  signUp(){
    this.auth.signUp( this.first_name, this.last_name, this.gender, this.email, this.address, this.phone_number, this.password)
  }
}
