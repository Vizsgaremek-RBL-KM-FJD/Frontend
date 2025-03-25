import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base/base.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PlacesService } from '../services/places/places.service';
import { RentsService } from '../services/rents/rents.service';
import { HttpClient } from '@angular/common/http';




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
  newCommentText: string = '';
  comments:any = [];
  data:any = [];

  userID = JSON.parse(localStorage.getItem('loggedUser')!).ID;

selectPlace(place: any) {
  this.selectedPlace = place;
  console.log(this.selectedPlace);
}
  constructor(
    private base: BaseService,
    private PlacesService: PlacesService,
    private RentsService: RentsService,
    private http:HttpClient
  )  {}
  places:any = [];

  addComment(place: any, newCommentText: string) {
    const placeID = place.PlaceID;
    const userID = JSON.parse(localStorage.getItem('loggedUser')!).ID;
    const username = JSON.parse(localStorage.getItem('loggedUser')!).first_name;
    const text = newCommentText;

    console.log("elküldendő elemek1", placeID, userID, username, text);

    this.PlacesService.addComment(placeID, userID, username, text).subscribe((result) => {
      this.PlacesService.getComments().subscribe((comments) => {
        console.log('Kapott kommentek:', comments);
        this.comments = comments
      })
      console.log(result);
    })
    this.newCommentText = '';

  }

  searchText = '';
  
  
  get filteredItems() {
    return this.data.filter((data: any) =>
      data.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ngOnInit() {
    this.getPlaces();

    this.PlacesService.getComments().subscribe((comments) => {
      console.log('Kapott kommentek:', comments);
      this.comments = comments
    })
    
  }

  getPlaces() {
    this.PlacesService.getAllPlaces().subscribe((data) => {
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

  // home.component.ts
  // ...
  this.RentsService.createRent(userID, placeID, startDate, endDate)
    .subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
      alert('Error creating rent: ' + error.message);
    });
}



getCurrentDate(): Date {
  return new Date();
}

getDate(selectedDate: any): Date {
  return new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
}
    
}
