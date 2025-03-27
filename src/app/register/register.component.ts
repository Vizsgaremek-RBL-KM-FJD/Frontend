import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  errorMessage="";
  succesMessage="";

  constructor(private auth:AuthService, private router:Router){}

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  }

  Register(){
    if (!this.first_name || !this.last_name || !this.email || !this.address || !this.phone_number || !this.password)
      {this.errorMessage="Minden mezőt ki kell tölteni!"; this.succesMessage=""}
  
    if (!this.validatePassword(this.password) && !this.errorMessage)
      {this.errorMessage="A jelszónak minimum 6 karakternek kell lennie, tartalmaznia kell kis- e és nagybetüket, és számokat!"; this.succesMessage=""}
  
    if (!this.errorMessage) {
      this.auth.Register( this.first_name, this.last_name, this.gender, this.email, this.address, this.phone_number, this.password);
      this.errorMessage="";
      this.succesMessage="Sikeres regisztráció!"
  
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);
    }
  }
  }

