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
  
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
  Register() {

    if (this.gender === "") this.gender = "nem nyilatkozom";
    
 
    this.errorMessage = '';
    this.succesMessage = '';
  

    if (!this.first_name || !this.last_name || !this.email || !this.address || !this.phone_number || !this.password) {
      this.errorMessage = "Minden mezőt ki kell tölteni!";
      return; 
    }
  

    if (!this.validateEmail(this.email)) {
      this.errorMessage = "Hibás e-mail formátum!";
      return;
    }
  
    if (!this.validatePassword(this.password)) {
      this.errorMessage = "A jelszónak minimum 6 karakternek kell lennie, tartalmaznia kell kis- és nagybetűket, és számokat!";
      return;
    }

    this.auth.Register(this.first_name, this.last_name, this.gender, this.email, this.address, this.phone_number, this.password)
      .subscribe(
        (response: any) => {
          this.succesMessage = "Sikeres regisztráció!";
          
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        },
        (error: any) => {
          if (error.status === 400) {
            this.errorMessage = error.error.message || "Ellenőrizd az email címet!";
          } else if (error.status === 500) {
            this.errorMessage = "Hiba történt az e-mail küldésekor. Próbálja újra később.";
          } else {
            this.errorMessage = "Hiba történt. Kérjük, próbálja újra!";
          }
        }
      );
}

  
  }

