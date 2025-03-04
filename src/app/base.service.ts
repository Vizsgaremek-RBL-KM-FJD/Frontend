import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  // private url = 'https://localhost:3000/';
  private url = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}

  getAllPlaces() {
    return this.http.get(this.url + 'places');
  }

  getAllUsers() {
    return this.http.get(this.url + 'users');
  }

  getAllRents() {
    return this.http.get(this.url + 'rents');
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

  getPlaceById(userID: number) {
    return this.http.get(this.url + 'places/' + userID);
  }

  updatePlace(place: any) {
    console.log(place);
    return this.http.put(this.url + 'places/' + place.PlaceID, place);
  }
  
}
