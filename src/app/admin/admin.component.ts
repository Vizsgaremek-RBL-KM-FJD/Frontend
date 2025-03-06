import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base/base.service';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';
import { PlacesService } from '../services/places/places.service';
import { RentsService } from '../services/rents/rents.service';

@Component({
  standalone: false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  places: any = [];
  users: any = [];
  rents: any = [];

  constructor(
    private base:BaseService,
    private auth:AuthService,
    private UserService:UsersService,
    private PlacesService:PlacesService,
    private RentsService:RentsService
  ) {}

  ngOnInit(): void {
    this.PlacesService.getAllPlaces().subscribe((places: any) => {
      this.places = places;
    });
  
    this.UserService.getAllUsers().subscribe((users: any) => {
      this.users = users;
    });
  
    this.RentsService.getAllRents().subscribe((rents: any) => {
      this.rents = rents;
    });
    
  }

  UpdateUserAsAdmin(userID: number) {
    console.log(userID);
    this.UserService.sadmin(userID);
  }

  DeleteUser(userID: number) {
    this.UserService.deleteUser(userID);
  }

  UpdatePlace(place: any) {
    this.PlacesService.updatePlace(place);
  }

  DeletePlace(place: any) {
    const placeId = place.PlaceID;
    this.RentsService.getAllRents().subscribe((rents: any) => {
      const relatedRents = rents.filter((rent: any) => rent.PlaceID === placeId);
      relatedRents.forEach((rent: any) => {
        this.cancelRent(rent.UserID, rent.RentID);
      });
      this.PlacesService.deletePlace(place);
    });
  }

  UpdateRent(rent:any) {
    this.RentsService.updateRent(rent);
  }

  cancelRent(userID: number, rentID: number) {
    console.log("userID:", userID, rentID);
    this.RentsService.cancelRent(userID, rentID).subscribe({
      next: () => {
        console.log("Törlés sikeres! admin", rentID);
        // Itt frissítheted az adatokat, ha szükséges
      },
      error: (error) => {
        console.error("Hiba a törlés során:", error);
      },
      complete: () => {
        console.log("Cancel rent operation completed");
      }
    });
  }

  DisableUser(user:any) {
    this.UserService.DisableUser(user);
  }
}
