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

  updateRent(userID: number, rentID: number, rent: any) {
    return this.http.patch(this.base.api + 'rents/' + userID + '/' + rentID, rent);
  }
}
