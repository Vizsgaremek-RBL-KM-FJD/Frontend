import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private http: HttpClient, private auth: AuthService) {}

  register(user: any) {
    this.auth.register(user).subscribe((res) => {
      console.log(res);
    });
  }
}
