import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users/users.service';


@Component({
  selector: 'app-profil',
  standalone: false,
  
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user: any;
  places: any[] = [];
  NewplaceName: string = "";
  NewplaceAddress: string = "";
  NewplacePrice: number = 0;

  constructor(
    private auth:AuthService,
    private userService: UsersService,
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
  
  createPlace() {
    const userId = this.user.ID;
    const address = this.NewplaceAddress;
    const placeName = this.NewplaceName;
    const price = this.NewplacePrice;

    this.http.post(`http://127.0.0.1:3000/places/create`, { userId, address, placeName, price }).subscribe((response: any) => {
      console.log(response);
    })

  }

  updatePlace(place: any) {
    console.log(place.PlaceID);
    const placeId = place.PlaceID;
    const address = place.address;
    const place_name = place.place_name;
    const price = place.price;
    this.http.put(`http://127.0.0.1:3000/places/${placeId}`, { address, place_name, price }).subscribe((response: any) => {
      console.log(response);
    })
    
  }

//   async function updatePlace(id, place) {
//     const result = await db.query('UPDATE place SET address = ?, place_name = ?, price = ? WHERE PlaceID = ?', [place.address, place.place_name, place.price, id]);
//     return { message: 'Place updated successfully' };
// }


  deletePlace(place: any) {
    const placeId = place.PlaceID;
    this.http.delete(`http://127.0.0.1:3000/places/${placeId}`).subscribe((response: any) => {
      console.log(response);
    })
  }

}

