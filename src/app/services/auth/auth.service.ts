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
  }

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('loggedUser')!);
    if (user) {
      this.http.get<boolean>(this.base.api + "users/isAdmin/" + user.ID, this.base.httpOptions)
        .subscribe((response) => {
          this.isAdminSubject.next(response); // Frissíti az admin státuszt
        });
    } else {
      this.isAdminSubject.next(false); // Ha nincs bejelentkezett felhasználó, nem admin
    }
  }

  getLoggedUser(): Observable<any> {
    return this.loggedUser$;
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

  errorMessage: string = '';

  Login(email: string, password: string): Observable<any> {
  let body = { email, password };

  return this.http.post(this.base.api + "users/login", body, this.base.httpOptions).pipe(
    map((res: any) => {
      this.loggedUserSubject.next(res); // Beállítja az aktuális bejelentkezett felhasználót
      localStorage.setItem('loggedUser', JSON.stringify(res)); // Mentés LocalStorage-be
      this.isAdmin();
      return res;
    })
  );
}


// Login(email: string, password: string): Observable<any> {
//   let body = {
//     email: email,
//     password: password
//   };

//   return this.http.post(this.base.api + "users/login", body, this.base.httpOptions).subscribe({
//     next: (res) => {
//       console.log(res);
//       this.loggedUser = res;
//       localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
//       this.userSub.next(this.loggedUser);
//       this.router.navigate(['home']);
//       this.errorMessage = ''; // Ha sikeres a bejelentkezés, töröld a hibaüzenetet
//     },
//     error: (err) => {
//       console.log(err);
//       this.loggedUser = null;
//       this.userSub.next(this.loggedUser);

//       // Ellenőrizzük, hogy milyen hibaüzenet érkezett a szervertől
//       if (err.status === 401) {
//         this.errorMessage = "Hibás e-mail vagy jelszó!";
//       } else {
//         this.errorMessage = "Ismeretlen hiba történt. Próbáld újra később!";
//       }
//     }
//   });
// }


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