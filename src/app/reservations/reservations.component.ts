import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base/base.service';
import { RentsService } from '../services/rents/rents.service';

@Component({
  selector: 'app-reservations',
  standalone: false,
  
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {

  rents: any = [];

  constructor(
    private base:BaseService,
    private RentsService: RentsService
  ) { }

  isCancelable(rent: any): boolean {
    return new Date(rent.StartDate) > new Date();
  }

  ngOnInit(): void {
      this.getRentsForUser();
  }

  getRentsForUser() {
    const userID = JSON.parse(localStorage.getItem('loggedUser')!).ID;
    this.RentsService.getRentsForUser(userID).subscribe(
      (res) => {
        console.log(res);
        this.rents = res;
      })
  }

  cancelRent(rent:any) {
    console.log("rentservice");
    rent.status = 'canceled';
    this.RentsService.updateRent(rent);
  }
}
