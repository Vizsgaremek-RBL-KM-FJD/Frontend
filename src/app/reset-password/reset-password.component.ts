import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base/base.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  Newpassword="";
  ConfirmPassword="";
  token!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private base:BaseService) {}

  ngOnInit(): void {
      this.token = this.route.snapshot.paramMap.get('token') ?? "";
      console.log(this.token)
  }

  ResetPassword() {
    const resetPasswordToken = this.token;
    const password = this.Newpassword;
  
    if (!resetPasswordToken || !password) {
      alert('Please enter a valid reset password token and password');
      return;
    }
  
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer ' + localStorage.getItem('token')
    // });
  
    this.http.put(this.base.api + 'users/reset-password', { resetPasswordToken, password })
      .subscribe((response: any) => {
        if (response.message === 'User updated successfully') {
          alert('Password reset successfully!');
        } else {
          alert(response.message);
        }
      }, (error: any) => {
        alert('Error resetting password');
      });
  }
}
