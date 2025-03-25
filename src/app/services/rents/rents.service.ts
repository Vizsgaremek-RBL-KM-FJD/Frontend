import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class RentsService {

  

  constructor(
    private http: HttpClient,
    private base: BaseService
  ) { }

  getAllRents() {
    return this.http.get(this.base.api + 'rents');
  }

  createRent(userID: number, placeID: number, startDate: Date, endDate: Date) {
    const body = {
      userID,
      placeID,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
  
    return this.http.post(this.base.api + 'rents', body);
  }

  cancelRent(userID: number, rentID: number) {
    console.log("rentservice", userID, rentID);
    return this.http.delete(this.base.api + 'rents/' + userID + '/' + rentID);
  }

  getRentsForUser(userID: number) {
    return this.http.get(this.base.api + 'rents/' + userID);
  }

  updateRent(rent: any) {
    console.log(rent);
    this.http.put(this.base.api + 'rents/' + rent.UserID + '/' + rent.RentID, rent).subscribe((response: any) => {
        console.log(response);
    })
  }

  getStatus(userID: number, RentID: number) {
    return this.http.get(this.base.api + 'rents/' + userID + '/' + RentID);
  }
}
