import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, BehaviorSubject } from 'rxjs';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<any>(null);
  public loggedUser$ = this.loggedUserSubject.asObservable();
  private userSub = new Subject();

  constructor(
    private http: HttpClient,
    private base: BaseService,
    private router: Router
  ) { 
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      this.loggedUserSubject.next(JSON.parse(storedUser));
    }
    this.isAdmin();
  }

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('loggedUser')!);
    if (user) {
      this.http.get<boolean>(this.base.api + "users/isAdmin/" + user.ID, this.base.httpOptions)
        .subscribe((response) => {
          this.isAdminSubject.next(response);
        });
    } else {
      this.isAdminSubject.next(false);
    }
  }

  getLoggedUser(): Observable<any> {
    return this.loggedUser$;
  }

  ForgotPassword(email: string) {
    return this.http.post(this.base.api + "users/forgot-password", { email });
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
    password: string ): Observable<any> {
    let body = {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      email: email,
      address: address,
      phone_number: phone_number,
      password: password
    };

    return this.http.post(this.base.api + "users/register", body);
  }

  errorMessage: string = '';

  Login(email: string, password: string): Observable<any> {
  let body = { email, password };

  return this.http.post(this.base.api + "users/login", body, this.base.httpOptions).pipe(
    map((res: any) => {
      this.loggedUserSubject.next(res);
      localStorage.setItem('loggedUser', JSON.stringify(res));
      this.isAdmin();
      return res;
    })
  );
}

  logout() {
    console.log('Logout method called');
    this.http.post(this.base.api + "users/logout", {}, this.base.httpOptions).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loggedUserSubject.next(null);
          this.isAdminSubject.next(false);
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