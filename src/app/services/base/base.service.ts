import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) {}

  public httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  public api = 'http://127.0.0.1:3000/';  
}
