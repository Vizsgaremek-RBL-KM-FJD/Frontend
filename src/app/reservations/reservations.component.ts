import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-reservations',
  standalone: false,
  
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {

  rents: any = [];

  constructor(private base:BaseService) { }

  isCancelable(rent: any): boolean {
    return new Date(rent.StartDate) > new Date();
  }

  ngOnInit(): void {
      this.getRentsForUser();
  }

  getRentsForUser() {
    const userID =JSON.parse(localStorage.getItem('loggedUser')!).ID;
    this.base.getRentsForUser(userID).subscribe(
      (res) => {
        console.log(res);
        this.rents = res;
      })
  }

  cancelRent(rentID: number, userID: number) {
    this.base.cancelRent(userID, rentID).subscribe(() => {
      this.getRentsForUser();
    });
  }
}
