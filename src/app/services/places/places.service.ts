import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(
    private http: HttpClient,
    private base: BaseService

  ) { }

  getAllPlaces() {
    return this.http.get(this.base.api + 'places');
  }

  getPlaceById(userID: number) {
    return this.http.get(this.base.api + 'places/' + userID);
  }

  updatePlace(place: any) {
    console.log(place.PlaceID);

    this.http.put(this.base.api + 'places/' + place.PlaceID, place).subscribe((response: any) => {
      console.log(response);
    })
  }

  deletePlace(place: any) {
    const placeId = place.PlaceID;
    this.http.delete(`${this.base.api}places/${placeId}`).subscribe((response: any) => {
      console.log(response);
    })
  }
}
