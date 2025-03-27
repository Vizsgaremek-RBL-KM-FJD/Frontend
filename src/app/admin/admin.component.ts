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
  placesByUser: any[] = [];
  users: any = [];
  selectedUser: any = [];
  rents: any = [];
  rentsByUser:any[] = [];

  

  PageSize: number = 10;
  CurrentPage: number = 1;

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
      console.log()
    });
    
  }

  searchText = '';

  viewDetails(id: number) {
    const SelectedId = id;
    this.getUserById(SelectedId);
    this.getPlacesById(SelectedId);
    this.getRentsByUser(SelectedId);
  }

  getPlacesById(SelectedId: number) {
    this.PlacesService.getPlaceById(SelectedId).subscribe((res: any) => {
      console.log(res)
      this.placesByUser = res;
    });
  }

  getUserById(SelectedId: number) {
    this.UserService.getUserById(SelectedId).subscribe((res: any) => {
      console.log(res)
      this.selectedUser = res;
      
    })
  }

  getRentsByUser(SelectedId: number) {
    this.RentsService.getRentsForUser(SelectedId).subscribe((res: any) => {
      console.log(res)
      this.rentsByUser = res;
    })
  }

  UpdateUserAsAdmin(user: any) {
    if (user.active === "disabled" || user.active === "deleted") {
        console.log(user.ID);

        // Lekérdezzük a felhasználóhoz tartozó összes termet
        this.PlacesService.getPlaceById(user.ID).subscribe((places: any) => {
          if (Array.isArray(places) && places.length > 0) {
              places.forEach((place) => {
                  this.PlacesService.updateStatus(place, false);
              });
          }
          this.UserService.sadmin(user);
      });
    } else {
        this.UserService.sadmin(user);
        return console.log("Update process started", user);
    }
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
    //nem tudsz egyszerre csak egyet frissíteni !!!!!!!!!! -- javítani kell!!!!
    console.log("alap date",rent)

    rent.startDate=this.convertDate(String(rent.StartDate))
    rent.endDate=this.convertDate(String(rent.EndDate))
    console.log("megváltoztatott date", rent)
    this.RentsService.updateRent(rent);
  }

  cancelRent(userID: number, rentID: number) {
    console.log("userID:", userID, rentID);
    this.RentsService.cancelRent(userID, rentID).subscribe({
      next: () => {
        console.log("Törlés sikeres! admin", rentID);

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

  convertDate(date:String){
    // '2025-03-30 15:00:00'
    // "2025-03-20T10:27"
    return date.replace("T", " ")+(":00")

  }
}
