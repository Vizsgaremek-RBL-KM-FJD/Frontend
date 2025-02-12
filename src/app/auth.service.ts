import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = "http://localhost:3000/users/";
  private loggedUser: any;
  private userSub = new Subject();

  private httpOptions = {
    withCredentials: true
  };

  constructor(private http: HttpClient) { 
  }

  getAllUser() {
    this.http.get(this.api, this.httpOptions).subscribe(
      (res) => console.log(res)
    );
  }

  getLoggedUser() {
    return this.userSub.asObservable();
  }

  signIn(email: string, password: string) {
    let body = {
      email: email,
      password: password
    };

    this.http.post<{ token: string }>(this.api + "login", body, this.httpOptions).subscribe(
      {
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.loggedUser = res;
          this.userSub.next(this.loggedUser);
        },
        error: (err) => {
          console.log(err);
          this.loggedUser = null;
          this.userSub.next(this.loggedUser);
        }
      }
    );
  }

  signUp(first_name: string, last_name: string, gender: string, email: string, address: string, phone_number: string, password: string) {
    let body = {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      email: email,
      address: address,
      phone_number: phone_number,
      password: password
    };

    this.http.post(this.api + "register", body).subscribe(
      {
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      }
    );
  }

  getSecret() {
    if (this.loggedUser) {
      this.http.get(this.api + "secretdata", this.httpOptions).subscribe(
        {
          next: (res) => console.log(res),
          error: (err) => console.log(err)
        }
      );
    }
  }

  logout() {
    this.http.post(this.api + "logout", {}, this.httpOptions).subscribe(
      {
        next: (res) => {
          console.log(res);
          localStorage.removeItem('token');
          this.loggedUser = null;
          this.userSub.next(this.loggedUser);
        },
        error: (err) => console.log(err)
      }
    );
  }
}
