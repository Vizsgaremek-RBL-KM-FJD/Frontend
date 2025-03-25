import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { RentsService } from '../services/rents/rents.service';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  rents: any[] = [];
  email=""
  password=""
  errorMessage=""

  constructor(
    private auth:AuthService,
    private rentsServce: RentsService
  ){}

  ngOnInit(): void {
    this.rentsServce.getAllRents().subscribe((res: any) => {
      const rents = res;
      const currentDate = new Date();
      
      console.log("Current Date:", currentDate.toISOString());

      rents.forEach((rent: any) => {
        const startDate = new Date(rent.StartDate);
        const endDate = new Date(rent.EndDate); 

        // console.log(`Rent ID: ${rent.RentID}`);
        // console.log(`Start Date: ${startDate.toISOString()}`);
        // console.log(`End Date: ${endDate.toISOString()}`);
        // console.log(`Current Status: ${rent.status}`);

        if (rent.status === 'canceled') {
          console.log("Skipping update - status is 'canceled'");
          return;
        }

        if (currentDate.getTime() >= startDate.getTime() && currentDate.getTime() < endDate.getTime()) {
          console.log("Updating to 'ongoing'");
          rent.status = 'ongoing';
          rent.startDate = startDate.toISOString();
          rent.endDate = endDate.toISOString();
          this.rentsServce.updateRent(rent);
        } else if (currentDate.getTime() >= endDate.getTime()) {
          console.log("Updating to 'done'");
          rent.status = 'done';
          rent.startDate = startDate.toISOString();
          rent.endDate = endDate.toISOString();
          this.rentsServce.updateRent(rent);
        } else {
          console.log("Status ok - no update needed");
        }
      });
    });
}

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  

  Login(){
    if (this.email==="" || this.password==="") {
      this.errorMessage = "Hibás e-mail cím, vagy jelszó!"
    }
    this.auth.Login(this.email, this.password)
    this.email=""
    this.password=""
    
  }

}


