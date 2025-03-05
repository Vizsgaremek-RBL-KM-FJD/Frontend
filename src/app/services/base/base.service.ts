import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  public api = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}

  getAllPlaces() {
    return this.http.get(this.api + 'places');
  }

  getAllUsers() {
    return this.http.get(this.api + 'users');
  }

  getAllRents() {
    return this.http.get(this.api + 'rents');
  }

  createRent(userID: number, placeID: number, startDate: Date, endDate: Date) {
    const body = {
      userID,
      placeID,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
  
    return this.http.post(this.api + 'rents', body);
  }

  getRentsForUser(userID: number) {
    return this.http.get(this.api + 'rents/' + userID);
  }

  cancelRent(userID: number, rentID: number) {
    return this.http.delete(this.api + 'rents/' + userID + '/' + rentID);
  }

  getPlaceById(userID: number) {
    return this.http.get(this.api + 'places/' + userID);
  }

  updatePlace(place: any) {
    console.log(place);
    return this.http.put(this.api + 'places/' + place.PlaceID, place);
  }
  
}
