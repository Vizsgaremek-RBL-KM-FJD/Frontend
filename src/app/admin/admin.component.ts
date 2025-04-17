import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base/base.service';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';
import { PlacesService } from '../services/places/places.service';
import { RentsService } from '../services/rents/rents.service';
import { HttpClient } from '@angular/common/http';


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
  reports:any[] = [];
  comments:any[] = [];
  commentsByUser:any[] = [];

  selectedReport:any[] = [];

  

  PageSize: number = 10;
  CurrentPage: number = 1;
  ReportPageSize: number = 5;
  ReportPage: number = 1;
  PastReportPageSize: number = 5;
  PastReportPage: number = 1;

  constructor(
    private base:BaseService,
    private auth:AuthService,
    private UserService:UsersService,
    private PlacesService:PlacesService,
    private RentsService:RentsService,
    private http:HttpClient
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

    this.PlacesService.getAllComments().subscribe((comments: any) => {
      console.log('Kapott kommentek:', comments);
      this.comments = comments
    })
      this.http.get(this.base.api + 'reports').subscribe((res: any) => {
        this.reports = res;
      }
    );
  }

  updateReport(report: any) {
    report.checked = !report.checked;
    console.log(report.checked);
    
    this.http.put(this.base.api + 'reports/update', { id: report.id, checked: report.checked }).subscribe((res: any) => {
      console.log(res);
    })
    
  }

  viewReport(id: number) {}

  searchText = '';

  viewDetails(id: number) {
    const SelectedId = id;
    this.getUserById(SelectedId);
    this.getPlacesById(SelectedId);
    this.getRentsByUser(SelectedId);
    this.getCommentsById(SelectedId);
  }

  getPlacesById(SelectedId: number) {
    this.PlacesService.getPlaceById(SelectedId).subscribe((res: any) => {
      console.log(res)
      this.placesByUser = res;
    });
  }

  deleteComment(id: number) {
    this.PlacesService.deleteComment(id)
  }

  getCommentsById(SelectedId: number) {
    console.log("SelectedId for comments", SelectedId)
    this.PlacesService.getCommentsById(SelectedId).subscribe(
      (res: any) => {
        console.log("Comments response:", res)
        this.commentsByUser = res;
      },
      (error: any) => {
        console.error("Error getting comments:", error)
      }
    )
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

  convertDate(date:String){
    // '2025-03-30 15:00:00'
    // "2025-03-20T10:27"
    return date.replace("T", " ")+(":00")

  }

  selectReport(id: number) {
    this.http.get(this.base.api + 'reports/' + id).subscribe((res: any) => {
      console.log("selected report", res);
      this.selectedReport = res;
    })
  }
}
