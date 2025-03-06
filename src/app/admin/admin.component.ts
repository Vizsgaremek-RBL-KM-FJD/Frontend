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
    this.PlacesService.deletePlace(place);
  }

  UpdateRent(rent:any) {
    this.RentsService.updateRent(rent.UserID, rent.RentID, rent);
  }

  DeleteRent(rentID: number, UserID: number) {
    console.log("A törlés elkezdődött", rentID, UserID);
    this.RentsService.cancelRent(UserID, rentID);
  }

}
