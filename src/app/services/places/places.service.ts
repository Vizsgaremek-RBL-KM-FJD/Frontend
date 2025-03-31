import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { placements } from '@popperjs/core';
import { Observable } from 'rxjs';

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

  getAllComments() {
    return this.http.get(this.base.api + 'comments/');
  }

  getPlaceById(userID: number) {
    return this.http.get(this.base.api + 'places/' + userID);
  }
  getPlaceByUserId(userID: number): Observable<any[]> {
    return this.http.get<any[]>(this.base.api + 'places/' + userID);
}

getPlaceByPlaceID(placeID: number) {
  console.log("service",placeID);
  return this.http.get(this.base.api + 'places/places-rent/' + placeID);
}

// Add a new method to your PlacesService class
deletePlaceImage(placeId: number) {
  return this.http.delete(`${this.base.api}places/${placeId}/image`);
}

  updatePlace(place: any) {
    console.log(place.PlaceID);

    this.http.put(this.base.api + 'places/' + place.PlaceID, place).subscribe((response: any) => {
      console.log(response);
    })
  }

deleteComment(id: number) {
  this.http.delete(`${this.base.api}comments/${id}`).subscribe((response: any) => {
    console.log(response);
  })
  }


  updatePlaceFromForm(placeID: number, formData: FormData) {
    this.http.put(this.base.api + 'places/' + placeID, formData).subscribe((response: any) => {
      console.log(response);
    });
  }

  deletePlace(place: any) {
    const placeId = place.PlaceID;
    this.http.delete(`${this.base.api}places/${placeId}`).subscribe((response: any) => {
      console.log(response);
    })
  }

  updateStatus(place: any, status: boolean) {
    console.log("place status changed to", status);
    console.log(place.placeID);
    console.log("updatelni kívánt terem:",place);
    const body = {
      PlaceID: place.PlaceID,
      UserID: place.UserID,
      address: place.address,
      place_name: place.place_name,
      price: place.price,
      status: status,
    }
    console.log("Frissített profil:",body);
    this.updatePlace(body);
}

getComments() {
  return this.http.get(this.base.api + 'comments/')
}

getCommentsById(userID: number) {
  return this.http.get(`${this.base.api}comments/user/${userID}`)
}

addComment(placeID: number, userID: number, username: string, text: string) {
  console.log("kapott", placeID, userID, username, text);
  return this.http.post(this.base.api + 'comments/create', {placeID, userID, username, text})
}

}
