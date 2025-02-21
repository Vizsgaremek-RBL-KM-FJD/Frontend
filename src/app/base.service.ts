import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  // private url = 'https://localhost:3000/';
  private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getAllPlaces() {
    return this.http.get(this.url + 'places');
  }
}
