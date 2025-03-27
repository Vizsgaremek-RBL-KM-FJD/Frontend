import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: any;
  private userSub = new Subject();

  constructor(
    private http: HttpClient,
    private base: BaseService,
    private router: Router
  ) { }

  isAdmin() {
    const id = JSON.parse(localStorage.getItem('loggedUser')!).ID;
    return this.http.get(this.base.api + "users/isAdmin/" + id, this.base.httpOptions)
  }

  getLoggedUser() {
    return this.userSub;
  }

  isLoggedIn(): boolean {
    return !!JSON.parse(localStorage.getItem('loggedUser')!);
  }

  Register(
    first_name: string,
    last_name: string,
    gender: string,
    email: string,
    address: string,
    phone_number: string,
    password: string ) {
    let body = {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      email: email,
      address: address,
      phone_number: phone_number,
      password: password
    };

    this.http.post(this.base.api + "users/register", body).subscribe(
      {
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      }
    );
  }

  Login(
    email: string,
    password: string ) {
    let body = {
      email: email,
      password: password
    };
  
    this.http.post(this.base.api + "users/login", body, this.base.httpOptions).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loggedUser = res;
          localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
          this.userSub.next(this.loggedUser);
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log(err);
          this.loggedUser = null;
          this.userSub.next(this.loggedUser);
        }
      }
    );
  }

  // logout() {
  //   console.log('Logout method called');
  //   this.http.post(this.base.api + "users/logout", {}, this.base.httpOptions).subscribe(
  //     {
  //       next: (res) => {
  //         console.log(res);
  //         this.loggedUser = null;
  //         this.userSub.next(null);
  //         localStorage.removeItem('loggedUser');
  //         console.log('Logged user removed from local storage');
  //       },
  //       error: (err) => console.log(err)
  //     }
  //   );
  // }

  logout() {
    console.log('Logout method called');
    this.http.post(this.base.api + "users/logout", {}, this.base.httpOptions).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loggedUser = null;
          this.userSub.next(null);
          localStorage.removeItem('loggedUser');
          console.log('Logged user removed from local storage');
        },
        error: (err) => console.log(err)
      }
    );
    return false;
  }
}