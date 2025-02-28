import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
  selectedDate: any;

  selectedPlace: any;

selectPlace(place: any) {
  this.selectedPlace = place;
  console.log(this.selectedPlace);
}
  
  constructor(private base: BaseService)  {}
  places:any = [];

  searchTerm: string = '';
  performSearch() {
    console.log('Performing search for:', this.searchTerm);
  }
  ngOnInit() {
    this.getPlaces();
  }

  getPlaces() {
    this.base.getAllPlaces().subscribe((data) => {
      console.log('Kapott adatok:', data);
      this.places = data;
    });
  }

  hours = Array.from({length: 24}, (_, i) => i);

  startHour: any;
  endHour: any;

  selectStartHour(hour: any) {
    this.startHour = hour;
    console.log("Start",this.startHour);
  }

  selectEndHour(hour: any) {
    this.endHour = hour;
    console.log("End",this.endHour);
}

    
  isHovered(date:NgbDate) {
    return this.hoveredDate ? date.equals(this.hoveredDate) : false;
  }

  

selectDate(date: any) {
  this.selectedDate = date;
  console.log(this.selectedDate);
}

formatDate(date: any) {
  this.selectedDate = new Date(date).toISOString().split('T')[0];
}

rentPlace() {
  const userID = JSON.parse(localStorage.getItem('loggedUser')!).ID;
  const placeID = this.selectedPlace.PlaceID;
  const startDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, this.startHour, 0);
  const endDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, this.endHour, 0);

  this.base.createRent(userID, placeID, startDate, endDate)
    .subscribe((result) => {
      console.log(result);
      // handle success response
    }, (error) => {
      console.error(error);
      // handle error response
    });
}

getCurrentDate(): Date {
  return new Date();
}
    
}
