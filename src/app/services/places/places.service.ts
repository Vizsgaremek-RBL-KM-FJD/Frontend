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

  getPlaceById(userID: number) {
    return this.http.get(this.base.api + 'places/' + userID);
  }
  getPlaceByUserId(userID: number): Observable<any[]> {
    return this.http.get<any[]>(this.base.api + 'places/' + userID);
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

  // updateStatus(userID: number, status: boolean) {
  //   console.log("place status changed to", status);
  //   console.log(userID);
  //   this.getPlaceById(userID).subscribe((place: any) => {
  //     console.log(place);
  //     const body = {
  //       PlaceID: place[0].PlaceID,
  //       UserID: place[0].UserID,
  //       address: place[0].address,
  //       place_name: place[0].place_name,
  //       price: place[0].price,
  //       status: status,
  //     }
  //     console.log(body);
  //     this.updatePlace(body);
  //   });
  // }

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

// UpdateUserAsAdmin(user: any) {
//   if (user.status === "disabled" || user.status === "deleted") {
//       console.log(user.ID);

//       // Lekérdezzük a felhasználóhoz tartozó összes termet
//       this.PlacesService.getPlaceById(user.ID).subscribe((places: any) => {
//         if (Array.isArray(places) && places.length > 0) {
//             places.forEach((place) => {
//                 this.PlacesService.updateStatus(place.PlaceID, false);
//             });
//         }
//         this.UserService.sadmin(user);
//     });
//   } else {
//       this.UserService.sadmin(user);
//       return console.log("Update process started", user);
//   }
// }

}
