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

  createRent(userID: number, placeID: number, startDate: Date, endDate: Date) {
    const body = {
      userID,
      placeID,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
  
    return this.http.post(this.url + 'rents', body);
  }

  getRentsForUser(userID: number) {
    return this.http.get(this.url + 'rents/' + userID);
  }

  cancelRent(userID: number, rentID: number) {
    return this.http.delete(this.url + 'rents/' + userID + '/' + rentID);
  }

  
}
