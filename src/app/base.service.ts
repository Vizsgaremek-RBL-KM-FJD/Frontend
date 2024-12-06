import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  URL = "http://localhost:3000/";

  constructor(private http: HttpClient) { }
}
