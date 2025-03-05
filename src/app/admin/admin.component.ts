import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base/base.service';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

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

  constructor(private base:BaseService, private auth:AuthService, private UserService:UsersService) {}

  ngOnInit(): void {
    this.base.getAllPlaces().subscribe((places: any) => {
      this.places = places;
    });
  
    this.base.getAllUsers().subscribe((users: any) => {
      this.users = users;
    });
  
    this.base.getAllRents().subscribe((rents: any) => {
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
    this.base.updatePlace(place);
  }

  DeletePlace(PlaceID: number) {
    console.log(PlaceID);
  }
}
