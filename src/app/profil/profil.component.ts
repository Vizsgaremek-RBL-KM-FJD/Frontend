import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users/users.service';
import { PlacesService } from '../services/places/places.service';
import { RentsService } from '../services/rents/rents.service';


@Component({
  selector: 'app-profil',
  standalone: false,
  
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user: any;
  places: any[] = [];
  rents:any[] = [];
  NewplaceName = '';
  NewplaceAddress = '';
  NewplacePrice = '';
  selectedFile: File | null = null;

  constructor(
    private auth:AuthService,
    private userService: UsersService,
    private PlacesService: PlacesService,
    private http: HttpClient,
    private RentsService: RentsService
  ) {}



  ngOnInit(): void {
    const loggedUser = localStorage.getItem('loggedUser');
    this.user = loggedUser ? JSON.parse(loggedUser) : null;
  
    if (this.user) {
      const userId = this.user.ID;
      this.http.get(`http://127.0.0.1:3000/places/${userId}`).subscribe((response: any) => {
        this.places = response;
      })
    } else {
      console.log('No logged user found');
    }

    
  }

  getRentsbyPlaceID(placeID: number) {
    console.log(placeID);
    this.RentsService.getRentsByPlaceID(placeID).subscribe((res: any) => {
      this.rents = res;
      console.log(this.places);
    })
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

  updateProfile() {
    const id = this.user.ID;
    const updatedUser = {
      ID: this.user.ID,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      address: this.user.address,
      phone_number: this.user.phone_number
    };
  
    this.userService.UpdateUser(id, updatedUser).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
    });
  }

  createPlaceForm() {
   return null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onFileSelectedUpdate(event: any, place: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[place.PlaceID] = file;
    }
  }

  // Add a new method to your ProfilComponent class
deletePlaceImage(place: any) {
  const placeId = place.PlaceID;
  this.PlacesService.deletePlaceImage(placeId).subscribe((response: any) => {
    console.log(response);
    // Update the place image path to null
    place.image_path = null;
  });
}


  createPlace() {
    const userId = JSON.parse(localStorage.getItem('loggedUser')!).ID; 
    const address = this.NewplaceAddress;
    const placeName = this.NewplaceName;
    const price = this.NewplacePrice;

    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('address', address);
    formData.append('placeName', placeName);
    formData.append('price', price);

    // Ha van kiválasztott kép, adjuk hozzá a FormData-hoz
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post('http://127.0.0.1:3000/places/create', formData).subscribe(
      (response: any) => {
        console.log(response);
        alert("Hely sikeresen regisztrálva)")
      },
      (error) => {
        console.error('Hiba a hely létrehozásakor:', error);
      }
    );
  }

  selectedFiles: { [key: number]: File } = {};
  updatePlace(place: any) {
    const formData = new FormData();
    formData.append('address', place.address);
    formData.append('place_name', place.place_name);
    formData.append('price', place.price.toString());
    formData.append('status', place.status.toString());
  
    if (this.selectedFiles[place.PlaceID]) {
      formData.append('image', this.selectedFiles[place.PlaceID]);
    }
  
    this.PlacesService.updatePlaceFromForm(place.PlaceID, formData);
  }
  
inactivatePlace(place: any) {
  place.status = 0;
  this.PlacesService.updatePlace(place);
}

activatePlace(place: any) {
  place.status = 1;
  this.PlacesService.updatePlace(place);
}

deletePlace(place: any) {
  place.is_deleted = 1;
  console.log(place);
  this.PlacesService.updatePlace(place);
}

}

