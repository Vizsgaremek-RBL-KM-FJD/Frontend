import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users/users.service';
import { PlacesService } from '../services/places/places.service';


@Component({
  selector: 'app-profil',
  standalone: false,
  
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user: any;
  places: any[] = [];
  // NewplaceName: string = "";
  // NewplaceAddress: string = "";
  // NewplacePrice: number = 0;
  NewplaceName = '';
  NewplaceAddress = '';
  NewplacePrice = '';
  selectedFile: File | null = null;

  constructor(
    private auth:AuthService,
    private userService: UsersService,
    private PlacesService: PlacesService,
    private http: HttpClient
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
  
  // createPlace() {
  //   const userId = this.user.ID;
  //   const address = this.NewplaceAddress;
  //   const placeName = this.NewplaceName;
  //   const price = this.NewplacePrice;

  //   this.http.post(`http://127.0.0.1:3000/places/create`, { userId, address, placeName, price }).subscribe((response: any) => {
  //     console.log(response);
  //   })

  // }


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

//   async function updatePlace(id, place) {
//     const result = await db.query('UPDATE place SET address = ?, place_name = ?, price = ? WHERE PlaceID = ?', [place.address, place.place_name, place.price, id]);
//     return { message: 'Place updated successfully' };
// }


  
deletePlace(place: any) {
  this.PlacesService.deletePlace(place)
}

}

