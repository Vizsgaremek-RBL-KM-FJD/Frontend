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

    Register(){
    if (!this.first_name || !this.last_name || !this.email || !this.address || !this.phone_number || !this.password) {this.errorMessage="Minden mezőt ki kell tölteni!"; this.succesMessage=""}
    else {
      this.auth.Register( this.first_name, this.last_name, this.gender, this.email, this.address, this.phone_number, this.password);
      this.errorMessage="";
      this.succesMessage="Sikeres regisztráció!"

      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);
    }
    }
  }

