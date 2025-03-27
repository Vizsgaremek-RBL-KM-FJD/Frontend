import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base/base.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PlacesService } from '../services/places/places.service';
import { RentsService } from '../services/rents/rents.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';





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
  rents:any[] = [];

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
  
  toRemove = [5, 12, 18];

  hoursRemoved = this.hours.filter(hour => !this.toRemove.includes(hour));


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

// getRentsByPlaceID() {
//   this.RentsService.getRentsByPlaceID(this.selectedPlace.PlaceID).subscribe((result) => {
//     const rentals = result;
//     console.log(result);

//     const getHoursInRange = (startDate: Date, endDate: Date) => {
//       const startHour = new Date(startDate).getHours();
//       const endHour = new Date(endDate).getHours();
      
//       let hours = [];
//       for (let i = startHour; i <= endHour; i++) {
//           hours.push(i);
//       }
//       return hours;
//     };

//     if (Array.isArray(rentals)) {
//       const selectedDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day);
//       const filteredRentals = rentals.filter(rental => {
//         const rentalDate = new Date(rental.StartDate);
//         const rentalDateMidnight = new Date(rentalDate.getFullYear(), rentalDate.getMonth(), rentalDate.getDate());
//         return rentalDateMidnight.getTime() === selectedDate.getTime();
//       });

//       const hoursInRange = filteredRentals.map(rental => getHoursInRange(rental.StartDate, rental.EndDate));
//       console.log(hoursInRange.flat()); // [13, 14, 15, 16, 16, 17, 18]
//     } else {
//       console.log('Rentals is not an array');
//     }
//   });
// }


// getRentsByPlaceID() {
//   this.RentsService.getRentsByPlaceID(this.selectedPlace.PlaceID).subscribe((result) => {
//     const rentals = result;
//     console.log(result);

//     const getHoursInRange = (startDate: Date, endDate: Date) => {
//       const startHour = new Date(startDate).getHours();
//       const endHour = new Date(endDate).getHours();
      
//       let hours = [];
//       for (let i = startHour; i <= endHour; i++) {
//           hours.push(i);
//       }
//       return hours;
//     };

//     if (Array.isArray(rentals)) {
//       const selectedDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day);
//       const filteredRentals = rentals.filter(rental => {
//         const rentalDate = new Date(rental.StartDate);
//         const rentalDateMidnight = new Date(rentalDate.getFullYear(), rentalDate.getMonth(), rentalDate.getDate());
//         return rentalDateMidnight.getTime() === selectedDate.getTime();
//       });

//       const hoursInRange = filteredRentals.map(rental => getHoursInRange(rental.StartDate, rental.EndDate));
//       console.log(hoursInRange.flat()); 
//       // [13, 14, 15, 16, 16, 17, 18]

//       // Check if selected hours overlap with hoursInRange
//       const selectedHours = Array.from({length: this.endHour - this.startHour + 1}, (_, i) => i + this.startHour);
//       const hoursInRangeFlat = hoursInRange.flat();
//       const areHoursOverlapping = selectedHours.some(hour => hoursInRangeFlat.includes(hour));
//       console.log('Are selected hours overlapping with hoursInRange?', areHoursOverlapping);
//     } else {
//       console.log('Rentals is not an array');
//     }
//   });
// }

getRentsByPlaceID(): Observable<{ areHoursOverlapping: boolean; occupiedHours: number[] }> {
  return this.RentsService.getRentsByPlaceID(this.selectedPlace.PlaceID).pipe(
    map((result) => {
      const rentals = result;

      const getHoursInRange = (startDate: Date, endDate: Date) => {
        const startHour = new Date(startDate).getHours();
        const endHour = new Date(endDate).getHours();
        
        let hours = [];
        for (let i = startHour; i <= endHour; i++) {
            hours.push(i);
        }
        return hours;
      };

      if (Array.isArray(rentals)) {
        const selectedDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day);
        const filteredRentals = rentals.filter(rental => {
          const rentalDate = new Date(rental.StartDate);
          const rentalDateMidnight = new Date(rentalDate.getFullYear(), rentalDate.getMonth(), rentalDate.getDate());
          return rentalDateMidnight.getTime() === selectedDate.getTime() && rental.status !== 'canceled';
        });

        const hoursInRange = filteredRentals.map(rental => {
          if (rental.Status === 'canceled') {
            return [];
          } else {
            return getHoursInRange(rental.StartDate, rental.EndDate);
          }
        });
        const hoursInRangeFlat = hoursInRange.flat().filter(h => h !== null);

        const selectedHours = Array.from({length: this.endHour - this.startHour + 1}, (_, i) => i + this.startHour);
        const areHoursOverlapping = selectedHours.some(hour => hoursInRangeFlat.includes(hour));
        return { areHoursOverlapping, occupiedHours: hoursInRangeFlat };
      } else {
        return { areHoursOverlapping: false, occupiedHours: [] };
      }
    })
  );
}


rentPlace() {
  this.getRentsByPlaceID().subscribe((result) => {
    console.log('Are selected hours overlapping with hoursInRange?', result.areHoursOverlapping);
    if (!result.areHoursOverlapping) {
      const userID = JSON.parse(localStorage.getItem('loggedUser')!).ID;
      const placeID = this.selectedPlace.PlaceID;
      
      const startDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, this.startHour, 0);
      const endDate = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, this.endHour, 0);

      this.RentsService.createRent(userID, placeID, startDate, endDate)
        .subscribe((result) => {
          console.log(result);
          alert('Rent created successfully!');
        }, (error) => {
          console.error(error);
          alert('Error creating rent: ' + error.message);
        });
    } else {
      console.log('Selected hours are overlapping with existing rentals. Cannot create rent.');
      const occupiedHoursText = `The following hours are occupied: ${result.occupiedHours.join(', ')}`;
      alert(`Error: Selected hours are overlapping with existing rentals. ${occupiedHoursText} Please choose a different time slot.`);
    }
  });
}


getCurrentDate(): Date {
  return new Date();
}

getDate(selectedDate: any): Date {
  return new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
}
    
}
