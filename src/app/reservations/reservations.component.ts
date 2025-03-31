import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base/base.service';
import { RentsService } from '../services/rents/rents.service';
import { PlacesService } from '../services/places/places.service';

@Component({
  selector: 'app-reservations',
  standalone: false,
  
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {
  PlaceID: number = 0;
  rents: any = [];
  places: any = [];
  placesByRents: any = [];

  PageSize: number = 10;
  CurrentPage: number = 1;

  constructor(
    private base:BaseService,
    private RentsService: RentsService,
    private PlacesService: PlacesService
  ) { }

  isCancelable(rent: any): boolean {
    return new Date(rent.StartDate) > new Date();
  }

  ngOnInit(): void {
      this.getRentsForUser();
  }

  getRentsForUser() {
    const userID = JSON.parse(localStorage.getItem('loggedUser')!).ID;
    this.RentsService.getRentsForUser(userID).subscribe(
      (res) => {
        console.log(res);
        this.rents = res;

        this.places = [];
        this.rents.forEach((rent:any) => {
          console.log(rent.PlaceID);
          this.PlacesService.getPlaceByPlaceID(rent.PlaceID).subscribe((res: any) => {
          console.log("places",res);
          this.places.push(res);
          console.log("placestömb",this.places);
        });
      });
    })
  }
  
  getPlaceImage(placeID: number): string | null {
    const place = this.places.find((p: any) => p.ID === placeID);
    return place ? place.image_path : null;
  }
  

  cancelRent(rent:any) {
    rent.startDate = this.convertDate(rent.StartDate);
    rent.endDate = this.convertDate(rent.EndDate);
    console.log("reservations c.", rent);
    rent.status = 'canceled';
    console.log("reservations c. updated", rent);
    this.RentsService.updateRent(rent);
  }

  convertDate(date:String){
    console.log(date.replace("T", " ").slice(0,19));
    return date.replace("T", " ").slice(0,19)

  }
}
