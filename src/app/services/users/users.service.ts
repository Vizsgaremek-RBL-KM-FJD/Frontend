import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient,
    private auth:AuthService,
    private base:BaseService
  ) { }


  UpdateUser(id: number, user: any) {
    return this.http.patch(`${this.base.api}`+`${id}`, user, this.base.httpOptions);
  }
  sadmin(user:any) {
    this.http.patch(this.base.api+"users/sadmin-update-profile/" + 7, user, this.base.httpOptions).subscribe(
      (res)=>console.log(res)
    )
  }

  deleteUser(userID: number) {
    return this.http.delete(this.base.api + 'users/' + userID);
  }

  getAllUsers() {
    return this.http.get(this.base.api + 'users');
  }

  DisableUser(user:any) {
    return console.log(user)
  }
  
}
