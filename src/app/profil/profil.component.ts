import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profil',
  standalone: false,
  
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user: any;

  constructor(private auth:AuthService) {}

  ngOnInit(): void {
      const loggedUser = localStorage.getItem('loggedUser');
      this.user = loggedUser ? JSON.parse(loggedUser) : null;
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
  
    this.auth.updateUser(id, updatedUser).subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
    });
  }

  

}

