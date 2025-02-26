import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
    
  
    
  
}
